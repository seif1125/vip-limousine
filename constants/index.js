import {ShieldCheck, Globe, Clock,Headset,Tag,CalendarCheck,PlaneTakeoff,CarFront,Map as MapIcon,AlertCircle} from 'lucide-react';
export const Facebook = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  );
  
  export const Instagram = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  );
  
 export const Youtube = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17Z"/><path d="m10 15 5-3-5-3z"/></svg>
  );
  export const TikTok = (props) => (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

    // Trust points from your original code
  export  const trustPoints = [
      { icon: <Globe size={20} />, title: "English Speaking", desc: "Fluent chauffeurs for clear communication." },
      { icon: <ShieldCheck size={20} />, title: "Certified Safety", desc: "Vetted drivers and GPS-tracked luxury fleet." },
      { icon: <Clock size={20} />, title: "24/7 Monitoring", desc: "We track your flight for perfect pickup timing." }
    ];
  
   export const reasons = [
      {
        icon: <Headset size={28} strokeWidth={1.5} />,
        title: "24/7 Support",
        desc: "Our dedicated support team is always available to assist you, ensuring a smooth and worry-free rental experience from start to finish."
      },
      {
        icon: <Tag size={28} strokeWidth={1.5} />,
        title: "Transparent Pricing",
        desc: "Enjoy competitive and clear pricing with no hidden fees. We offer flexible daily, weekly, and monthly rates to fit your budget."
      },
      {
        icon: <ShieldCheck size={28} strokeWidth={1.5} />,
        title: "Safety & Security",
        desc: "Your safety is our priority. Our entire fleet undergoes regular, rigorous maintenance and safety inspections for your peace of mind on the road."
      },
      {
        icon: <CalendarCheck size={28} strokeWidth={1.5} />,
        title: "Easy Booking",
        desc: "Reserve your ideal car in just a few minutes with our simple, secure, and user-friendly online booking system."
      }
    ];
    // Services from your Elementor reference
   export const services = [
      { 
        icon: <PlaneTakeoff size={28} strokeWidth={1.5} />, 
        title: "Reliable Airport Transfers", 
        desc: "Enjoy a stress-free start and end to your journey. We provide reliable transfers to and from any airport with flight tracking included." 
      },
      { 
        icon: <CarFront size={28} strokeWidth={1.5} />, 
        title: "Modern Car Rentals", 
        desc: "Choose from our diverse fleet of modern, well-maintained vehicles, perfect for business trips, family holidays, or exploring Egypt in comfort." 
      },
      { 
        icon: <MapIcon size={28} strokeWidth={1.5} />, 
        title: "Customized Tour Trips", 
        desc: "Beyond simple rentals, we can arrange day trips or longer excursions to the destinations of your dreams. Your itinerary, your schedule." 
      }
    ];
  
    // Branches/Locations from your Elementor reference
    export const branches = [
      { name: "Cairo", image: "/cairo.jpg"},
      { name: "Alexandria", image: "/alex.jpg"},
      { name: "Hurghada", image: "/hurghada.jpg"},
    ];
  
    export const whyChooseUs = [
      {
        icon: <Headset size={28} strokeWidth={1.5} />,
        title: "24/7 Support",
        desc: "Our dedicated support team is always available to assist you, ensuring a smooth and worry-free rental experience from start to finish."
      },
      {
        icon: <Tag size={28} strokeWidth={1.5} />,
        title: "Transparent Pricing",
        desc: "Enjoy competitive and clear pricing with no hidden fees. We offer flexible daily, weekly, and monthly rates to fit your budget."
      },
      {
        icon: <ShieldCheck size={28} strokeWidth={1.5} />,
        title: "Safety & Security",
        desc: "Your safety is our priority. Our entire fleet undergoes regular, rigorous maintenance and safety inspections for your peace of mind."
      },
      {
        icon: <CalendarCheck size={28} strokeWidth={1.5} />,
        title: "Easy Booking",
        desc: "Reserve your ideal car in just a few minutes with our simple, secure, and user-friendly online booking system."
      }
    ];

    export const formatForInput = (date) => {
      const d = new Date(date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
    };
    
    // Inline Hint Component
   export const ValidationHint = ({ message }) => (
      <div className="flex items-center gap-1 mt-1 text-rose-400 animate-in fade-in slide-in-from-top-1">
        <AlertCircle size={10} />
        <span className="text-[8px] font-bold uppercase tracking-tighter">{message}</span>
      </div>
    );