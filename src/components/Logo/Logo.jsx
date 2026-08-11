function Logo({ size = 36, showText = true }) {
  return (
    <div className="screena-logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="screena-purple"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="55%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>

        {/* Play button */}
        <path
          d="M16 9C16 5.8 19.5 3.9 22.2 5.6L53 25.1C55.5 26.7 55.5 30.3 53 31.9L22.2 51.4C19.5 53.1 16 51.2 16 48V9Z"
          fill="url(#screena-purple)"
        />

        {/* Magnifying glass circle */}
        <circle
          cx="29"
          cy="29"
          r="10"
          fill="rgba(7,8,13,0.45)"
          stroke="white"
          strokeWidth="4"
        />

        {/* Magnifying glass handle */}
        <line
          x1="29"
          y1="39"
          x2="29"
          y2="54"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {showText && <span>Screena</span>}
    </div>
  );
}

export default Logo;