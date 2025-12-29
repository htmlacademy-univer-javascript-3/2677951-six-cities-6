import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import MainPage from './main-page';
import { AuthorizationStatus } from '../../constants/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MainPage', () => {
  it('should render main page with offers', () => {
    const store = mockStore({
      city: { currentCity: 'Paris' },
      offers: { offers: [], isLoading: false, error: null },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      favorites: { favorites: [], isLoading: false, error: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should show error message when error exists', () => {
    const store = mockStore({
      city: { currentCity: 'Paris' },
      offers: { offers: [], isLoading: false, error: 'Failed to load offers' },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      favorites: { favorites: [], isLoading: false, error: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to load offers/i)).toBeInTheDocument();
  });
});
