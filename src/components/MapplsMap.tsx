import { useEffect } from 'react';

interface MapplsMapProps {
  apiKey: string;
}

const MapplsMap: React.FC<MapplsMapProps> = ({ apiKey }) => {
  useEffect(() => {
    const initializeMap = () => {
      if (!window.L) return;

      const map = new window.L.Map('map', { center: [28.61, 77.23], zoom: 12 });

      // Add Mappls tile layer
      window.L.tileLayer(
        `https://apis.mappls.com/advancedmaps/api/${apiKey}/vector/{z}/{x}/{y}.png`,
        {
          attribution: 'Map data © Mappls',
          maxZoom: 22,
          apiKey: apiKey
        }
      ).addTo(map);

      // Add a marker
      window.L.marker([28.61, 77.23])
        .addTo(map)
        .bindPopup('Delhi - Mappls API Connected')
        .openPopup();
    };

    // If Mappls SDK already loaded
    if (window.L) {
      initializeMap();
      return;
    }

    // Dynamically load SDK
    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk.js`;
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default MapplsMap;
