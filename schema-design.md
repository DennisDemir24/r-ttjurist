# 💾 NeonDB / PostgreSQL Schema Design

Schemaet är utformat för skalbarhet, prestanda (via indexering) och att hantera komplexa relationer mellan byråer, jurister och deras tjänster. Jag har inkluderat typer som `ENUM` för dataintegritet.

**💡 Viktigt:** Detta script antar att du har anslutning till en PostgreSQL-kompatibel databas (NeonDB).

```sql
-- =============================================
-- 1. ENUMs: Definierade värden för datakonsistens
-- =============================================

-- Definerar tillgängliga juridiska specialiteter/områden (Standardiserat för sökning)
CREATE TYPE legal_specialty AS ENUM (
    'familjerätt', 
    'arbetsrätt', 
    'immaterialrätt', 
    'avtortsrätt', 
    'straffrätt', 
    'ekonomirätt', 
    'annat'
);

-- Definerar användarrollen i systemet (Customer, Provider/Jurist, Admin)
CREATE TYPE user_role AS ENUM ('customer', 'provider', 'admin');


-- =============================================
-- 2. Tabellskonstruktion: Dataobjekt
-- =============================================

-- users: Central tabell för alla inloggade individer (Kunden eller den jurist som är kopplad till profilen)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL, -- Använd Argon2/Bcrypt för lagring!
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(30),
    role user_role NOT NULL DEFAULT 'customer', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- firms: Hanterar den juridiska enheten (Byrån).
CREATE TABLE firms (
    firm_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firm_name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url VARCHAR(512),
    is_verified BOOLEAN DEFAULT FALSE, -- Har byrån verifierats?
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- provider_profiles: Den publika profilen (det som användaren ser). Kopplas till en Firm/User.
CREATE TABLE provider_profiles (
    profile_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    firm_id UUID REFERENCES firms(firm_id) ON DELETE CASCADE, 
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL, -- Den person som är ansvarig för profilen.
    slug VARCHAR(255) UNIQUE NOT NULL,  -- Viktigt för SEO: /profile/{slug}
    bio TEXT,
    status VARCHAR(50) DEFAULT 'Pending', -- T.ex.: Draft, UnderGranskning, Live, Deactivated
    is_premium BOOLEAN DEFAULT FALSE,  -- Boosted Listing status (Fas 3)
    hourly_rate DECIMAL(10, 2),        
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- services: Detaljer om vad juristen erbjuder.
CREATE TABLE services (
    service_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES provider_profiles(profile_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_primary BOOLEAN DEFAULT FALSE, 
    FOREIGN KEY (profile_id) REFERENCES provider_profiles(profile_id)
);

-- specialties: Definierar alla möjliga specialiteter.
CREATE TABLE specialties (
    specialty_id SERIAL PRIMARY KEY,
    name legal_specialty UNIQUE NOT NULL
);

-- profile_specialties: Många-till-Många relationen mellan Profil och Specialitet
CREATE TABLE profile_specialties (
    profile_id UUID REFERENCES provider_profiles(profile_id) ON DELETE CASCADE,
    specialty_id INT REFERENCES specialties(specialty_id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, specialty_id),
    UNIQUE (profile_id, specialty_id)
);


-- reviews: Kundåterkoppling och betyg.
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reviewer_user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT, -- Kan inte ta bort review om användaren skrev den.
    profile_id UUID NOT NULL REFERENCES provider_profiles(profile_id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5), -- Betyg från 1 till 5
    review_text TEXT,
    interaction_proof BOOLEAN DEFAULT FALSE, -- Krav: Bevis på interaktion innan recension kan lämnas.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Förhindrar att en användare lämnar flera reviews för samma profil (eller begränsa antalet)
CREATE UNIQUE INDEX idx_unique_review ON reviews (reviewer_user_id, profile_id);


-- subscriptions: Hantering av betalningsprenumerationer (Fas 3).
CREATE TABLE subscriptions (
    subscription_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID UNIQUE REFERENCES provider_profiles(profile_id) ON DELETE RESTRICT, -- Ett abonnemang per profil.
    stripe_customer_id VARCHAR(255) UNIQUE, 
    plan_name VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'inactive', -- active, expired, pending
    current_period_end TIMESTAMP WITH TIME ZONE,
    billing_cycle_start DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- =============================================
-- 3. Indexering (För optimal sökning/filtrering)
-- =============================================

CREATE INDEX idx_search_slug ON provider_profiles (slug);
CREATE INDEX idx_specialty_lookup ON profile_specialties (specialty_id);
```