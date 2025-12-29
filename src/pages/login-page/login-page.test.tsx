import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import LoginPage from './login-page';
import { AuthorizationStatus } from '../../constants/auth';

const mockStore = configureMockStore();

describe('LoginPage component', () => {
  it('should render login form', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should allow user to type email and password', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null }
    });
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@test.com');
    expect(passwordInput).toHaveValue('password123');
  });
});
