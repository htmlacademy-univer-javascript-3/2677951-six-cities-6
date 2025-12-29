import { render } from '@testing-library/react';
import Map from './map';
import { Offer } from '../../types/offer';

vi.mock('leaflet/dist/leaflet.css', () => ({}));

const mapInstance = {
  setView: vi.fn(),
  remove: vi.fn(),
};

const layerGroupInstance = {
  addTo: vi.fn(),
  clearLayers: vi.fn(),
};

vi.mock('leaflet', () => ({
  default: {
    icon: vi.fn(() => ({})),
    map: vi.fn(() => mapInstance),
    tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
    layerGroup: vi.fn(() => ({
      addTo: vi.fn(() => layerGroupInstance),
      clearLayers: layerGroupInstance.clearLayers,
    })),
    marker: vi.fn(() => ({ addTo: vi.fn() })),
  },
}));

describe('Map component', () => {
  it('should render map container', () => {
    const offers: Offer[] = [
      {
        id: '1',
        title: 'A',
        type: 'apartment',
        price: 100,
        city: { name: 'Paris', location: { latitude: 52.39, longitude: 4.9, zoom: 12 } },
        location: { latitude: 52.39, longitude: 4.9, zoom: 12 },
        isFavorite: false,
        isPremium: false,
        rating: 4,
        previewImage: 'img/1.jpg',
      },
    ];

    const { container } = render(<Map offers={offers} selectedOffer={offers[0]} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
