import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal, SectionEyebrow } from "./Reveal";

const amenitiesData = [
  {
    title: "Infinity Pool",
    description: "Indulge in breathtaking panoramic views while relaxing in our heated infinity pool. A serene escape designed for ultimate relaxation, surrounded by lush landscaping and private cabanas.",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&h=400&fit=crop",
    link: "#"
  },
  {
    title: "Clubhouse",
    description: "Our exclusive clubhouse is the social heart of TrustOn. Featuring a state-of-the-art fitness center, a private screening room, a gourmet dining area, and dedicated spaces for community events.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    link: "#"
  },
  {
    title: "Spa & Wellness",
    description: "Rejuvenate your mind, body, and soul in our world-class spa. Offering a range of bespoke treatments, saunas, steam rooms, and a yoga studio with expert instructors.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
    link: "#"
  },
];

export function AmenitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
      style={{ 
        background: "linear-gradient(135deg, #f8f9fc 0%, #e8eef8 50%, #f0f4fa 100%)"
      }}
    >
      {/* Flowing curved lines background */}
      <motion.svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        style={{ y: bgY }}
      >
        <path 
          d="M-100,200 Q400,400 720,200 T1540,200" 
          stroke="rgba(45,107,196,0.08)" 
          strokeWidth="2" 
          fill="none"
          strokeDasharray="8 4"
        />
        <path 
          d="M-100,450 Q400,250 720,450 T1540,450" 
          stroke="rgba(45,107,196,0.06)" 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d="M-100,700 Q400,500 720,700 T1540,700" 
          stroke="rgba(45,107,196,0.04)" 
          strokeWidth="1" 
          fill="none"
        />
      </motion.svg>

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <Reveal>
            <SectionEyebrow>Lifestyle</SectionEyebrow>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 
              className="font-display text-5xl md:text-6xl lg:text-7xl text-[var(--ink)] mt-6 tracking-wide"
              style={{ fontStyle: 'italic', fontWeight: 300 }}
            >
              AMENITIES
            </h2>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Experience Unrivaled Luxury &amp; Lifestyle
            </p>
          </Reveal>
        </div>

        {/* Amenities Cards with 3D Effect */}
        <div className="space-y-20">
          {amenitiesData.map((amenity, idx) => {
            const isEven = idx % 2 === 0;
            
            return (
              <Reveal key={amenity.title} delay={idx * 0.1}>
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
                  {/* 3D Floating Image Card */}
                  <motion.div 
                    className="w-full lg:w-1/2 relative"
                    whileHover={{ y: -8, rotateY: isEven ? 3 : -3 }}
                    transition={{ duration: 0.4 }}
                    style={{ perspective: 1000 }}
                  >
                    <div 
                      className="relative bg-white rounded-lg overflow-hidden"
                      style={{
                        transform: `perspective(1000px) rotateY(${isEven ? 2 : -2}deg) rotateX(1deg)`,
                        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.5)"
                      }}
                    >
                      <img 
                        src={amenity.image}
                        alt={amenity.title}
                        className="w-full h-64 md:h-80 object-cover"
                      />
                      
                      {/* Decorative frame corners */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/50" />
                      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/50" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/50" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/50" />
                    </div>
                    
                    {/* Shadow element for 3D effect */}
                    <div 
                      className="absolute -bottom-4 left-4 right-4 h-8 blur-xl bg-[var(--accent)]/10 rounded-full"
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <h3 
                      className="font-display text-3xl md:text-4xl text-[var(--accent)] mb-4"
                      style={{ fontStyle: 'italic' }}
                    >
                      {amenity.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {amenity.description}
                    </p>
                    <a 
                      href={amenity.link}
                      className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:gap-3 transition-all"
                    >
                      Learn More <span>&rarr;</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Floor Plans Section with Interactive 3D View */
const floorPlans = [
  {
    id: "2bhk-premium",
    name: "2BHK Premium",
    type: "2BHK",
    area: "1,850 Sq. Ft.",
    price: "₹3.2 Cr",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    rooms: ["Living Room", "Kitchen", "Master Bedroom", "Bedroom 2", "Balcony", "2 Bathrooms"]
  },
  {
    id: "3bhk-luxury",
    name: "3BHK Luxury",
    type: "3BHK",
    area: "2,450 Sq. Ft.",
    price: "₹4.5 Cr",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    rooms: ["Living Room", "Dining Area", "Kitchen", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Balcony", "3 Bathrooms"]
  },
  {
    id: "penthouse",
    name: "Penthouse Collection",
    type: "Penthouse",
    area: "4,200 Sq. Ft.",
    price: "₹8.5 Cr",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    rooms: ["Grand Living", "Private Terrace", "Master Suite", "3 Bedrooms", "Study", "Home Theater", "4 Bathrooms"]
  }
];

const levels = ["Ground Level", "Mid Level", "High Level", "Sky Level"];

export function FloorPlansSection() {
  const [selectedPlan, setSelectedPlan] = useState(floorPlans[1]);
  const [selectedLevel, setSelectedLevel] = useState("High Level");

  return (
    <section 
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ 
        background: "linear-gradient(180deg, #f0f4fa 0%, #e8f0fc 100%)"
      }}
    >
      {/* Background gradient overlay */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-50 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(45,107,196,0.08) 0%, transparent 70%)"
        }}
      />

      <div className="mx-auto max-w-[1400px] px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
          {/* Left - Floor Plan Viewer */}
          <Reveal>
            <div 
              className="relative bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)"
              }}
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display text-[var(--ink)]">
                      {selectedPlan.type} <span className="text-[var(--accent)]">Type A</span>
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Floor Plan Image with Interactive Labels */}
              <div className="relative aspect-[4/3] bg-gray-50">
                <img 
                  src={selectedPlan.image}
                  alt={selectedPlan.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Room Labels */}
                {selectedPlan.rooms.slice(0, 6).map((room, idx) => (
                  <motion.div
                    key={room}
                    className="absolute bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-lg text-xs font-medium text-[var(--ink)]"
                    style={{
                      top: `${20 + (idx % 3) * 25}%`,
                      left: `${15 + (idx % 2) * 40}%`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(45,107,196,0.1)" }}
                  >
                    {room}
                  </motion.div>
                ))}

                {/* Zoom/Pan Controls */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 5v2m0 10v2M5 12h2m10 0h2"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 9l4 4-4 4M19 9l-4 4 4 4"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M20 12H4"/>
                    </svg>
                  </motion.button>
                </div>

                {/* 360 Tour Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute bottom-6 left-6 flex items-center gap-3 bg-[var(--accent)] text-white px-5 py-3 rounded-lg shadow-lg"
                >
                  <span className="text-xl font-bold">360&deg;</span>
                  <span className="text-sm font-medium">Start 3D Virtual Tour</span>
                </motion.button>
              </div>

              {/* Footer Stats */}
              <div className="p-6 md:p-8 flex items-center justify-between border-t border-gray-100">
                <div>
                  <span className="text-sm text-gray-500">Total Area:</span>
                  <span className="ml-2 text-lg font-semibold text-[var(--ink)]">{selectedPlan.area}</span>
                </div>
                <div className="flex-1 mx-8">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/70 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Price: Starting</span>
                  <span className="ml-2 text-lg font-semibold text-[var(--ink)]">{selectedPlan.price}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right - Configuration Panel */}
          <div className="space-y-6">
            <Reveal delay={0.2}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-[var(--ink)] mb-4">
                  Select Configuration
                </h4>
                <div className="space-y-2">
                  {floorPlans.map((plan) => (
                    <motion.button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedPlan.id === plan.id 
                          ? 'bg-[var(--accent)]/10 border-2 border-[var(--accent)]/30' 
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          selectedPlan.id === plan.id ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
                        }`}>
                          {plan.name}
                        </span>
                        {selectedPlan.id === plan.id && (
                          <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7"/>
                          </svg>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-[var(--ink)] mb-4">
                  Floor Level
                </h4>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <motion.button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedLevel === level 
                          ? 'bg-[var(--accent)]/10 border-2 border-[var(--accent)]/30' 
                          : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                      }`}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          selectedLevel === level ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
                        }`}>
                          {level}
                        </span>
                        {selectedLevel === level && (
                          <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7"/>
                          </svg>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={0.4}>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[var(--accent)] text-white font-semibold rounded-xl shadow-lg hover:bg-[var(--accent)]/90 transition-colors"
                >
                  View Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[var(--ink)] text-white font-semibold rounded-xl shadow-lg hover:bg-[var(--ink)]/90 transition-colors"
                >
                  Download Brochure
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
