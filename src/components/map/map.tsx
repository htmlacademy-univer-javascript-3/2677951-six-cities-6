import { useEffect, useRef } from 'react';
import { Offer } from '../../types/offer';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer | null;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({ offers, selectedOffer }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<leaflet.Map | null>(null);
  const markerLayer = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => () => {
    markerLayer.current?.clearLayers();
    markerLayer.current = null;
    map.current?.remove();
    map.current = null;
  }, []);

  useEffect(() => {
    if (!mapRef.current || map.current || offers.length === 0) {
      return;
    }

    const city = offers[0].city;

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
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      )
      .addTo(map.current);

    markerLayer.current = leaflet.layerGroup().addTo(map.current);
  }, [offers]);

  useEffect(() => {
    if (!map.current || offers.length === 0) {
      return;
    }

    const city = offers[0].city;
    map.current.setView(
      {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      city.location.zoom
    );
  }, [offers]);

  useEffect(() => {
    if (!map.current || !markerLayer.current) {
      return;
    }

    markerLayer.current.clearLayers();

    offers.forEach((offer) => {
      leaflet
        .marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon:
              selectedOffer?.id === offer.id
                ? currentCustomIcon
                : defaultCustomIcon,
          }
        )
        .addTo(markerLayer.current as leaflet.LayerGroup);
    });
  }, [offers, selectedOffer]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef} />;
}

export default Map;
