/**
 * أيقونات خفيفة مرسومة داخل الكود — بدون مكتبات خارجية
 * Inline stroke icons; `className` controls the size.
 */
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export function TruckIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 7h10v9H3z" />
      <path d="M13 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}

export function FlowerIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="9" r="2.2" />
      <path d="M12 6.8a2.4 2.4 0 1 1 0-.2M14.2 9a2.4 2.4 0 1 1 .2 0M12 11.2a2.4 2.4 0 1 1 0 .2M9.8 9a2.4 2.4 0 1 1-.2 0" />
      <path d="M12 13v7" />
      <path d="M12 17c-1.6 0-3-1.2-3-2.6 1.7-.3 3 .9 3 2.6Z" />
    </svg>
  );
}

export function SparkleIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 13.6 9 19 10.5 13.6 12 12 17.5 10.4 12 5 10.5 10.4 9z" />
      <path d="M18 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </svg>
  );
}

export function BalloonIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3c2.8 0 5 2.4 5 5.4S14.8 15 12 15 7 12.4 7 8.4 9.2 3 12 3Z" />
      <path d="M12 15v1.6" />
      <path d="M10.8 16.6h2.4l-.6 1.4h-1.2z" />
      <path d="M12 18c0 1.6 1.8 1.4 1.8 3" />
    </svg>
  );
}

export function CapIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M3 9.5 12 5.5l9 4-9 4z" />
      <path d="M7 11.5v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4" />
      <path d="M21 9.5v5" />
    </svg>
  );
}

export function CakeIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M5 13.5c0-1.4 1.1-2.5 2.5-2.5h9c1.4 0 2.5 1.1 2.5 2.5V19H5z" />
      <path d="M3.5 19h17" />
      <path d="M9 11V8M12 11V7.5M15 11V8" />
      <path d="M9 6.2c0-.7 1-1.2 1-2 .6.6 1 1.3 1 2a1 1 0 0 1-2 0Z" />
    </svg>
  );
}

export function ArchIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M6 20V11a6 6 0 0 1 12 0v9" />
      <path d="M4 20h16" />
      <path d="M6.5 8.5c1.2-.6 2.2-.3 2.8.6M17.5 8.5c-1.2-.6-2.2-.3-2.8.6" />
      <circle cx="12" cy="5.4" r="1.3" />
    </svg>
  );
}

export function ChatIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12c0 3.9-3.6 7-8 7-1 0-2-.2-2.9-.5L4 20l1.6-3.6A6.6 6.6 0 0 1 4 12c0-3.9 3.6-7 8-7s8 3.1 8 7Z" />
    </svg>
  );
}

export function HeartIcon({ className = 'h-6 w-6' }) {
  return (
    <svg {...base} className={className}>
      <path d="M12 19s-6.5-3.9-6.5-8.3A3.6 3.6 0 0 1 12 8.4a3.6 3.6 0 0 1 6.5 2.3C18.5 15.1 12 19 12 19Z" />
    </svg>
  );
}

export function ArrowIcon({ className = 'h-4 w-4' }) {
  // السهم يشير لليسار لأن الاتجاه من اليمين لليسار
  return (
    <svg {...base} className={className}>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </svg>
  );
}
