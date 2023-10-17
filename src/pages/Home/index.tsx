import React, { useEffect, useRef } from 'react';
import axios from 'axios'; // Importe o Axios

declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
      };
    };
  }
}

const Home: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        initMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAmjMdZV-l8vZ_K4iK48mDWQYgXv9giYh8`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);
      }
    };

    const initMap = () => {
      if (mapContainerRef.current && window.google) {
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: { lat: -3.119, lng: -60.0217 },
          zoom: 12,
        });
        const url = `http://localhost:3003/device`;
        const markersData = [
          {
            position: { lat: -3.076917, lng: -60.00275 },
            route: `${url}/10e23ffd-9c89-4462-a21a-b51d11044c44`,
          },
          {
            position: { lat: -3.0925, lng: -59.985194 },
            route: `${url}/1e1ab793-a4f7-4e6f-87d9-8d645bf02eae`,
          },
          {
            position: {},
            route: `${url}/`,
          },
          // mais marcadores vão aqui !!!
        ];

        markersData.forEach((markerData) => {
          const marker = new window.google.maps.Marker({
            position: markerData.position,
            map: map,
          });

          marker.addListener('click', () => {
            const url = markerData.route;

            axios
              .get(url)
              .then((response) => {
                console.log('Dados da resposta:', response.data);
              })
              .catch((error) => {
                console.error('Erro na requisição:', error);
              });
          });
        });
      }
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Mapa</h1>
      </div>
      <div
        ref={mapContainerRef}
        style={{
          height: '60vh',
          width: '80%',
          margin: '0 auto',
        }}
      ></div>
    </div>
  );
};

export default Home;
