"use client";
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Search, X, Target, Loader2, Info, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Dynamic imports for Leaflet to prevent SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const useMapEvents = dynamic(() => import('react-leaflet').then(mod => mod.useMapEvents), { ssr: false });

export default function MapSelectionModal({ isOpen, onClose, onConfirm, defaultPos = [30.0444, 31.2357] }) {
  const [mapPos, setMapPos] = useState(defaultPos);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Fix Leaflet icons
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  const handleSearchInput = (value) => {
    setSearchQuery(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (value.length < 3) { setSearchResults([]); return; }
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&countrycodes=eg`, { headers: { 'User-Agent': 'FleetManagerApp/1.1' } });
        if (res.ok) { const data = await res.json(); setSearchResults(data); }
      } catch (err) { console.error(err); } 
      finally { setIsSearching(false); }
    }, 600); 
  };

  const selectLocation = (item) => {
    setMapPos([parseFloat(item.lat), parseFloat(item.lon)]);
    setSearchQuery(item.display_name);
    setSearchResults([]);
  };

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => { setMapPos([pos.coords.latitude, pos.coords.longitude]); });
    }
  };

  const handleConfirm = async () => {
    setIsSearching(true);
    let finalAddress = "Custom Point";
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${mapPos[0]}&lon=${mapPos[1]}`);
        const data = await res.json();
        if (data.display_name) finalAddress = data.display_name;
    } catch (err) {
        finalAddress = `${mapPos[0].toFixed(4)}, ${mapPos[1].toFixed(4)}`;
    }
    
    setIsSearching(false);
    // Pass data back to parent
    onConfirm({
      address: finalAddress,
      lat: mapPos[0],
      lng: mapPos[1]
    });
  };

  function MapController() {
    const map = useMapEvents({
      click(e) {
        setMapPos([e.latlng.lat, e.latlng.lng]);
      },
    });
    useEffect(() => {
      if (map && typeof map.flyTo === 'function') map.flyTo(mapPos, 14, { animate: true });
    }, [mapPos, map]);
    return null;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-[#0F172A]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F172A] border border-white/10 w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[85vh]">
        
        {/* Header & Search Bar */}
        <div className="p-6 bg-[#0F172A] border-b border-white/10 z-[2000]">
          <div className="flex justify-between items-center mb-4 px-2">
            <h3 className="font-black text-[#C5A25D] uppercase tracking-widest text-[10px]">Select Location</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
              <X size={20} className="text-white/50 group-hover:text-white transition-colors" />
            </button>
          </div>

          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C5A25D] z-10">
              <Search size={18} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              className="w-full pl-14 pr-14 py-4 bg-white/5 rounded-xl border border-white/10 focus:border-[#C5A25D] outline-none font-bold text-[10px] text-white tracking-widest transition-all placeholder:text-white/30 uppercase"
              placeholder="SEARCH ADDRESS OR LANDMARK..." 
              value={searchQuery} 
              onChange={(e) => handleSearchInput(e.target.value)} 
            />
            {isSearching && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-[#C5A25D]" size={18} />
              </div>
            )}

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-[110%] left-0 right-0 bg-[#0F172A] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-[2000] animate-in fade-in zoom-in-95 duration-200">
                {searchResults.map((item, i) => (
                  <button 
                    key={i} type="button" onClick={() => selectLocation(item)} 
                    className="w-full text-left p-4 hover:bg-white/5 border-b border-white/5 last:border-0 flex items-start gap-4 transition-colors"
                  >
                    <MapPin size={16} className="mt-0.5 text-[#C5A25D] shrink-0" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-white truncate">{item.display_name.split(',')[0]}</p>
                      <p className="text-[9px] font-bold uppercase tracking-wide text-white/40 truncate mt-1">{item.display_name}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Content */}
        <div className="flex-1 relative bg-[#0F172A] z-0">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[500] bg-[#C5A25D] text-[#0F172A] px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl animate-bounce pointer-events-none">
            <Info size={14} className="text-[#0F172A]" />
            <span>Drag the pin to fine-tune</span>
          </div>
          
          <MapContainer center={mapPos} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }} className="z-0">
            {/* Swapped to CartoDB Dark Matter tiles for premium dark aesthetic */}
            <TileLayer 
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" 
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <MapController />
            <Marker 
              position={mapPos} draggable={true}
              eventHandlers={{ dragend: (e) => setMapPos([e.target.getLatLng().lat, e.target.getLatLng().lng]) }}
            />
          </MapContainer>

          <button onClick={getMyLocation} className="absolute top-6 right-6 z-[500] bg-[#0F172A] p-3.5 rounded-xl shadow-xl text-[#C5A25D] border border-white/10 active:scale-90 transition-all hover:bg-white/5">
            <Target size={22} strokeWidth={2.5} />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[500] w-full max-w-xs px-4">
            <button 
              onClick={handleConfirm} 
              className="w-full bg-[#C5A25D] text-[#0F172A] py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all"
            >
              <MapPin size={16} className="text-[#0F172A]"/>
              Confirm Location
            </button>
          </div>
        </div>
      </div>
      
      {/* Optional: Add a slight gold tint to the default blue leaflet marker via CSS */}
      <style jsx global>{`
        .leaflet-marker-icon {
          filter: hue-rotate(160deg) saturate(2);
        }
      `}</style>
    </div>
  );
}