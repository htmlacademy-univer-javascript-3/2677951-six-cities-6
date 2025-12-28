import { commentsReducer } from './comments-slice';
import { fetchComments, postComment } from '../action';

describe('commentsSlice', () => {
  it('should return initial state', () => {
    const state = commentsReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state.comments).toEqual([]);
  });

  it('should set comments on fetchComments.fulfilled', () => {
    const initialState = { comments: [] };
    const mockComments = [{ id: '1', comment: 'Great!', rating: 5, date: '2024-01-01', user: { name: 'John', avatarUrl: '', isPro: false, email: 'test@test.com' } }];
    const state = commentsReducer(initialState, fetchComments.fulfilled(mockComments, '', ''));
    expect(state.comments).toEqual(mockComments);
  });

  it('should set comments on postComment.fulfilled', () => {
    const initialState = { comments: [] };
    const mockComments = [{ id: '2', comment: 'Nice!', rating: 4, date: '2024-01-01', user: { name: 'Jane', avatarUrl: '', isPro: false, email: 'test@test.com' } }];
    const state = commentsReducer(initialState, postComment.fulfilled(mockComments, '', { offerId: '1', comment: 'Test', rating: 5 }));
    expect(state.comments).toEqual(mockComments);
  });
});
