export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9"
      >
        {/* Scale of justice icon */}
        <rect width="40" height="40" rx="8" fill="#1e3a5f" />
        <path
          d="M20 8v24"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M12 12h16"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="8" r="2" fill="#fbbf24" />
        {/* Left pan */}
        <path
          d="M12 12l-3 6h6l-3-6z"
          fill="#fbbf24"
        />
        <circle cx="9" cy="18" r="1.5" fill="white" />
        {/* Right pan */}
        <path
          d="M28 12l-3 6h6l-3-6z"
          fill="#fbbf24"
        />
        <circle cx="29" cy="18" r="1.5" fill="white" />
        {/* Base */}
        <path
          d="M14 32h12"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight text-[#1e3a5f]">
        Rätt<span className="text-amber-500">Jurist</span>
      </span>
    </div>
  );
}
