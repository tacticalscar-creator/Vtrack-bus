import { useEffect } from "react";

declare global {
  interface Window {
    L: any;
  }
}

function MapplsMap() {
  useEffect(() => {
    if (window.L) {
      const map = new window.L.Map("map", {
        center: [28.61, 77.23], // Delhi coords
        zoom: 12,
      });

      window.L.marker([28.61, 77.23])
        .addTo(map)
        .bindPopup("Delhi - Mappls API Connected");
    }
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
}

export default MapplsMap;
