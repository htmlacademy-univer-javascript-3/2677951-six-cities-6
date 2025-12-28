import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Review } from '../../types/review';
import { fetchComments, postComment } from '../action';

type CommentsState = {
  comments: Review[];
};

const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Review[]>) => {
      state.comments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export const { setComments } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
