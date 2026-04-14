"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Wifi, Map, Users, Briefcase, User, Mail,
  ArrowRight, Search, Clock, AlertCircle 
} from 'lucide-react';
import MapSelectionModal from './MapSelectionModal';

// Helper to format date for input min attribute (YYYY-MM-DDTHH:mm)
const formatForInput = (date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

// Inline Hint Component
const ValidationHint = ({ message }) => (
  <div className="flex items-center gap-1 mt-1 text-rose-400 animate-in fade-in slide-in-from-top-1">
    <AlertCircle size={10} />
    <span className="text-[8px] font-bold uppercase tracking-tighter">{message}</span>
  </div>
);

const BookingForm = React.memo(({ 
  formData, setFormData, handleBooking, isProcessing, isFormValid, 
  priceBreakdown, setMapModal 
}) => {
  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white font-bold tracking-widest focus:border-[#C5A25D] outline-none transition-all";
  const iconInputStyle = "pl-12 " + inputStyle;

  // Logic for min dates based on current time (2026)
  const now = new Date();
  const minPickup = formData.reservationType === "Full Day" 
    ? formatForInput(new Date(now.getTime() + 2 * 60 * 60 * 1000)) 
    : formatForInput(now);

  const minDropoff = useMemo(() => {
    if (!formData.fromDate) return minPickup;
    const start = new Date(formData.fromDate);
    const bufferHours = formData.reservationType === "Full Day" 
      ? (formData.car.rentalOptions?.fullDayHours || 24) 
      : 2;
    return formatForInput(new Date(start.getTime() + bufferHours * 60 * 60 * 1000));
  }, [formData.fromDate, formData.reservationType, formData.car.rentalOptions]);

  return (
    <form onSubmit={handleBooking} className="space-y-4">
      {/* Customer Info */}
      <div className="space-y-3">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A25D]" size={18} />
          <input required placeholder="CUSTOMER NAME" className={iconInputStyle} value={formData.customerName}
            onChange={(e) => setFormData(p => ({...p, customerName: e.target.value}))} />
          {!formData.customerName && <ValidationHint message="Required field" />}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A25D]" size={18} />
            <input required type="email" placeholder="EMAIL ADDRESS" className={iconInputStyle} value={formData.email}
              onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input required placeholder="PHONE 1" className={inputStyle} value={formData.phone1}
              onChange={(e) => setFormData(p => ({...p, phone1: e.target.value}))} />
            <input placeholder="PHONE 2" className={inputStyle} value={formData.phone2}
              onChange={(e) => setFormData(p => ({...p, phone2: e.target.value}))} />
          </div>
        </div>
      </div>

      {/* Type & Nationality */}
      <div className="grid grid-cols-2 gap-3">
        <select className={inputStyle} value={formData.reservationType} 
          onChange={(e) => setFormData(p => ({...p, reservationType: e.target.value, fromDate: "", toDate: ""}))}>
          {formData.car.rentalOptions?.isStandardRental && <option value="Original Pickup">STANDARD RENTAL</option>}
          {formData.car.rentalOptions?.isFullDayRental && <option value="Full Day">FULL DAY RENTAL</option>}
        </select>
        <select className={inputStyle} value={formData.nationality} onChange={(e) => setFormData(p => ({...p, nationality: e.target.value}))}>
          <option value="Egyptian">EGYPTIAN</option>
          <option value="Non-Egyptian">NON-EGYPTIAN</option>
        </select>
      </div>

      {/* Locations */}
      <div className="space-y-3">
        {['pickupLocation', 'dropoffLocation'].map((loc) => (
          <div key={loc}>
            <label className="text-[8px] text-slate-500 font-black uppercase mb-1 block">{loc.replace('Location', ' Details')}</label>
            <div className="flex gap-2">
              <input 
                required 
                readOnly={!formData[loc].lat} // Only editable AFTER picking on map
                placeholder="SELECT ON MAP..." 
                className={`${inputStyle} ${!formData[loc].lat ? 'opacity-60' : 'border-[#C5A25D]'}`} 
                value={formData[loc].address}
                onChange={(e) => setFormData(p => ({...p, [loc]: {...p[loc], address: e.target.value}}))}
              />
              <button type="button" onClick={() => setMapModal({ open: true, field: loc })} 
                className="bg-[#C5A25D] text-[#0F172A] p-3 rounded-xl hover:opacity-80 shrink-0">
                <Search size={18}/>
              </button>
            </div>
            {!formData[loc].address && <ValidationHint message="Please select location on map" />}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[8px] text-slate-500 font-black mb-1 block uppercase">Pickup Date/Time</label>
          <input required type="datetime-local" min={minPickup} className={inputStyle + " invert-calendar"} value={formData.fromDate}
            onChange={(e) => {
              const start = e.target.value;
              const buffer = formData.reservationType === "Full Day" ? (formData.car.rentalOptions?.fullDayHours || 24) : 2;
              const end = formatForInput(new Date(new Date(start).getTime() + buffer * 60 * 60 * 1000));
              setFormData(p => ({...p, fromDate: start, toDate: end}));
            }} />
        </div>
        <div>
          <label className="text-[8px] text-slate-500 font-black mb-1 block uppercase">Dropoff Date/Time</label>
          <input required type="datetime-local" min={minDropoff} className={inputStyle + " invert-calendar"} value={formData.toDate}
            onChange={(e) => setFormData(p => ({...p, toDate: e.target.value}))} />
        </div>
      </div>

      {/* Extra Info for Full Day */}
      {formData.reservationType === "Full Day" && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
          <div className="flex justify-between text-[8px] font-black uppercase text-slate-400">
            <span>Limit: {formData.car.rentalOptions?.fullDayHours}H / {formData.car.rentalOptions?.limitKilometers}KM</span>
            <span className="text-[#C5A25D]">Extra: ${formData.car.rentalOptions?.extraHourCost}/hr | ${formData.car.rentalOptions?.extraKmCost}/km</span>
          </div>
          {priceBreakdown.extraHrs > 0 && (
            <div className="flex items-center gap-2 text-rose-400">
              <Clock size={12} />
              <span className="text-[9px] font-black uppercase">Extra Hours: {priceBreakdown.extraHrs}</span>
            </div>
          )}
        </div>
      )}

      {/* Quote Display */}
      {priceBreakdown.total > 0 && (
        <div className="bg-[#C5A25D] rounded-xl p-4 text-[#0F172A]">
          <div className="flex justify-between items-center border-b border-[#0F172A]/10 pb-2 mb-2">
            <div className="text-[9px] font-black uppercase leading-tight">
              Rate: ${priceBreakdown.base.toLocaleString()}<br/>
              {priceBreakdown.extraHrs > 0 && `Extra Hours: $${priceBreakdown.extraCost.toLocaleString()}`}
            </div>
            <div className="text-right">
              <span className="text-[8px] font-black uppercase block">Total</span>
              <h5 className='text-xl font-black'>${priceBreakdown.total.toLocaleString()}</h5>
            </div>
          </div>
        </div>
      )}
      <select className={inputStyle} value={formData.paymentType} onChange={(e) => setFormData(p => ({...p, paymentType: e.target.value}))}>
          <option value="Cash" > Cash</option>
          <option value="Visa">Visa</option>
          <option value="Transfer">Transfer</option>
          
        </select>

      <button disabled={!isFormValid || isProcessing} type="submit" 
        className="w-full bg-[#C5A25D] text-[#0F172A] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all disabled:opacity-20"
      >
        {isProcessing ? "Processing..." : "Confirm Reservation"} <ArrowRight size={14}/>
      </button>
    </form>
  );
});
// Set display name for debugging
BookingForm.displayName = 'BookingForm';

// 2. MAIN COMPONENT
export default function CarDetailInteractive({ car}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mapModal, setMapModal] = useState({ open: false, field: '' });
  
  const [formData, setFormData] = useState({
    customerName: '', 
    email: '',
    phone1: '',
    phone2: '',
    nationality: 'Egyptian',
    car: car,
    reservationType: car.rentalOptions.isStandardRental?'Original Pickup':'Full Day',
    pickupLocation: { address: '', lat: 0, lng: 0 },
    dropoffLocation: { address: '', lat: 0, lng: 0 },
    fromDate: '', toDate: '', 
    rate: car.price,
    extraHourCost: car.rentalOptions.extraHourCost,
    extraKmCost: car.rentalOptions.extraKmCost,
    fullDayHours: car.rentalOptions.fullDayHours,
     limitKilometers: car.rentalOptions.limitKilometers,
    totalPrice:0,
    additionalPrice: 0, 
    additionalHours: 0,
    cashDeposit: 0, 
    cashRemaining: 0,
    paymentType: 'Cash'
  });

  useEffect(() => { setMounted(true); }, []);

  const priceBreakdown = useMemo(() => {
    const rate = parseInt(car.price.toString().replace(/[^0-9]/g, '')) || 0;
    if (!formData.fromDate || !formData.toDate) return { total: 0, base: 0, extraHrs: 0, extraCost: 0 };

    const durationHrs = (new Date(formData.toDate) - new Date(formData.fromDate)) / (1000 * 60 * 60);
    
    if (formData.reservationType === "Full Day") {
      const limit = car.rentalOptions?.fullDayHours || 24;
      const extraHrs = Math.max(0, Math.ceil(durationHrs - limit));
      const extraCost = extraHrs * (car.rentalOptions?.extraHourCost || 0);
      setFormData(p => ({ ...p, totalPrice: rate + extraCost, additionalPrice: extraCost, additionalHours: extraHrs,cashRemaining: rate + extraCost }));
      return { total: rate + extraCost, base: rate, extraHrs, extraCost };
    } else {
      const days = Math.max(1, Math.ceil(durationHrs / 24));
      setFormData(p => ({ ...p, totalPrice: rate * days, additionalPrice: 0 ,additionalHours: 0,cashRemaining: rate * days }));
      return { total: rate * days, base: rate * days, extraHrs: 0, extraCost: 0 };
    }
  }, [formData.fromDate, formData.toDate, formData.reservationType, car]);

  const isFormValid = formData.customerName && formData.phone1 && formData.pickupLocation.lat && formData.fromDate && formData.toDate;

  const handleLocationConfirm = (locationData) => {
    setFormData(prev => ({ 
      ...prev, 
      [mapModal.field]: { address: locationData.address, lat: locationData.lat, lng: locationData.lng }
    }));
    setMapModal({ open: false, field: '' });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsProcessing(true); 
  
    // 3. MAP FRONTEND STATE TO BACKEND REQUIREMENTS
  
    console.log("Sending mapped data to backend:", formData);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rentals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) // Send the newly mapped payload
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to process booking");
      }
     const mailresponse = await fetch(`http://localhost:3000/api/send`, {
        method: 'POST',
        body: JSON.stringify(formData) // Send the same data to trigger email
      });
  
      if (!mailresponse.ok) {
        console.error("Email sending failed:", await mailresponse.text());
      } else {
        console.log("Email sent successfully");
      
      alert("Reservation successfully submitted! Check your email.");
      
      // 4. ROUTE TO FLEET
      router.push('/fleet'); 
      }
    } catch (err) {
      console.error("Booking error:", err.message);
      alert(`Booking Failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };
    
  

  if (!mounted) return null;
  return (
    <main className="bg-[#F8FAFC] min-h-screen pt-24 pb-12">
     <MapSelectionModal isOpen={mapModal.open} onClose={() => setMapModal({ open: false, field: '' })} onConfirm={handleLocationConfirm} />
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Media & Calendar */}
        <div className="lg:col-span-7 space-y-6">
          <section className="space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-white border-4 border-white shadow-2xl">
              <Image 
                src={car.images[activeImg]} 
                alt={car.name} 
                fill 
                className="object-cover" 
                priority 
                sizes="(max-w-1024px) 100vw, 60vw"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {car.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(i)} 
                  className={`relative min-w-[100px] h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#C5A25D]' : 'border-transparent opacity-50'}`}
                >
                  <Image src={img} alt="thumbnail" fill className="object-cover" sizes="100px" />
                </button>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: Details & Form */}
        <div className="lg:col-span-5 space-y-6">
          <header className="space-y-2">
            <span className="bg-[#C5A25D]/10 text-[#C5A25D] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{car.type}</span>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{car.name}</h1>
            <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-[#C5A25D] pl-4">{car.description}</p>
          </header>

          <section className="bg-white rounded-3xl p-6 border border-slate-100 grid grid-cols-2 gap-6">
             {[
                { icon: Users, val: car.specs.passengers, label: "Capacity" },
                { icon: Briefcase, val: car.specs.luggage, label: "Luggage" },
                { icon: Wifi, val: "5G WiFi", label: "Enabled" },
                { icon: Map, val: "GPS", label: "Navigation" }
             ].map((spec, idx) => (
                <div key={idx} className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#C5A25D]"><spec.icon size={18}/></div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-slate-900 leading-none">{spec.val}</p>
                      <p className="text-[8px] font-bold text-slate-400 uppercase mt-1">{spec.label}</p>
                   </div>
                </div>
             ))}
          </section>

          <div className="bg-[#0F172A] rounded-[2.5rem] p-8 shadow-2xl">
            <BookingForm 
             formData={formData} setFormData={setFormData}
             handleBooking={handleBooking} isProcessing={isProcessing}
             isFormValid={isFormValid} priceBreakdown={priceBreakdown}
             setMapModal={setMapModal}
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .invert-calendar::-webkit-calendar-picker-indicator { filter: invert(1); }
      `}</style>
    </main>
  );
}