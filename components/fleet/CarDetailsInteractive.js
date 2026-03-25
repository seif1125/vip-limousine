"use client";
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Wifi, Map, Users, Briefcase, Calendar, ChevronLeft, 
  ChevronRight, OctagonAlert, User, Mail, Smartphone, Globe, 
  CheckCircle2, ArrowRight
} from 'lucide-react';

// 1. SUB-COMPONENT: Memoized Booking Form
// This prevents the Gallery and Calendar from re-rendering on every keystroke.
const BookingForm = React.memo(({ 
  formData, setFormData, handleBooking, isProcessing, isFormValid, 
  totalDays, totalPrice, acceptedTerms, setAcceptedTerms, 
  acceptedPrivacy, setAcceptedPrivacy 
}) => {
  return (
    <form onSubmit={handleBooking} className="space-y-4">
      <div className="space-y-2.5">
        <div className="relative flex items-center">
          <User className="absolute left-4 text-[#C5A25D]" size={18} />
          <input 
            required 
            placeholder="FULL NAME" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[10px] text-white font-bold tracking-widest focus:border-[#C5A25D] outline-none transition-all" 
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} 
          />
        </div>
        <div className="relative flex items-center">
          <Mail className="absolute left-4 text-[#C5A25D]" size={18} />
          <input 
            required 
            type="email"
            placeholder="EMAIL ADDRESS" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[10px] text-white font-bold tracking-widest focus:border-[#C5A25D] outline-none transition-all" 
            value={formData.email}
            onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        <div className="relative flex items-center">
          <Smartphone className="absolute left-4 text-[#C5A25D]" size={18} />
          <input 
            required 
            placeholder="MOBILE NUMBER" 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[10px] text-white font-bold tracking-widest focus:border-[#C5A25D] outline-none transition-all" 
            value={formData.mobile}
            onChange={(e) => setFormData(prev => ({...prev, mobile: e.target.value}))} 
          />
        </div>
        <div className="relative flex items-center">
          <Globe className="absolute left-4 text-[#C5A25D]" size={18} />
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[10px] text-white font-bold tracking-widest focus:border-[#C5A25D] outline-none transition-all appearance-none cursor-pointer" 
            value={formData.nationality}
            onChange={(e) => setFormData(prev => ({...prev, nationality: e.target.value}))}
          >
            <option value="Egyptian" className="bg-[#0F172A]">EGYPTIAN</option>
            <option value="Non-Egyptian" className="bg-[#0F172A]">NON-EGYPTIAN</option>
          </select>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='flex items-center gap-2 text-white/50 mb-1'>
          <Calendar size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">Select Dates</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input 
            required type="date" 
            className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white invert-calendar" 
            onChange={(e) => setFormData(prev => ({...prev, fromDate: e.target.value}))} 
          />
          <input 
            required type="date" 
            min={formData.fromDate}
            className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white invert-calendar" 
            onChange={(e) => setFormData(prev => ({...prev, toDate: e.target.value}))} 
          />
        </div>
      </div>

      {formData.fromDate && formData.toDate && (
        <div className="bg-[#C5A25D] rounded-xl p-4 animate-in fade-in slide-in-from-top-2">
          <p className="text-[#0F172A] text-[10px] font-black uppercase italic mb-1">Estimated Quote</p>
          <div className="flex justify-between items-end">
            <h5 className='text-xl font-black text-[#0F172A]'>${totalPrice.toLocaleString()}</h5>
            <span className='text-[8px] font-bold text-[#0F172A]/70 uppercase'>{totalDays} Days Total</span>
          </div>
          <p className="text-[7px] text-[#0F172A]/60 font-bold uppercase mt-2 flex items-center gap-1">
            <OctagonAlert size={8} /> Final rates may vary based on specific requirements.
          </p>
        </div>
      )}

      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" className="hidden peer" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
          <div className="w-4 h-4 border border-white/20 rounded peer-checked:bg-[#C5A25D] flex items-center justify-center transition-all">
            {acceptedTerms && <CheckCircle2 size={10} className="text-[#0F172A]" />}
          </div>
          <span className="text-[8px] text-slate-400 font-bold uppercase group-hover:text-white">
            Accept  <Link href="/terms" className="text-[#C5A25D] underline">Terms</Link> and <Link href="/privacy" className="text-[#C5A25D] underline">Privacy Policy</Link>
          </span>
        </label>
        
        <button 
          disabled={!isFormValid || isProcessing}
          type="submit" 
          className="w-full bg-[#C5A25D] text-[#0F172A] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all disabled:opacity-20 active:scale-95"
        >
          {isProcessing ? "Processing..." : "Send Reservation Request"}
          {!isProcessing && <ArrowRight size={14}/>}
        </button>
      </div>
    </form>
  );
});

// Set display name for debugging
BookingForm.displayName = 'BookingForm';

// 2. MAIN COMPONENT
export default function CarDetailInteractive({ car, socials, reservations }) {
  const [mounted, setMounted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewDate, setViewDate] = useState(new Date()); 
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", nationality: "Egyptian", 
    fromDate: "", toDate: ""
  });

  useEffect(() => { setMounted(true); }, []);

  // --- Calculations ---
  const reservedDates = useMemo(() => {
    const res = reservations.find(r => r.carId === car.id)?.reservedDates || [];
    return res.map(d => new Date(d).toDateString());
  }, [car.id, reservations]);

  const isDateReserved = useCallback((date) => reservedDates.includes(date.toDateString()), [reservedDates]);

  const totalDays = useMemo(() => {
    if (!formData.fromDate || !formData.toDate) return 0;
    const diff = new Date(formData.toDate) - new Date(formData.fromDate);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
  }, [formData.fromDate, formData.toDate]);

  const totalPrice = useMemo(() => {
    const rate = parseInt(car.price.replace(/[^0-9]/g, '')) || 0;
    return rate * totalDays;
  }, [car.price, totalDays]);

  const isFormValid = formData.name && formData.email && formData.mobile && 
                      formData.fromDate && formData.toDate && acceptedTerms;

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }, [viewDate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, carName: car.name, totalPrice }),
      });
      if (response.ok) alert("Request sent!");
    } catch (err) { console.error(err); } 
    finally { setIsProcessing(false); }
  };

  if (!mounted) return null;

  return (
    <main className="bg-[#F8FAFC] min-h-screen pt-24 pb-12">
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

          {/* Calendar Section */}
          <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-black uppercase text-slate-900 flex items-center gap-2">
                   <Calendar className="text-[#C5A25D]" size={16} /> 
                   {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h4>
                <div className="flex gap-2">
                   <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-2 hover:bg-slate-50 rounded-full"><ChevronLeft size={16}/></button>
                   <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-2 hover:bg-slate-50 rounded-full"><ChevronRight size={16}/></button>
                </div>
             </div>
             <div className="grid grid-cols-7 gap-2">
                {['SUN','MON','TUE','WED','THU','FRI','SAT'].map(d => <span key={d} className="text-center text-[10px] font-black text-slate-300">{d}</span>)}
                {calendarDays.map((date, i) => {
                  if (!date) return <div key={i} />;
                  const reserved = isDateReserved(date);
                  return (
                    <div key={i} className={`h-12 flex items-center justify-center rounded-xl text-xs font-black border ${reserved ? 'bg-red-50 text-red-400 border-red-100' : 'bg-white text-slate-700 border-slate-100'}`}>
                      {date.getDate()}
                    </div>
                  );
                })}
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
              formData={formData}
              setFormData={setFormData}
              handleBooking={handleBooking}
              isProcessing={isProcessing}
              isFormValid={isFormValid}
              totalDays={totalDays}
              totalPrice={totalPrice}
              acceptedTerms={acceptedTerms}
              setAcceptedTerms={setAcceptedTerms}
              acceptedPrivacy={acceptedPrivacy}
              setAcceptedPrivacy={setAcceptedPrivacy}
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