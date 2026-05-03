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
    const otherField = field === 'pickupLocation' ? 'dropoffLocation' : 'pickupLocation';
    const otherModeKey = `${otherField}Mode`;

    setFormData(p => {
      const isAirportTransfer = p.reservationType === 'Airport Transfer';
      const nextMode = p[modeKey] === 'airport' ? 'city' : 'airport';
      let otherNextMode = p[otherModeKey];

      if (isAirportTransfer && nextMode === 'city' && otherNextMode === 'city') {
        otherNextMode = 'airport';
      }

      const newState = {
        ...p,
        [modeKey]: nextMode,
        [otherModeKey]: otherNextMode,
        [field]: { address: '', lat: 0, lng: 0 }
      };

      if (otherNextMode !== p[otherModeKey]) {
        newState[otherField] = { address: '', lat: 0, lng: 0 };
      }

      return newState;
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

      {/* Locations */}
      <div className="space-y-3">
        {['pickupLocation', 'dropoffLocation'].map((loc) => {
          const modeKey = `${loc}Mode`;
          const currentMode = formData[modeKey] || 'city';
          const isAirportTransfer = formData.reservationType === 'Airport Transfer';
          const isCityToCity = formData.reservationType === 'city to city';

          return (
            <div key={loc}>
              <label className="text-[8px] text-slate-500 font-black uppercase mb-1 block">
                {t(`form.${loc}Label`)}
              </label>
              <div className="flex gap-2">
                
                {isCityToCity ? (
    <select 
        required 
        className={inputStyle} 
        // 1. Convert the current state back to a string so the select box shows the correct active option
        value={formData[loc].address ? JSON.stringify({ address: formData[loc].address, lat: formData[loc].lat, lng: formData[loc].lng }) : ""}
        onChange={(e) => {
            // 2. Handle the empty default option
            if (!e.target.value) {
                setFormData(p => ({...p, [loc]: { address: '', lat: 0, lng: 0 }}));
                return;
            }
            // 3. Parse the JSON string back into an object
            const selected = JSON.parse(e.target.value);
            setFormData(p => ({
                ...p, 
                [loc]: { address: selected.address, lat: selected.lat, lng: selected.lng }
            }));
        }}
    >
        <option value="">{t('form.selectCity')}</option>
        {CITIES.map(c => {
            const cityName = isAr ? c.name_ar : c.name_en;
            return (
                <option 
                    key={c.id} 
                    // 4. Stringify the data we want to attach to this option
                    value={JSON.stringify({ address: cityName, lat: c.lat, lng: c.lng })}
                >
                    {cityName}
                </option>
            );
        })}
    </select>
): (
  (isAirportTransfer && currentMode === 'airport') ? (
      <select 
          required 
          className={inputStyle} 
          value={formData[loc].address ? JSON.stringify({ address: formData[loc].address, lat: formData[loc].lat, lng: formData[loc].lng }) : ""}
          onChange={(e) => {
              if (!e.target.value) {
                  setFormData(p => ({...p, [loc]: { address: '', lat: 0, lng: 0 }}));
                  return;
              }
              const selected = JSON.parse(e.target.value);
              setFormData(p => ({
                  ...p, 
                  [loc]: { address: selected.address, lat: selected.lat, lng: selected.lng }
              }));
          }}
      >
          <option value="">{t('form.selectAirport')}</option>
          {AIRPORTS.map(ap => {
              const airportName = isAr ? ap.name_ar : ap.name_en;
              return (
                  <option 
                      key={ap.id} 
                      value={JSON.stringify({ address: airportName, lat: ap.lat, lng: ap.lng })}
                  >
                      {airportName}
                  </option>
              );
          })}
      </select>
  ) : (
                        <div className="flex-1 flex gap-2">
                            <input required readOnly placeholder={t('form.selectOnMap')} 
                                className={`${inputStyle} ${!formData[loc].lat ? 'opacity-60' : 'border-[#C5A25D]'}`} 
                                value={formData[loc].address}/>
                            <button type="button" onClick={() => setMapModal({ open: true, field: loc })} 
                                className="bg-white/10 text-white p-3 rounded-xl hover:bg-white/20 transition-all">
                                <Search size={18}/>
                            </button>
                        </div>
                    )
                )}

                {isAirportTransfer && (
                    <button type="button" onClick={() => toggleLocationMode(loc)}
                        className="bg-[#C5A25D] text-[#0F172A] p-3 rounded-xl hover:opacity-80 shrink-0 flex items-center justify-center min-w-[48px]">
                        {currentMode === 'airport' ? <Building2 size={18}/> : <Plane size={18}/>}
                    </button>
                )}
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
        <>
        <div className="bg-[#C5A25D] rounded-xl p-4 text-[#0F172A]">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-black uppercase">{t('form.total')}</span>
            <h5 className='text-xl font-black'>${priceBreakdown.total.toLocaleString()}</h5>
          </div>
        </div> <select className={inputStyle} value={formData.paymentType} onChange={(e) => setFormData(p => ({...p, paymentType: e.target.value}))}>
        <option value="Cash">{t('form.cash')}</option>
        <option value="Visa">{t('form.visa')}</option>
        <option value="Transfer">{t('form.transfer')}</option>
        </select></>
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

export default function CarDetailInteractive({ car }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('FleetClient');
  const isAr = locale === 'ar';
  
  const [mounted, setMounted] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mapModal, setMapModal] = useState({ open: false, field: '' });
  
  const [formData, setFormData] = useState({
    customerName: '', email: '', phone1: '', phone2: '', nationality: 'Egyptian',
    car: car,
    reservationType: car?.rentalOptions?.isStandardRental ? 'Original Pickup' : 'Full Day',
    pickupLocation: { address: '', lat: 0, lng: 0 },
    dropoffLocation: { address: '', lat: 0, lng: 0 },
    pickupLocationMode: 'city', 
    dropoffLocationMode: 'city',
    fromDate: '', toDate: '', rate: car?.price || 0,  
    fullDayHours: car?.rentalOptions?.fullDayHours || 24,
    limitKilometers: car?.rentalOptions?.limitKilometers || 0,
    extraKmCost: car?.rentalOptions?.extraKmCost || 0,
    extraHourCost: car?.rentalOptions?.extraHourCost || 0,
    additionalHours: 0,
    additionalKms: 0,
    rate: car?.price || 0, 
    additionalPrice:0,
    totalPrice: 0, paymentType: 'Cash',cashDeposit: 0, cashRemain:0,

  });

  useEffect(() => { setMounted(true); }, []);

  const priceBreakdown = useMemo(() => {
    const rateString = car?.price?.toString() || "0";
    const rate = parseInt(rateString.replace(/[^0-9]/g, '')) || 0;
    if (!formData.fromDate || !formData.toDate) return { total: 0 };
    const durationHrs = (new Date(formData.toDate) - new Date(formData.fromDate)) / (1000 * 60 * 60);
    
    let total = 0;
    if (formData.reservationType === "Full Day") {
      const limit = car?.rentalOptions?.fullDayHours || 24;
      const extraHrs = Math.max(0, Math.ceil(durationHrs - limit));
      total = rate + (extraHrs * (car?.rentalOptions?.extraHourCost || 0));
      setFormData(p => ({...p, additionalHours: extraHrs, additionalPrice: extraHrs * (car?.rentalOptions?.extraHourCost || 0), totalPrice: total }));
    
    } else {
      const days = Math.max(1, Math.ceil(durationHrs / 24));
      total = rate * days;
        setFormData(p => ({...p, additionalHours: 0, additionalPrice: 0, totalPrice: total }));
    }
    return { total, base: rate };
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
      // 1. Save the booking to your database
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rentals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // 2. If database save is successful, trigger the email route
        // We pass the formData so your email API can extract customerName, email, etc.
        const emailResponse = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Note: Ensure 'formData' contains all the fields your email route is destructuring 
          // (customerName, email, car object, total price, etc.)
          body: JSON.stringify({formData, locale }) 
        });

        if (!emailResponse.ok) {
          // You can log this or show a soft error toast, but the booking still succeeded.
          console.error("Booking saved, but email failed to send.");
        }

        // 3. Redirect the user after everything is complete
        // router.push('/fleet');
      } else {
         console.error("Failed to save booking to database.");
      }
    } catch (err) {
      console.error("Booking error:", err);
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
    <main className="bg-[#F8FAFC] min-h-screen pt-24 pb-12" dir={isAr ? 'rtl' : 'ltr'}>
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