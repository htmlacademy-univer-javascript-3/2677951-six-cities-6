import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffers, toggleFavorite } from '../action';

type OffersState = {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OffersState = {
  offers: [],
  isLoading: false,
  error: null,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to load offers';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
        if (index !== -1) {
          state.offers[index] = action.payload;
        }
      });
  },
});

export const offersReducer = offersSlice.reducer;
