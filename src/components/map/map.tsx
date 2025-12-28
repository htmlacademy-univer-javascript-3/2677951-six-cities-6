import { useEffect, useRef } from 'react';
import { Offer } from '../../types/offer';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer | null;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ offers, selectedOffer }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<leaflet.Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map.current === null) {
      const city = offers[0]?.city;

      if (city) {
        map.current = leaflet.map(mapRef.current, {
          center: {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          zoom: city.location.zoom,
        });

        leaflet
          .tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            }
          )
          .addTo(map.current);
      }
    }

    if (map.current && offers.length > 0) {
      const city = offers[0]?.city;
      if (city) {
        map.current.setView(
          {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          city.location.zoom
        );
      }
    }
  }, [offers]);

  useEffect(() => {
    let isMounted = true;

    if (map.current && isMounted) {
      const markers: leaflet.Marker[] = [];

      offers.forEach((offer) => {
        const marker = leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: selectedOffer?.id === offer.id ? currentCustomIcon : defaultCustomIcon,
            }
          )
          .addTo(map.current!);

        markers.push(marker);
      });

      return () => {
        isMounted = false;
        markers.forEach((marker) => marker.remove());
      };
    }

    return () => {
      isMounted = false;
    };
  }, [offers, selectedOffer]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
