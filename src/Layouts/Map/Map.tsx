/* eslint-disable no-console */
import React, { useEffect } from 'react';

export const Map = () => {
  const handleLoad = () => {
    const { head } = document;
    const YMAPS_API = 'e02f4ea9-f4d4-4505-8d3e-181e14c78703';
    const YMAPS_URL = 'https://api-maps.yandex.ru/2.1/?apikey=';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `${YMAPS_URL}${YMAPS_API}&lang=ru_RU&onload=initYmaps`;
    head.append(script);

    window.initYmaps = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 7,
      });
      console.log(myMap);
    };
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return <div id="map" style={{ width: '600px', height: '400px' }} />;
};
