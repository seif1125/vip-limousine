"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { 
  Wifi, Map, Users, Briefcase, User, Mail, Tag, Info,
  ArrowRight, Search, Clock, AlertCircle,ShipWheel,Plane, Building2, 
  Armchair,
  SunSnow
} from 'lucide-react';
import MapSelectionModal from './MapSelectionModal';

import { AIRPORTS, CITIES } from '../../constants/index';

// Static Lists



const formatForInput = (date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const BookingForm = React.memo(({ 
  formData, setFormData, handleBooking, isProcessing, isFormValid, 
  priceBreakdown, setMapModal, t ,isAr
}) => {
  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[10px] text-white font-bold tracking-widest focus:border-[#C5A25D] outline-none transition-all";
  const iconInputStyle = "pl-12 " + inputStyle;

  const now = new Date();
  const minPickup = formData.reservationType === "Full Day" 
    ? formatForInput(new Date(now.getTime() + 2 * 60 * 60 * 1000)) 
    : formatForInput(now);

  const minDropoff = useMemo(() => {
    if (!formData.fromDate) return minPickup;
    const start = new Date(formData.fromDate);
    const bufferHours = formData.reservationType === "Full Day" ? (formData.car?.rentalOptions?.fullDayHours || 24) : 2;
    return formatForInput(new Date(start.getTime() + bufferHours * 60 * 60 * 1000));
  }, [formData.fromDate, formData.reservationType, formData.car]);

  const toggleLocationMode = (field) => {
    const modeKey = `${field}Mode`;
    
    setFormData(p => {
      let nextMode;
      const currentMode = p[modeKey];
  
      if (currentMode === 'text') {
        if (p.reservationType === 'Airport Transfer') nextMode = 'airport';
        else if (p.reservationType === 'city to city') nextMode = 'city';
        else nextMode = 'text'; 
      } else {
        nextMode = 'text';
      }
  
      return {
        ...p,
        [modeKey]: nextMode,
        [field]: { address: '', lat: 0, lng: 0 } 
      };
    });
  };

  return (
    <form onSubmit={handleBooking} className="space-y-4">
      {/* Customer Info */}
      <div className="space-y-3">
        <h1 className="text-[12px] text-[#C5A25D] font-black uppercase tracking-widest">{t('form.BookNow')}</h1>
      <div className="flex  gap-2 text-[#0F172A]">
                    <Info size={16} className="text-[#C5A25D]" />
                    <h4 className="text-[7px] text-[#fff] font-italic uppercase tracking-widest">{t('form.description') || 'Vehicle Description'}</h4>
                </div>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A25D]" size={18} />
          <input required placeholder={t('form.name')} className={iconInputStyle} value={formData.customerName}
            onChange={(e) => setFormData(p => ({...p, customerName: e.target.value}))} />
        </div>
        <div className="grid  gap-3">
          <div className="relative w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5A25D]" size={18} />
            <input required type="email" placeholder={t('form.email')} className={iconInputStyle+'w-full'} value={formData.email}
              onChange={(e) => setFormData(p => ({...p, email: e.target.value}))} />
          </div>
          <input required placeholder={t('form.phone1')} className={inputStyle} value={formData.phone1}
            onChange={(e) => setFormData(p => ({...p, phone1: e.target.value}))} />
         <input placeholder={t('form.phone1')} className={inputStyle} value={formData.phone2}
            onChange={(e) => setFormData(p => ({...p, phone2: e.target.value}))} />
        </div>
      </div>

      {/* Reservation Type & Nationality */}
      <div className="grid grid-cols-2 gap-3">
        <select className={inputStyle} value={formData.reservationType} 
          onChange={(e) => {
            const val = e.target.value;
            setFormData(p => ({
                ...p, 
                reservationType: val, 
                fromDate: "", 
                toDate: "",
                pickupLocationMode: val === 'Airport Transfer' ? 'airport' : 'city',
                dropoffLocationMode: 'city',
                pickupLocation: { address: '', lat: 0, lng: 0 },
                dropoffLocation: { address: '', lat: 0, lng: 0 }
            }));
          }}>
         {formData.car?.rentalOptions?.isStandardRental && <option value="Original Pickup">{t('form.standard')}</option>}
         {formData.car?.rentalOptions?.isFullDayRental && <option value="Full Day">{t('form.fullDay')}</option>}
         {formData.car?.rentalOptions?.isAirport && <option value="Airport Transfer">{t('form.airportTransfer')}</option>}
         {formData.car?.rentalOptions?.isCityToCity && <option value="city to city">{t('form.cityToCity')}</option>}
        </select>
        <select className={inputStyle} value={formData.nationality} onChange={(e) => setFormData(p => ({...p, nationality: e.target.value}))}>
          <option value="Egyptian">{t('form.egyptian')}</option>
          <option value="Non-Egyptian">{t('form.nonEgyptian')}</option>
        </select>
      </div>

      
      {/* Locations Section */}
{/* Locations Section */}
<div className="space-y-3">
  {['pickupLocation', 'dropoffLocation'].map((loc) => {
    const modeKey = `${loc}Mode`;
    const currentMode = formData[modeKey] || 'text';
    const resType = formData.reservationType;
    
    const isAirportType = resType === 'Airport Transfer';
    const isCityType = resType === 'city to city';
    const isStandardOrFull = resType === 'Original Pickup' || resType === 'Full Day';

    return (
      <div key={loc}>
        <label className="text-[8px] text-slate-500 font-black uppercase mb-1 block">
          {t(`form.${loc}Label`)}
        </label>
        
        <div className="flex gap-2">
          {/* LEFT SIDE: INPUT OR SELECT */}
          <div className="flex-1">
            {currentMode === 'text' || isStandardOrFull ? (
              /* 
                 Standard/Full Day always uses this input.
                 Airport/City use this when currentMode is 'text'.
                 Manual typing resets lat/lng to 0,0.
              */
              <input 
                required 
                placeholder={t('form.enterAddress')} 
                className={inputStyle}
                value={formData[loc].address}
                onChange={(e) => setFormData(p => ({
                  ...p, 
                  [loc]: { address: e.target.value, lat: 0, lng: 0 } 
                }))}
              />
            ) : (
              /* SELECT LISTS: Only for Airport/City modes */
              <>
                {(isAirportType && currentMode === 'airport') && (
                  <select 
                    required className={inputStyle} 
                    value={formData[loc].address ? JSON.stringify({ address: formData[loc].address, lat: formData[loc].lat, lng: formData[loc].lng }) : ""}
                    onChange={(e) => {
                      if (!e.target.value) return;
                      setFormData(p => ({ ...p, [loc]: JSON.parse(e.target.value) }));
                    }}
                  >
                    <option value="">{t('form.selectAirport')}</option>
                    {AIRPORTS.map(ap => (
                      <option key={ap.id} value={JSON.stringify({ address: isAr ? ap.name_ar : ap.name_en, lat: ap.lat, lng: ap.lng })}>
                        {isAr ? ap.name_ar : ap.name_en}
                      </option>
                    ))}
                  </select>
                )}

                {(isCityType && currentMode === 'city') && (
                  <select 
                    required className={inputStyle} 
                    value={formData[loc].address ? JSON.stringify({ address: formData[loc].address, lat: formData[loc].lat, lng: formData[loc].lng }) : ""}
                    onChange={(e) => {
                      if (!e.target.value) return;
                      setFormData(p => ({ ...p, [loc]: JSON.parse(e.target.value) }));
                    }}
                  >
                    <option value="">{t('form.selectCity')}</option>
                    {CITIES.map(c => (
                      <option key={c.id} value={JSON.stringify({ address: isAr ? c.name_ar : c.name_en, lat: c.lat, lng: c.lng })}>
                        {isAr ? c.name_ar : c.name_en}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
          </div>

          {/* RIGHT SIDE: ACTION BUTTONS */}
          <div className="flex gap-1">
            {/* Map Search Button: Always visible for Standard/Full Day */}
            {isStandardOrFull && (
              <button type="button" onClick={() => setMapModal({ open: true, field: loc })} 
                className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-all">
                <Search size={18}/>
              </button>
            )}

            {/* Mode Toggle Button: For Airport/City to switch between Text and List */}
            {(isAirportType || isCityType) && (
              <button type="button" onClick={() => toggleLocationMode(loc)}
                className="bg-[#C5A25D] text-[#0F172A] p-3 rounded-xl hover:opacity-80 shrink-0">
                {currentMode === 'text' ? (
                  isAirportType ? <Plane size={18}/> : <Building2 size={18}/>
                ) : (
                  <Tag size={18}/> 
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  })}
</div>

      {/* Dates & Pricing */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[8px] text-slate-500 font-black mb-1 block uppercase">{t('form.pickupDate')}</label>
          <input required type="datetime-local" min={minPickup} className={inputStyle + " invert-calendar"} value={formData.fromDate}
            onChange={(e) => {
              const start = e.target.value;
              const buffer = formData.reservationType === "Full Day" ? (formData.car?.rentalOptions?.fullDayHours || 24) : 2;
              const end = formatForInput(new Date(new Date(start).getTime() + buffer * 60 * 60 * 1000));
              setFormData(p => ({...p, fromDate: start, toDate: end}));
            }} />
        </div>
        <div>
          <label className="text-[8px] text-slate-500 font-black mb-1 block uppercase">{t('form.dropoffDate')}</label>
          <input required type="datetime-local" min={minDropoff} className={inputStyle + " invert-calendar"} value={formData.toDate}
            onChange={(e) => setFormData(p => ({...p, toDate: e.target.value}))} />
        </div>
      </div>

      {priceBreakdown.total > 0 && (
  <div className="space-y-3">
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
      {/* Base Rate */}
      <div className="flex justify-between items-center text-[9px] uppercase tracking-wider">
        <span className="text-slate-400">{t('form.baseRate')}</span>
        <span className="text-white font-bold">${priceBreakdown.base.toLocaleString()}</span>
      </div>

      {/* Extra Hours (Only if they exist) */}
      {priceBreakdown.extraHours > 0 && (
        <div className="flex justify-between items-center text-[9px] uppercase tracking-wider">
          <span className="text-slate-400">
            {t('form.extraHours')} ({priceBreakdown.extraHours}h × ${priceBreakdown.extraHourRate})
          </span>
          <span className="text-white font-bold">
            +${(priceBreakdown.extraHours * priceBreakdown.extraHourRate).toLocaleString()}
          </span>
        </div>
      )}

      <div className="h-px bg-white/10 my-2" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black uppercase text-[#C5A25D]">{t('form.total')}</span>
        <h5 className="text-2xl font-black text-white">${priceBreakdown.total.toLocaleString()}</h5>
      </div>
    </div>

    {/* Disclaimer */}
    <div className="flex gap-2 px-2">
        <Info size={12} className="text-[#C5A25D] shrink-0" />
        <p className="text-[8px] text-slate-400 leading-tight italic">
            {t('form.disclaimer') || "Note: This is an estimated rate. Final pricing may vary based on actual distance, waiting time, or additional requested services."}
        </p>
    </div>

    {/* Payment Type */}
    <select className={inputStyle} value={formData.paymentType} onChange={(e) => setFormData(p => ({...p, paymentType: e.target.value}))}>
      <option value="Cash">{t('form.cash')}</option>
      <option value="Visa">{t('form.visa')}</option>
      <option value="Transfer">{t('form.transfer')}</option>
    </select>
  </div>
)}

     

      <button disabled={!isFormValid || isProcessing} type="submit" 
        className="w-full bg-[#C5A25D] text-[#0F172A] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all disabled:opacity-20"
      >
        {isProcessing ? t('form.processing') : t('form.confirm')} <ArrowRight size={14}/>
      </button>
    </form>
  );
});

BookingForm.displayName = 'BookingForm';

const getInitialFormData = (car) => ({
  customerName: '', email: '', phone1: '', phone2: '', nationality: 'Egyptian',
  car: car,
  reservationType: car?.rentalOptions?.isStandardRental ? 'Original Pickup' : 'Full Day',
  pickupLocation: { address: '', lat: 0, lng: 0 },
  dropoffLocation: { address: '', lat: 0, lng: 0 },
  pickupLocationMode: 'text', 
  dropoffLocationMode: 'text',
  fromDate: '', toDate: '', 
  paymentType: 'Cash',
});
export default function CarDetailInteractive({ car }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('FleetClient');
  const isAr = locale === 'ar';
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 5000);
  };

  const [formData, setFormData] = useState(getInitialFormData(car));
  const [mounted, setMounted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mapModal, setMapModal] = useState({ open: false, field: '' });
  


  useEffect(() => { setMounted(true); }, []);

  const priceBreakdown = useMemo(() => {
    const rate = parseInt(car?.price?.toString().replace(/[^0-9]/g, '')) || 0;
    if (!formData.fromDate || !formData.toDate) return { total: 0, base: rate };
    
    const durationHrs = (new Date(formData.toDate) - new Date(formData.fromDate)) / (1000 * 60 * 60);
    const extraHourRate = car?.rentalOptions?.extraHourCost || 0;
    
    let total = 0;
    let extraHours = 0;

    if (formData.reservationType === "Full Day") {
      const limit = car?.rentalOptions?.fullDayHours || 24;
      extraHours = Math.max(0, Math.ceil(durationHrs - limit));
      total = rate + (extraHours * extraHourRate);
    } else {
      const days = Math.max(1, Math.ceil(durationHrs / 24));
      total = rate * days;
    }

    return { 
      total, 
      base: rate, 
      extraHours, 
      extraHourRate,
      isFullDay: formData.reservationType === "Full Day" 
    };
  }, [formData.fromDate, formData.toDate, formData.reservationType, car]);
  const isFormValid = formData.customerName && formData.phone1 && formData.pickupLocation.address && formData.dropoffLocation.address && formData.fromDate;

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
    
    try {
      // Extract the missing fields the backend is screaming for
      const rentalOptions = formData.car?.rentalOptions || {};
      
      const payload = {
        ...formData,
        totalPrice: priceBreakdown.total,
        // Map the nested car data to the top-level keys required by your schema
        rate: formData.car?.price || 0,
        extraHourCost: rentalOptions.extraHourCost || 0,
        extraKmCost: rentalOptions.extraKmCost || 0,
        limitKilometers: rentalOptions.limitKilometers || 0,
        fullDayHours: rentalOptions.fullDayHours || 0,
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rentals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload) // Send the flattened payload
      });
  
      if (response.ok) {
        await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formData, locale }) 
        });
  
        showToast(t('form.successMessage') || "Booking Confirmed!");
        
        setTimeout(() => {
            setFormData(getInitialFormData(car));
            window.location.reload();
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Backend Validation Error:", errorData);
        throw new Error("Database save failed");
      }
    } catch (err) {
      showToast(t('form.errorMessage') || "Something went wrong.", 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!mounted || !car) return null;

  // --- THE FIX --- 
  // Safely grab the category name, whether the DB returned an Object or a plain String.
  const displayCategory = typeof car.category === 'object' && car.category !== null
    ? (isAr ? car.category.name_ar : car.category.name_en)
    : (car.category || 'Standard');

  return (
    <main className="bg-[#F8FAFC] min-h-screen pt-24 pb-12 relative" dir={isAr ? 'rtl' : 'ltr'}>
      {toast.show && (
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all ${
          toast.type === 'success' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-rose-500 border-rose-400 text-white'
        }`}>
          {toast.type === 'success' ? <AlertCircle size={20}/> : <AlertCircle size={20}/>}
          <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
        </div>
      )}
      <MapSelectionModal isOpen={mapModal.open} onClose={() => setMapModal({ open: false, field: '' })} onConfirm={handleLocationConfirm} />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-7">
          <section className="space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-white border-4 border-white shadow-2xl">
              <Image 
                src={car.images && car.images.length > 0 ? car.images[activeImg] : '/placeholder.jpg'} 
                alt={isAr ? car.name_ar : car.name_en} 
                fill 
                className="object-cover" 
                priority 
              />
            </div>
          </section>

          
        </div>
        
        {/* Right Column: Form */}
        <div className="lg:col-span-5 space-y-6">
        <section className="space-y-6 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                    <span className="bg-[#C5A25D]/10 text-[#C5A25D] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                        {/* FIX APPLIED HERE */}
                        {displayCategory}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] uppercase">
                        {isAr ? car.name_ar : car.name_en}
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{t('form.startingFrom')}</p>
                    <h3 className="text-3xl font-black text-[#C5A25D]">${car.price}</h3>
                </div>
            </div>

            <div className="grid grid-cols-2  gap-6">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl text-[#C5A25D]"><Users size={20}/></div>
                    <div>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">{t('specs.passengers') || 'Passengers'}</p>
                        <p className="text-xs font-black text-[#0F172A]">{car.specs.passengers } {t('specs.seats')}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl text-[#C5A25D]"><Briefcase size={20}/></div>
                    <div>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">{t('specs.luggage') || 'Luggage'}</p>
                        <p className="text-xs font-black text-[#0F172A]">{car.specs.luggage } {t('specs.bags')}</p>
                    </div>
                </div>
                
              { car.specs.wifi&&( <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl text-[#C5A25D]"><Wifi size={20}/></div>
                    <div>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">{t('specs.wifi')}</p>
                        <p className="text-sm font-black text-[#0F172A]">{t('specs.available')}</p>
                    </div>
                </div>)}
                { car.specs.fourWheel&&( <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl text-[#C5A25D]"><ShipWheel size={20}/></div>
                    <div>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">{t('specs.fourWheel')}</p>
                        <p className="text-sm font-black text-[#0F172A]">{t('specs.available')}</p>
                    </div>
                </div>)}
                { car.specs.gps&&( <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl text-[#C5A25D]"><Map size={20}/></div>
                    <div>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">{t('specs.gps')}</p>
                        <p className="text-sm font-black text-[#0F172A]">{t('specs.available')}</p>
                    </div>
                </div>)}
                { car.specs.leatherSeats&&( <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl text-[#C5A25D]"><Armchair size={20}/></div>
                    <div>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">{t('specs.leatherSeats')}</p>
                        <p className="text-sm font-black text-[#0F172A]">{t('specs.available')}</p>
                    </div>
                </div>)}

                { car.specs.climateControl&&( <div className="flex items-center gap-3">
                    <div className="bg-slate-50 p-3 rounded-2xl text-[#C5A25D]"><SunSnow size={20}/></div>
                    <div>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">{t('specs.AC')}</p>
                        <p className="text-sm font-black text-[#0F172A]">{t('specs.available')}</p>
                    </div>
                </div>)}
            </div>

            <div className="space-y-3">
            
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {isAr ? car.description_ar : car.description_en}
                </p>
            </div>
          </section>
          <div className="bg-[#0F172A] rounded-[2.5rem] p-8 shadow-2xl sticky top-24">
            <BookingForm 
              formData={formData} setFormData={setFormData}
              handleBooking={handleBooking} isProcessing={isProcessing}
              isFormValid={isFormValid} priceBreakdown={priceBreakdown}
              setMapModal={setMapModal} t={t} isAr={isAr}
            />
          </div>
        </div>

      </div>
      <style jsx>{`
        .invert-calendar::-webkit-calendar-picker-indicator { filter: invert(1); }
      `}</style>
    </main>
  );
}