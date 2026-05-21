import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";

/* Location & Inquiry Section with 3D Map */
const nearbyPlaces = [
  { icon: "school", name: "International School", distance: "2 km" },
  { icon: "hospital", name: "City Hospital", distance: "3 km" },
  { icon: "mall", name: "Luxury Mall", distance: "5 km" },
  { icon: "airport", name: "Airport", distance: "15 km" },
];

export function LocationInquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)"
      }}
    >
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(45,107,196,0.02) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(45,107,196,0.02) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(45,107,196,0.02) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(45,107,196,0.02) 75%)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="mx-auto max-w-[1200px] px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <h2 
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--ink)] tracking-wide uppercase"
            >
              Location &amp; Inquiry
            </h2>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Contact Form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="FULL NAME"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-lg text-sm uppercase tracking-wider placeholder:text-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <input
                type="tel"
                placeholder="PHONE NUMBER"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-lg text-sm uppercase tracking-wider placeholder:text-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-lg text-sm uppercase tracking-wider placeholder:text-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
              <textarea
                placeholder="MESSAGE"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-lg text-sm uppercase tracking-wider placeholder:text-gray-400 focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              />
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[var(--ink)] text-white font-semibold text-sm uppercase tracking-widest rounded-lg hover:bg-[var(--ink)]/90 transition-colors"
              >
                Send Inquiry
              </motion.button>

              <label className="flex items-start gap-3 text-sm text-gray-500 mt-4">
                <input type="checkbox" className="mt-1" />
                <span>
                  I agree to the{" "}
                  <a href="#" className="text-[var(--accent)] underline">Privacy Policy</a>
                  {" "}&amp;{" "}
                  <a href="#" className="text-[var(--accent)] underline">Terms</a>
                </span>
              </label>
            </form>
          </Reveal>

          {/* Right - 3D Map Illustration */}
          <Reveal delay={0.2}>
            <div 
              className="relative rounded-2xl overflow-hidden"
              style={{
                transform: "perspective(1000px) rotateX(2deg) rotateY(-2deg)",
                boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)"
              }}
            >
              {/* Map placeholder with isometric building illustration */}
              <div className="relative h-[400px] bg-gradient-to-br from-[#e8eef5] to-[#d8e4f0]">
                {/* Isometric grid */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  {/* Grid lines */}
                  {[...Array(10)].map((_, i) => (
                    <g key={i}>
                      <line 
                        x1={i * 40} y1="0" 
                        x2={i * 40} y2="400" 
                        stroke="rgba(45,107,196,0.1)" 
                        strokeWidth="1"
                      />
                      <line 
                        x1="0" y1={i * 40} 
                        x2="400" y2={i * 40} 
                        stroke="rgba(45,107,196,0.1)" 
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                  
                  {/* Roads */}
                  <path 
                    d="M100,0 L100,400 M0,200 L400,200 M200,100 L200,400" 
                    stroke="rgba(45,107,196,0.15)" 
                    strokeWidth="20"
                    fill="none"
                  />
                </svg>

                {/* Location markers */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="relative">
                    {/* Pulsing ring */}
                    <motion.div 
                      className="absolute inset-0 bg-[var(--accent)]/20 rounded-full"
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ width: 60, height: 60, marginLeft: -15, marginTop: -15 }}
                    />
                    {/* Main pin */}
                    <div className="w-16 h-16 bg-[var(--accent)] rounded-full flex items-center justify-center shadow-lg">
                      <div className="text-white font-bold text-xs text-center">
                        <span className="text-lg">T</span>
                        <br />
                        <span className="text-[8px] uppercase tracking-wider">Residences</span>
                      </div>
                    </div>
                    {/* Pin tail */}
                    <div 
                      className="absolute left-1/2 -translate-x-1/2 top-14 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-[var(--accent)]"
                    />
                  </div>
                </motion.div>

                {/* Nearby markers */}
                {[
                  { top: "25%", left: "30%", label: "International\nSchool", icon: "graduation" },
                  { top: "30%", right: "20%", label: "City\nHospital", icon: "hospital" },
                  { top: "60%", left: "25%", label: "City\nHospital", icon: "hospital" },
                  { top: "70%", right: "25%", label: "Luxury\nMall", icon: "shopping" },
                ].map((marker, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute bg-white rounded-lg px-3 py-2 shadow-md text-[10px] text-[var(--ink)] font-medium leading-tight whitespace-pre-line"
                    style={{ 
                      top: marker.top, 
                      left: marker.left,
                      right: marker.right 
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      </div>
                      <span>{marker.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Premium Masonry Gallery */
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=800&fit=crop", label: "Luxury Villa Exterior", category: "Exterior" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop", label: "Luxury Apartment Living", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=700&fit=crop", label: "Modern Villa Exterior", category: "Exterior" },
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=500&h=400&fit=crop", label: "Infinity Pool & Lounge", category: "Lifestyle" },
  { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500&h=600&fit=crop", label: "Grand Entrance Lobby", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?w=600&h=400&fit=crop", label: "Penthouse Interior", category: "Interior" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&h=700&fit=crop", label: "Infinity Pool & Lounge", category: "Lifestyle" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=500&fit=crop", label: "Luxury Apartment Living", category: "Interior" },
];

const categories = ["All", "Interior", "Exterior", "Lifestyle"];

export function PremiumGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Reveal>
            <h2 
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[var(--ink)]"
              style={{ fontStyle: 'italic' }}
            >
              TrustOn Premium Masonry Gallery
            </h2>
          </Reveal>
          
          <Reveal delay={0.1}>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Explore our exclusive collection of architectural masterpieces. Experience luxury redefined.
            </p>
          </Reveal>
        </div>

        {/* Category Tabs */}
        <Reveal delay={0.2}>
          <div className="flex justify-center gap-2 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredImages.map((image, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <motion.div
                className="relative break-inside-avoid overflow-hidden rounded-lg cursor-pointer"
                onHoverStart={() => setHoveredImage(idx)}
                onHoverEnd={() => setHoveredImage(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={image.src}
                  alt={image.label}
                  className="w-full object-cover"
                />
                
                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredImage === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-medium">
                    {image.label}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[var(--accent)] text-sm">Explore</span>
                    <motion.span 
                      className="text-[var(--accent)]"
                      animate={{ x: hoveredImage === idx ? [0, 4, 0] : 0 }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      &rarr;
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Why TrustOn Section */
const whyPoints = [
  {
    num: "01",
    title: "Transparent Documentation",
    text: "Clear title deeds, Jila Panchayat approvals, and zero hidden conditions at every stage of the transaction."
  },
  {
    num: "02",
    title: "High-Growth Locations",
    text: "Projects placed in proven growth corridors with verified infrastructure readiness and long-term appreciation potential."
  },
  {
    num: "03",
    title: "End-to-End Partnership",
    text: "From plot acquisition to construction and architectural design — one trusted team, start to finish."
  },
  {
    num: "04",
    title: "Quality Assurance",
    text: "Premium materials, expert craftsmanship, and rigorous quality checks at every construction phase."
  },
];

export function WhyTrustOnSection() {
  return (
    <section 
      id="why"
      className="py-24 md:py-32"
      style={{ background: "var(--ink)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
          {/* Left - Sticky Title */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <SectionEyebrow light>Why Choose Us</SectionEyebrow>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl text-white mt-6 leading-[1.1]">
                Why <span className="text-[var(--accent)]">TrustOn</span>?
              </h2>
            </Reveal>
            
            {/* Large decorative number */}
            <div className="mt-8">
              <span 
                className="font-display text-[10rem] leading-none text-white/[0.04]"
              >
                04
              </span>
            </div>
            
            <Reveal delay={0.2}>
              <p className="font-serif italic text-white/40 text-lg mt-[-2rem] leading-relaxed">
                &quot;We build the foundation.<br />
                You build the dream.&quot;
              </p>
            </Reveal>
            
            <div className="w-10 h-px bg-[var(--accent)]/30 my-6" />
            
            <Reveal delay={0.3}>
              <p className="text-white/30 text-sm tracking-wider">
                TRUSTON DEVELOPERS
              </p>
            </Reveal>
          </div>

          {/* Right - Points */}
          <div>
            {whyPoints.map((point, idx) => (
              <Reveal key={point.num} delay={idx * 0.1}>
                <motion.div
                  className="grid grid-cols-[3rem_1fr] gap-6 py-8 border-y border-white/[0.04] cursor-default"
                  whileHover={{ paddingLeft: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs tracking-[0.12em] text-[var(--accent)] pt-1">
                    {point.num}
                  </span>
                  <div>
                    <h3 className="text-white text-lg font-medium mb-2">
                      {point.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {point.text}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* CTA Strip Section */
export function CTAStripSection() {
  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "white" }}
    >
      {/* Large background text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15rem] md:text-[20rem] text-gray-100 whitespace-nowrap pointer-events-none leading-none"
      >
        TRUSTON
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--accent)]">
            Limited Availability
          </span>
        </Reveal>
        
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-6xl text-[var(--ink)] mt-6 leading-[1.08]">
            Your Dream Plot<br />
            <em className="text-[var(--accent)]">Awaits</em>
          </h2>
        </Reveal>
        
        <Reveal delay={0.2}>
          <p className="text-gray-600 mt-6 max-w-lg mx-auto leading-relaxed">
            Join the community of visionary homeowners who have chosen Prime Estate 
            for their dream homes. Limited plots available.
          </p>
        </Reveal>
        
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-[var(--ink)] text-white font-semibold text-[11px] uppercase tracking-[0.18em]"
            >
              Book Site Visit
            </motion.a>
            
            <div className="h-8 w-px bg-gray-200" />
            
            <a 
              href="tel:+919616061166"
              className="font-display text-2xl md:text-3xl text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
            >
              +91 96160-61166
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
