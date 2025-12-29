import { createSlice } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { fetchComments, postComment } from '../action';

type CommentsState = {
  comments: Review[];
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.error = 'Failed to load comments';
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.rejected, (state) => {
        state.error = 'Failed to post comment';
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
