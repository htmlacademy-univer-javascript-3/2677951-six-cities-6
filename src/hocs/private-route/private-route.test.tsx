import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../constants/auth';

const mockStore = configureMockStore();

describe('PrivateRoute', () => {
  it('should render children when user is authorized', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <div>Private Content</div>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should render Spinner when authorization status is unknown', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Unknown, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <div>Private Content</div>
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });

  it('should redirect to /login when user is not authorized', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route path="/login" element={<div>Login Page</div>} />
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div>Private Content</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Private Content')).not.toBeInTheDocument();
  });
});
