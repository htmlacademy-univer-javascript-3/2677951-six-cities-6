import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MainPage from './pages/main-page/main-page';
import LoginPage from './pages/login-page/login-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import { AuthorizationStatus } from './constants/auth';

const mockStore = configureMockStore();

describe('Application Routing', () => {
  it('should render MainPage when navigate to "/"', () => {
    const store = mockStore({
      city: { currentCity: 'Paris' },
      offers: { offers: [], isLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      favorites: { favorites: [], isLoading: false }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render LoginPage when navigate to "/login"', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should render NotFoundPage when navigate to unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
