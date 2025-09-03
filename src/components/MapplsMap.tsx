import { useEffect } from 'react';

interface MapplsMapProps {
  apiKey: string;
}

const MapplsMap: React.FC<MapplsMapProps> = ({ apiKey }) => {
  useEffect(() => {
    const initializeMap = () => {
      if (!window.L) return;

      // Initialize the map
      const map = new window.L.Map('map', {
        center: [28.61, 77.23], // Delhi coordinates, change if needed
        zoom: 12,
      });

      // Add Mappls tile layer
      window.L.tileLayer(
        `https://apis.mappls.com/advancedmaps/api/${apiKey}/vector/{z}/{x}/{y}.png`,
        {
          attribution: 'Map data © Mappls',
          maxZoom: 22,
        }
      ).addTo(map);

      // Add a marker
      window.L.marker([28.61, 77.23])
        .addTo(map)
        .bindPopup('Mappls API Connected')
        .openPopup();
    };

    // Check if Mappls SDK is already loaded
    if (window.L) {
      initializeMap();
      return;
    }

    // Dynamically load SDK if not loaded
    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk.js`;
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default MapplsMap;
