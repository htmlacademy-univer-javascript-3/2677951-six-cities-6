import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchOffer, fetchNearbyOffers, toggleFavorite } from '../action';

type CurrentOfferState = {
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  error: string | null;
};

const initialState: CurrentOfferState = {
  currentOffer: null,
  nearbyOffers: [],
  error: null,
};

export const currentOfferSlice = createSlice({
  name: 'currentOffer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffer.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.error = 'Failed to load offer';
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (state.currentOffer?.id === action.payload.id) {
          state.currentOffer = action.payload;
        }
      });
  },
});

export const currentOfferReducer = currentOfferSlice.reducer;
