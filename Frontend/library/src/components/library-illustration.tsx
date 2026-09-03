export function LibraryIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 340"
      className={className}
      role="img"
      aria-label="Illustration of a bookshelf with an open book"
    >
      <defs>
        <radialGradient id="lib-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="260" r="180" fill="url(#lib-glow)" />

      {/* Top shelf */}
      <rect x="0" y="120" width="320" height="8" rx="2" fill="#334155" />
      {[
        { x: 8, h: 70, c: "#1E3A8A" },
        { x: 52, h: 95, c: "#B45309" },
        { x: 96, h: 55, c: "#166534" },
        { x: 140, h: 110, c: "#7C2D12" },
        { x: 184, h: 80, c: "#4C1D95" },
        { x: 228, h: 100, c: "#9D174D" },
        { x: 272, h: 60, c: "#0F766E" },
      ].map((book) => (
        <rect
          key={`top-${book.x}`}
          x={book.x}
          y={120 - book.h}
          width="38"
          height={book.h}
          rx="3"
          fill={book.c}
        />
      ))}

      {/* Bottom shelf */}
      <rect x="0" y="260" width="320" height="8" rx="2" fill="#334155" />
      {[
        { x: 8, h: 65, c: "#0F766E" },
        { x: 52, h: 100, c: "#4C1D95" },
        { x: 96, h: 50, c: "#9D174D" },
        { x: 140, h: 90, c: "#1E3A8A" },
        { x: 184, h: 70, c: "#7C2D12" },
        { x: 228, h: 110, c: "#166534" },
        { x: 272, h: 60, c: "#B45309" },
      ].map((book) => (
        <rect
          key={`bottom-${book.x}`}
          x={book.x}
          y={260 - book.h}
          width="38"
          height={book.h}
          rx="3"
          fill={book.c}
        />
      ))}

      {/* Open book on a stand */}
      <ellipse cx="160" cy="336" rx="75" ry="9" fill="black" opacity="0.18" />
      <rect x="128" y="316" width="64" height="12" rx="2" fill="#334155" />

      <path
        d="M160,278 L70,268 L70,308 L160,316 Z"
        fill="#FDF6E3"
        stroke="#D9CBAA"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M160,278 L250,268 L250,308 L160,316 Z"
        fill="#FDF6E3"
        stroke="#D9CBAA"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line
        x1="160"
        y1="278"
        x2="160"
        y2="316"
        stroke="#8B7355"
        strokeWidth="2"
      />

      <path
        d="M90,285 Q110,283 128,286"
        stroke="#C9BFA0"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M85,296 Q108,294 130,297"
        stroke="#C9BFA0"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M192,286 Q210,283 230,285"
        stroke="#C9BFA0"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M190,297 Q212,294 235,296"
        stroke="#C9BFA0"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
