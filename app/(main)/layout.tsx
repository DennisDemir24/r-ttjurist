import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Layout for the main app flow (homepage, search, profile pages).
 * All general users see this flow – auth and dashboard routes live outside.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
