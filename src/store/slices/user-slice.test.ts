import { userReducer } from './user-slice';
import { login, checkAuth, logout } from '../action';
import { AuthorizationStatus } from '../../constants/auth';
import { User, AuthResponse } from '../../types/user';

const createMockUser = (): User => ({
  name: 'Test User',
  avatarUrl: 'avatar.jpg',
  isPro: false,
  email: 'test@test.com',
});

const createMockAuthResponse = (): AuthResponse => ({
  ...createMockUser(),
  token: 'secret-token',
});

describe('userSlice', () => {
  it('should return initial state', () => {
    const state = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Unknown);
    expect(state.user).toBeNull();
  });

  it('should set user and Auth status on login.fulfilled', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.NoAuth, user: null };
    const mockAuthResponse = createMockAuthResponse();
    const state = userReducer(initialState, login.fulfilled(mockAuthResponse, '', { email: '', password: '' }));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user).toEqual(createMockUser());
  });

  it('should set Auth status on checkAuth.fulfilled', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Unknown, user: null };
    const mockUser = createMockUser();
    const state = userReducer(initialState, checkAuth.fulfilled(mockUser, '', undefined));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user).toEqual(mockUser);
  });

  it('should set NoAuth status on logout.fulfilled', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth, user: createMockUser() };
    const state = userReducer(initialState, logout.fulfilled(undefined, '', undefined));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.user).toBeNull();
  });

  it('should set NoAuth status on checkAuth.rejected', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Unknown, user: null };
    const state = userReducer(initialState, checkAuth.rejected(null, '', undefined));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.user).toBeNull();
  });

  it('should set NoAuth status on login.rejected', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Unknown, user: null };
    const state = userReducer(initialState, login.rejected(null, '', { email: '', password: '' }));
    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.user).toBeNull();
  });
});
