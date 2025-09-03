import { useEffect } from 'react';

interface MapplsMapProps {
  apiKey: string;
}

const MapplsMap: React.FC<MapplsMapProps> = ({ apiKey }) => {
  useEffect(() => {
    const initializeMap = () => {
      if (!window.Mappls) return;

      const map = new window.Mappls.Map({
        container: 'map',
        center: [28.61, 77.23], // Delhi coordinates, change as needed
        zoom: 12,
        key: apiKey
      });

      // Add a marker
      new window.Mappls.Marker([28.61, 77.23])
        .addTo(map)
        .bindPopup('Mappls API Connected')
        .openPopup();
    };

    if (window.Mappls) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk.js`;
    script.async = true;
    script.onload = initializeMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [apiKey]);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapplsMap;
