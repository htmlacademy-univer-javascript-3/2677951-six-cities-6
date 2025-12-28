import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { User, AuthResponse } from '../types/user';
import { Review } from '../types/review';
import { saveToken, dropToken } from '../services/token';

/* ENUMS */

export enum FavoriteStatus {
  Remove = 0,
  Add = 1,
}

/* OFFERS */

export const fetchOffers = createAsyncThunk<
  Offer[],
  void,
  { extra: AxiosInstance }
>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance }
>(
  'offer/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`/offers/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<
  Offer[],
  string,
  { extra: AxiosInstance }
>(
  'offer/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

/* AUTH */

export const checkAuth = createAsyncThunk<
  User,
  void,
  { extra: AxiosInstance }
>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>('/login');
    return data;
  }
);

export const login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { extra: AxiosInstance }
>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<AuthResponse>('/login', { email, password });
    saveToken(data.token);
    return data;
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { extra: AxiosInstance }
>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete('/logout');
    dropToken();
  }
);

/* COMMENTS */

export const fetchComments = createAsyncThunk<
  Review[],
  string,
  { extra: AxiosInstance }
>(
  'comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  }
);

export const postComment = createAsyncThunk<
  Review[],
  { offerId: string; comment: string; rating: number },
  { extra: AxiosInstance }
>(
  'comments/post',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review[]>(
      `/comments/${offerId}`,
      { comment, rating }
    );
    return data;
  }
);

/* FAVORITES */

export const toggleFavorite = createAsyncThunk<
  Offer,
  { offerId: string; status: FavoriteStatus },
  { extra: AxiosInstance }
>(
  'favorites/toggle',
  async ({ offerId, status }, { extra: api }) => {
    const { data } = await api.post<Offer>(
      `/favorite/${offerId}/${status}`
    );
    return data;
  }
);

export const fetchFavorites = createAsyncThunk<
  Offer[],
  void,
  { extra: AxiosInstance }
>(
  'favorites/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/favorite');
    return data;
  }
);

