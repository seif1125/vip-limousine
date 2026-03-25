 const MOCK_DATA = {
    banners: [
      {
        id: "b1",
        title: { en: "Elite Executive Travel Egypt", ar: "نخبة السفر التنفيذي في مصر" },
        subtitle: { en: "Secure luxury chauffeur services for international travelers in Cairo.", ar: "خدمات سائق فاخرة وآمنة للمسافرين الدوليين في القاهرة." },
        imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070",
        buttonText: { en: "Explore Fleet", ar: "اكتشف الأسطول" },
        buttonUrl: "/fleet"
      },
      {
        id: "b2",
        title: { en: "Cairo Airport Meet & Greet", ar: "استقبال مطار القاهرة" },
        subtitle: { en: "Professional English-speaking drivers waiting at the arrivals gate.", ar: "سائقون محترفون يتحدثون الإنجليزية في انتظاركم عند بوابة الوصول." },
        imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070",
        buttonText: { en: "Book Arrival", ar: "احجز وصولك" },
        buttonUrl: "https://wa.me/201222708033"
      }
    ],
    fleet: [
        {
          id: "s-class-2024",
          name: "Mercedes-Benz S-Class",
          model: "2024",
          type: "First Class",
          images: [
            "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=800", // Exterior side
            "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=800", // Interior Luxury
            "https://images.unsplash.com/photo-1622199611394-399a0937c86a?auto=format&fit=crop&q=80&w=800"  // Cockpit/Wheel
          ],
          price: "400",
          description: "The ultimate symbol of luxury and innovation. Perfect for executive travel.",
          featured: true,
          specs: { passengers: 3, luggage: 2, wifi: true, fourWheel: false, gps: true, leatherSeats: true, climateControl: true }
        },
        {
          id: "cadillac-escalade",
          name: "Cadillac Escalade ESV",
          model: "2023",
          type: "Luxury SUV",
         price: "450",
          images: [
            "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=800", // Front Profile
            "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800", // Interior space
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"  // Detail shot
          ],
          description: "Spacious, powerful, and commanding. The choice for group VIP transport.",
          featured: true,
          specs: { passengers: 6, luggage: 6, wifi: true, fourWheel: true, gps: true, leatherSeats: true, climateControl: true }
        },
        {
          id: "toyota-hiace",
          name: "Toyota HiAce Royale",
          model: "2024",
          type: "Executive Van",
       price: "350",
          images: [
            "https://images.unsplash.com/photo-1464851707681-f9d5fdaccea8?auto=format&fit=crop&q=80&w=800", // Executive Seating vibe
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"  // Rear view
          ],
          description: "Customized interior for high-capacity executive transfers with maximum comfort.",
          featured: false,
          specs: { passengers: 10, luggage: 8, wifi: true, fourWheel: false, gps: true, leatherSeats: true, climateControl: true }
        }
      ],
    testimonials: [
      { id: "r1", name: "John D.", title:"CEO,Vodafone" ,comment: "Best VIP service in Egypt. Professional and punctual.", rating: 5, origin: "UK",image:"https://images.unsplash.com/photo-1599566150163-29194dcaad36?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
      { id: "r2", name: "Ahmed M.",title:"CFO INTELLA" ,comment: "Highly recommend for corporate delegations.", rating: 5, origin: "Egypt",image:"https://images.unsplash.com/photo-1480429370139-e0132c086e2a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
    ],
    socials: {
      
      locations: [ {
        en: "Sheikh Zayed City, Giza, Egypt",
        ar: "مدينة الشيخ زايد، الجيزة، مصر",
        href: "https://goo.gl/maps/xyz123"
      },
      {
        en: "Cairo International Airport (CAI)",
        ar: "مطار القاهرة الدولي (CAI)",
        href: "https://goo.gl/maps/abc456"
      },
      { en: "New Administrative Capital, Egypt",
         ar: "العاصمة الإدارية الجديدة، مصر", 
          href: "https://goo.gl/maps/def789" }

    ],
      contact: {      
      email: "Mohgamal.t@gmail.com",
      whatsapp: "+201222708033",
      tel: "+201222708033",    
      facebook: "https://facebook.com/viplimo",
      instagram: "https://instagram.com/viplimo",
    }
    },

    // NEW: Reservation Mock Data
    reservations: [
      {
        carId: "s-class-2024",
        reservedDates: [
          new Date(2026, 2, 25), // March 25, 2026
          new Date(2026, 2, 26), // March 26, 2026
        ]
      },
      {
        carId: "cadillac-escalade",
        reservedDates: [
          new Date(2026, 3, 1),  // April 1, 2026
        ]
      }
    ]
  };
  
export default MOCK_DATA;