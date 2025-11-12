import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ZoomIn, ZoomOut, Maximize2, Navigation, Layers, MapPin } from 'lucide-react';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom marker icon with modern design
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="#3b82f6"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `),
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40]
});

const MapController = ({ map }) => {
  const handleZoomIn = () => map?.zoomIn();
  const handleZoomOut = () => map?.zoomOut();
  const handleRecenter = () => {
    const center = map?.getCenter();
    if (center) map?.setView(center, map.getZoom());
  };
  const handleFullscreen = () => {
    const container = map?.getContainer().parentElement;
    if (container?.requestFullscreen) container.requestFullscreen();
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        onClick={handleZoomIn}
        className="bg-gradient-to-br from-zinc-400 to-blue-500 text-white p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.04] active:scale-95"
        title="Zoom In"
      >
        <ZoomIn size={22} />
      </button>
      <button
        onClick={handleZoomOut}
        className="bg-gradient-to-br from-zinc-400 to-blue-500 text-white p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.04] active:scale-95"
        title="Zoom Out"
      >
        <ZoomOut size={22} />
      </button>
      <button
        onClick={handleRecenter}
        className="bg-gradient-to-br from-zinc-400 to-blue-500 text-white p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.04] active:scale-95"
        title="Recenter"
      >
        <Navigation size={22} />
      </button>
      <button
        onClick={handleFullscreen}
        className="bg-gradient-to-br from-zinc-400 to-blue-500 text-white p-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.04] active:scale-95"
        title="Fullscreen"
      >
        <Maximize2 size={22} />
      </button>
    </div>
  );
};

const MapStyleSelector = ({ currentStyle, onStyleChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const mapStyles = [
    { name: 'Dark', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' },
    { name: 'Light', url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png' },
    { name: 'Street', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' },
    { name: 'Satellite', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' }
  ];

  return (
    <div className="absolute top-4 left-4 z-[1000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-br from-zinc-400 to-blue-500 text-white px-5 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.04] flex items-center gap-3 active:scale-95"
      >
        <Layers size={22} />
        <span className="font-semibold">Map Style</span>
      </button>
      
      {isOpen && (
        <div className="mt-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {mapStyles.map((style) => (
            <button
              key={style.name}
              onClick={() => {
                onStyleChange(style.url);
                setIsOpen(false);
              }}
              className={`w-full px-5 py-3 text-left hover:bg-blue-600 transition-colors font-medium ${
                currentStyle === style.url ? 'bg-blue-600 text-white' : 'text-gray-200'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

const MapComponent = ({ lat, lng, locationName }) => {
  const [mapStyle, setMapStyle] = useState('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
  
  // Convert to numbers to ensure they're valid
  const latitude = parseFloat(lat) || 51.505;
  const longitude = parseFloat(lng) || -0.09;
  
  const [center, setCenter] = useState([latitude, longitude]);
  const [zoom, setZoom] = useState(13);
  const mapRef = useRef();

  // Update center when props change
  useEffect(() => {
    if (lat && lng) {
      const newLat = parseFloat(lat);
      const newLng = parseFloat(lng);
      if (!isNaN(newLat) && !isNaN(newLng)) {
        setCenter([newLat, newLng]);
        setZoom(13); // Reset zoom when location changes
      }
    }
  }, [lat, lng]);

  return (
    <div className="w-full h-full">
      <div className="h-full flex flex-col">
        <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl">
          <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
            zoomControl={false}
            key={`${lat}-${lng}`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url={mapStyle}
            />
            
            <MapUpdater center={center} zoom={zoom} />
            
            <Marker 
              position={center}
              icon={customIcon}
            >
              <Popup>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={18} className="text-blue-600" />
                    <h3 className="font-bold text-gray-900">{locationName || 'Location'}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {center[0].toFixed(4)}, {center[1].toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>

            <MapController map={mapRef.current} />
            <MapStyleSelector currentStyle={mapStyle} onStyleChange={setMapStyle} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;