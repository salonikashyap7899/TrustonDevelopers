import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-[var(--ink)] text-white text-[12px] font-medium px-4 py-2.5 shadow-xl whitespace-nowrap"
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/919616061166?text=Hi%2C%20I%20am%20interested%20in%20TrustOn%20Prime%20Estate."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] flex items-center justify-center shadow-2xl shadow-green-500/30"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.003 2.667C8.638 2.667 2.667 8.637 2.667 16c0 2.364.637 4.577 1.75 6.494L2.667 29.333l6.987-1.731A13.27 13.27 0 0016.003 29.333c7.363 0 13.333-5.97 13.333-13.333S23.366 2.667 16.003 2.667zm0 24a11.27 11.27 0 01-5.742-1.572l-.412-.245-4.147 1.027 1.05-3.998-.27-.421A11.235 11.235 0 014.8 16c0-6.166 5.036-11.2 11.203-11.2S27.205 9.834 27.205 16 22.168 26.667 16.003 26.667zm6.176-8.4c-.338-.169-2.006-.99-2.317-1.103-.312-.113-.539-.169-.766.168-.228.338-.878 1.103-1.077 1.33-.198.226-.396.254-.735.085-.338-.169-1.426-.526-2.717-1.677-.9-.8-1.53-1.825-1.71-2.163-.18-.338-.019-.52.135-.688.14-.149.338-.39.507-.585.169-.196.225-.338.338-.564.113-.226.056-.423-.028-.592-.085-.169-.766-1.85-1.05-2.533-.276-.665-.557-.575-.766-.585-.198-.01-.423-.012-.648-.012a1.243 1.243 0 00-.9.423c-.31.338-1.18 1.153-1.18 2.813s1.208 3.262 1.377 3.488c.169.226 2.377 3.63 5.76 5.09.805.348 1.432.556 1.921.712.807.257 1.542.22 2.122.133.647-.097 1.994-.815 2.276-1.602.282-.788.282-1.462.197-1.602-.084-.14-.31-.226-.648-.395z"/>
        </svg>
      </motion.a>
    </div>
  );
}
