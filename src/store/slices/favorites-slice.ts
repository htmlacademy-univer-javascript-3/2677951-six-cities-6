import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { fetchFavorites, toggleFavorite, logout } from '../action';

type FavoritesState = {
  favorites: Offer[];
  isLoading: boolean;
};

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const offer = action.payload;
        if (offer.isFavorite) {
          const exists = state.favorites.some((f) => f.id === offer.id);
          if (!exists) {
            state.favorites.push(offer);
          }
        } else {
          state.favorites = state.favorites.filter((fav) => fav.id !== offer.id);
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.favorites = [];
        state.isLoading = false;
      });
  },
});

export const favoritesReducer = favoritesSlice.reducer;
