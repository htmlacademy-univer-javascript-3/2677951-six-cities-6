import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import OfferCard from './offer-card';
import { AuthorizationStatus } from '../../constants/auth';

const mockStore = configureMockStore();

const mockOffer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  rating: 4.5,
  isPremium: true,
  isFavorite: false,
  previewImage: 'img/test.jpg',
  city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 } },
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
  description: 'Test',
  bedrooms: 2,
  goods: [],
  host: { name: 'Host', avatarUrl: '', isPro: false },
  images: [],
  maxAdults: 4
};

describe('OfferCard component', () => {
  it('should render offer card with all details', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should have clickable favorite button', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null }
    });
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OfferCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    const favoriteButton = screen.getByRole('button', { name: /to bookmarks/i });
    await user.click(favoriteButton);

    expect(favoriteButton).toBeInTheDocument();
  });
});
