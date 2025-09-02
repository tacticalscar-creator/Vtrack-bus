import { useEffect } from 'react';

interface MapplsMapProps {
  apiKey: string;
}

const MapplsMap: React.FC<MapplsMapProps> = ({ apiKey }) => {
  useEffect(() => {
    if (window.L) return; // already loaded

    const script = document.createElement('script');
    script.src = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk.js`;
    script.async = true;
    script.onload = () => {
      if (window.L) {
        const map = new window.L.Map('map', {
          center: [28.61, 77.23],
          zoom: 12,
        });

        window.L.marker([28.61, 77.23])
          .addTo(map)
          .bindPopup('Delhi - Mappls API Connected')
          .openPopup();
      }
    };
    document.body.appendChild(script);
  }, [apiKey]);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default MapplsMap;
