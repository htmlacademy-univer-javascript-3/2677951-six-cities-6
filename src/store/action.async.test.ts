import { checkAuth, fetchFavorites, login, logout, postComment, toggleFavorite } from './action';

describe('Async actions types', () => {
  it('login action types are correct', () => {
    expect(login.pending.type).toBe('user/login/pending');
    expect(login.fulfilled.type).toBe('user/login/fulfilled');
    expect(login.rejected.type).toBe('user/login/rejected');
  });

  it('logout action types are correct', () => {
    expect(logout.pending.type).toBe('user/logout/pending');
    expect(logout.fulfilled.type).toBe('user/logout/fulfilled');
    expect(logout.rejected.type).toBe('user/logout/rejected');
  });

  it('checkAuth action types are correct', () => {
    expect(checkAuth.pending.type).toBe('user/checkAuth/pending');
    expect(checkAuth.fulfilled.type).toBe('user/checkAuth/fulfilled');
    expect(checkAuth.rejected.type).toBe('user/checkAuth/rejected');
  });

  it('fetchFavorites action types are correct', () => {
    expect(fetchFavorites.pending.type).toBe('favorites/fetch/pending');
    expect(fetchFavorites.fulfilled.type).toBe('favorites/fetch/fulfilled');
    expect(fetchFavorites.rejected.type).toBe('favorites/fetch/rejected');
  });

  it('toggleFavorite action types are correct', () => {
    expect(toggleFavorite.pending.type).toBe('favorites/toggle/pending');
    expect(toggleFavorite.fulfilled.type).toBe('favorites/toggle/fulfilled');
    expect(toggleFavorite.rejected.type).toBe('favorites/toggle/rejected');
  });

  it('postComment action types are correct', () => {
    expect(postComment.pending.type).toBe('comments/post/pending');
    expect(postComment.fulfilled.type).toBe('comments/post/fulfilled');
    expect(postComment.rejected.type).toBe('comments/post/rejected');
  });
});
