import React, { useEffect, useRef } from 'react';

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (!mapContainerRef.current || !(window as any).ILITEAPI) return;

    const mapConfig = {
        "divId": "iapi",
        "width": "100%",
        "height": "100%",
        "activeGpMapId": "gp0",
        "scale": 2000,
        "marker": {
            "x": 715052.897,
            "y": 245441.448,
            "scale": 2000,
            "opts": {
                "title": "Rynek w Rzeszowie",
                "content": "Rzeszów, Rynek 1"
            }
        },
        "useMenu": false
    };

  // Inicjalizacja mapy z callbackiem
  (window as any).ILITEAPI.init(mapConfig, () => {
    console.log("Mapa załadowana");
  });
}, []);

  
  return (
    <div
      id="iapi"
      ref={mapContainerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}
    ></div>
  );
};

export default Map;
