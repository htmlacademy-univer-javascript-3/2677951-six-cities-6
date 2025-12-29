import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import OfferPage from './offer-page';
import { AuthorizationStatus } from '../../constants/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockOffer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'img/test.jpg',
  description: 'Test description',
  bedrooms: 2,
  goods: ['Wifi'],
  host: { name: 'Host', avatarUrl: '', isPro: false },
  images: ['img1.jpg', 'img2.jpg'],
  maxAdults: 4
};

describe('OfferPage', () => {
  it('should render offer page', () => {
    const store = mockStore({
      currentOffer: { currentOffer: mockOffer, nearbyOffers: [], error: null },
      comments: { comments: [], error: null },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      favorites: { favorites: [], isLoading: false, error: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
  });
});
