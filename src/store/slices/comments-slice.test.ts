import { commentsReducer } from './comments-slice';
import { fetchComments, postComment } from '../action';

describe('commentsSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { comments: [], error: null };

    const result = commentsReducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set comments with fetchComments.fulfilled', () => {
    const mockComments = [
      {
        id: '1',
        comment: 'Great!',
        rating: 5,
        date: '2024-01-01',
        user: { name: 'User', avatarUrl: '', isPro: false },
      },
    ];
    const expectedState = { comments: mockComments, error: null };

    const result = commentsReducer(undefined, fetchComments.fulfilled(mockComments, '', '1'));

    expect(result).toEqual(expectedState);
  });

  it('should set error with fetchComments.rejected', () => {
    const expectedState = { comments: [], error: 'Failed to load comments' };

    const result = commentsReducer(undefined, fetchComments.rejected(null, '', '1'));

    expect(result).toEqual(expectedState);
  });

  it('should reset error with fetchComments.pending', () => {
    const state = {
      comments: [
        {
          id: '1',
          comment: 'Ok',
          rating: 3,
          date: '2024-01-01',
          user: { name: 'User', avatarUrl: '', isPro: false },
        },
      ],
      error: 'Some error',
    };

    const result = commentsReducer(state, fetchComments.pending('', '1'));

    expect(result).toEqual({ ...state, error: null });
  });

  it('should set comments with postComment.fulfilled', () => {
    const mockComments = [
      {
        id: '2',
        comment: 'Nice place',
        rating: 4,
        date: '2024-02-01',
        user: { name: 'User2', avatarUrl: '', isPro: false },
      },
    ];
    const expectedState = { comments: mockComments, error: null };

    const result = commentsReducer(
      undefined,
      postComment.fulfilled(mockComments, '', { offerId: '1', comment: 'Nice place', rating: 4 })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set error with postComment.rejected', () => {
    const expectedState = { comments: [], error: 'Failed to post comment' };

    const result = commentsReducer(
      undefined,
      postComment.rejected(null, '', { offerId: '1', comment: 'Bad', rating: 2 })
    );

    expect(result).toEqual(expectedState);
  });
});
