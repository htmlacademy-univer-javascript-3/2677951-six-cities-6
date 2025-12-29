import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const selectComments = (state: RootState) => state.comments.comments;

export const selectSortedLimitedComments = createSelector(
  [selectComments],
  (comments) => [...comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
);

export const selectCurrentCity = (state: RootState) => state.city.currentCity;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectIsOffersLoading = (state: RootState) => state.offers.isLoading;
export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectUser = (state: RootState) => state.user.user;
export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectIsFavoritesLoading = (state: RootState) => state.favorites.isLoading;
export const selectCurrentOffer = (state: RootState) => state.currentOffer.currentOffer;
export const selectNearbyOffers = (state: RootState) => state.currentOffer.nearbyOffers;
export const selectOffersError = (state: RootState) => state.offers.error;
export const selectCurrentOfferError = (state: RootState) => state.currentOffer.error;
export const selectFavoritesError = (state: RootState) => state.favorites.error;
export const selectCommentsError = (state: RootState) => state.comments.error;
