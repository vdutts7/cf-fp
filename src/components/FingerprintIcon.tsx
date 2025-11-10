import { motion } from 'framer-motion';
export function FingerprintIcon({ className }: { className?: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial={{ scale: 1, opacity: 0.8 }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <path d="M12 10v2" />
      <path d="M12 17v.01" />
      <path d="M7.05 15.27A8.5 8.5 0 1 0 12 5.5" />
      <path d="M4.64 10.24A6.5 6.5 0 1 0 12 7.5" />
      <path d="M2 12h.01" />
      <path d="M21.99 12h.01" />
      <path d="M12 2v.01" />
      <path d="M4.22 19.78l.01-.01" />
      <path d="M19.78 4.22l.01-.01" />
      <path d="M18.36 18.36l.01-.01" />
      <path d="M5.64 5.64l.01-.01" />
    </motion.svg>
  );
}