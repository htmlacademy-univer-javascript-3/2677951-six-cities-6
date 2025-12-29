import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import FavoritesPage from './favorites-page';
import { AuthorizationStatus } from '../../constants/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('FavoritesPage', () => {
  it('should render empty favorites message', () => {
    const store = mockStore({
      favorites: { favorites: [], isLoading: false, error: null },
      user: { authorizationStatus: AuthorizationStatus.Auth, user: { email: 'test@test.com' } }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should show error message when error exists', () => {
    const store = mockStore({
      favorites: { favorites: [], isLoading: false, error: 'Failed to load favorites' },
      user: { authorizationStatus: AuthorizationStatus.Auth, user: { email: 'test@test.com' } }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Failed to load favorites/i)).toBeInTheDocument();
  });
});
