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
    export const trustPoints = [
      { 
        icon: <Globe size={20} />, 
        title_en: "English Speaking", title_ar: "متحدثون بالإنجليزية", 
        desc_en: "Fluent chauffeurs for clear communication.", desc_ar: "سائقون بطلاقة لتواصل واضح." 
      },
      { 
        icon: <ShieldCheck size={20} />, 
        title_en: "Certified Safety", title_ar: "سلامة معتمدة", 
        desc_en: "Vetted drivers and GPS-tracked luxury fleet.", desc_ar: "سائقون مفحوصون وأسطول مراقب بالـ GPS." 
      },
      { 
        icon: <Clock size={20} />, 
        title_en: "24/7 Monitoring", title_ar: "مراقبة على مدار الساعة", 
        desc_en: "We track your flight for perfect pickup timing.", desc_ar: "نتابع رحلتك لضمان الاستلام في الوقت المحدد." 
      }
    ];
    
    export const services = [
      { 
        icon: <PlaneTakeoff size={28} strokeWidth={1.5} />, 
        title_en: "Reliable Airport Transfers", title_ar: "انتقالات مطار موثوقة", 
        desc_en: "Enjoy a stress-free start and end to your journey with flight tracking.", desc_ar: "استمتع ببداية ونهاية لرحلتك خالية من التوتر مع تتبع الرحلات." 
      },
      { 
        icon: <CarFront size={28} strokeWidth={1.5} />, 
        title_en: "Modern Car Rentals", title_ar: "تأجير سيارات حديثة", 
        desc_en: "Diverse fleet of modern vehicles for business or family trips.", desc_ar: "أسطول متنوع من المركبات الحديثة لرحلات العمل أو العائلة." 
      },
      { 
        icon: <MapIcon size={28} strokeWidth={1.5} />, 
        title_en: "Customized Tour Trips", title_ar: "جولات سياحية مخصصة", 
        desc_en: "We arrange day trips to the destinations of your dreams.", desc_ar: "نحن نرتب رحلات يومية إلى الوجهات التي تحلم بها." 
      }
    ];
    
    export const branches = [
      { name_en: "Cairo", name_ar: "القاهرة", image: "/cairo.jpg" },
      { name_en: "Alexandria", name_ar: "الإسكندرية", image: "/alex.jpg" },
      { name_en: "Hurghada", name_ar: "الغردقة", image: "/hurghada.jpg" },
    ];
    
    export const whyChooseUs = [
      {
        icon: <Headset size={28} strokeWidth={1.5} />,
        title_en: "24/7 Support", title_ar: "دعم 24/7",
        desc_en: "Our dedicated support team is always available to assist you.", desc_ar: "فريق الدعم المخصص لدينا متاح دائمًا لمساعدتك."
      },
      {
        icon: <Tag size={28} strokeWidth={1.5} />,
        title_en: "Transparent Pricing", title_ar: "أسعار شفافة",
        desc_en: "Enjoy competitive and clear pricing with no hidden fees.", desc_ar: "استمتع بأسعار تنافسية وواضحة بدون رسوم مخفية."
      },
      {
        icon: <ShieldCheck size={28} strokeWidth={1.5} />,
        title_en: "Safety & Security", title_ar: "الأمن والسلامة",
        desc_en: "Our entire fleet undergoes regular safety inspections.", desc_ar: "يخضع أسطولنا بالكامل لفحوصات سلامة دورية."
      },
      {
        icon: <CalendarCheck size={28} strokeWidth={1.5} />,
        title_en: "Easy Booking", title_ar: "حجز سهل",
        desc_en: "Reserve your ideal car in minutes with our simple system.", desc_ar: "احجز سيارتك المثالية في دقائق بنظامنا البسيط."
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


    export const AIRPORTS = [
      { id: 1, name_en: "Cairo International Airport (CAI)", name_ar: "مطار القاهرة الدولي", lat: 30.1219, lng: 31.4056 },
      { id: 2, name_en: "Sphinx International Airport (SPX)", name_ar: "مطار سفنكس الدولي", lat: 30.1100, lng: 30.8958 },
      { id: 3, name_en: "Borg El Arab Airport (HBE)", name_ar: "مطار برج العرب الدولي", lat: 30.9175, lng: 29.5628 },
      { id: 4, name_en: "Hurghada International Airport (HRG)", name_ar: "مطار الغردقة الدولي", lat: 27.1861, lng: 33.7997 },
      { id: 5, name_en: "Sharm El Sheikh International Airport (SSH)", name_ar: "مطار شرم الشيخ الدولي", lat: 27.9772, lng: 34.3947 },
      { id: 6, name_en: "Luxor International Airport (LXR)", name_ar: "مطار الأقصر الدولي", lat: 25.6706, lng: 32.7064 },
      { id: 7, name_en: "Aswan International Airport (ASW)", name_ar: "مطار أسوان الدولي", lat: 23.9644, lng: 32.8194 },
      { id: 8, name_en: "Marsa Alam International Airport (RMF)", name_ar: "مطار مرسى علم الدولي", lat: 25.5564, lng: 34.5836 }
    ];
    export const CITIES = [
      { id: 1, name_en: "Cairo", name_ar: "القاهرة", lat: 30.0444, lng: 31.2357 },
      { id: 2, name_en: "Alexandria", name_ar: "الإسكندرية", lat: 31.2001, lng: 29.9187 },
      { id: 3, name_en: "Hurghada", name_ar: "الغردقة", lat: 27.2579, lng: 33.8116 },
      { id: 4, name_en: "Sharm El Sheikh", name_ar: "شرم الشيخ", lat: 27.9158, lng: 34.3299 },
      { id: 5, name_en: "Luxor", name_ar: "الأقصر", lat: 25.6872, lng: 32.6396 },
      { id: 6, name_en: "Aswan", name_ar: "أسوان", lat: 24.0889, lng: 32.8998 },
      { id: 7, name_en: "Giza", name_ar: "الجيزة", lat: 30.0131, lng: 31.2089 },
      { id: 8, name_en: "Marsa Alam", name_ar: "مرسى علم", lat: 25.0676, lng: 34.8790 },
      { id: 9, name_en: "North Coast (Sahel)", name_ar: "الساحل الشمالي", lat: 30.9328, lng: 28.9519 },
      { id: 10, name_en: "El Gouna", name_ar: "الجونة", lat: 27.3941, lng: 33.6784 },
      { id: 11, name_en: "Soma Bay", name_ar: "سوما باي", lat: 26.8458, lng: 33.9904 },
      { id: 12, name_en: "Port Said", name_ar: "بورسعيد", lat: 31.2653, lng: 32.3019 },
      { id: 13, name_en: "Ismailia", name_ar: "الإسماعيلية", lat: 30.5965, lng: 32.2715 },
      { id: 14, name_en: "Ain Sokhna", name_ar: "العين السخنة", lat: 29.6644, lng: 32.3275 },
      { id: 15, name_en: "Dahab", name_ar: "دهب", lat: 28.5094, lng: 34.5134 }
    ];