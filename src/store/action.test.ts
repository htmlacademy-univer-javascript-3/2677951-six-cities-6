import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { fetchOffers, fetchOffer, fetchComments } from './action';
import { AnyAction } from '@reduxjs/toolkit';

const api = createAPI();
const mockAPI = new MockAdapter(api);

describe('Async actions', () => {
  afterEach(() => {
    mockAPI.reset();
  });

  it('should fetch offers from API', async () => {
    const mockOffers = [{ id: '1', title: 'Test' }];
    mockAPI.onGet('/offers').reply(200, mockOffers);

    const dispatch = vi.fn();
    const thunk = fetchOffers();
    await thunk(dispatch, () => ({}), api);

    const calls = dispatch.mock.calls as unknown as AnyAction[][];
    expect(calls[0][0].type).toBe(fetchOffers.pending.type);
    expect(calls[1][0].type).toBe(fetchOffers.fulfilled.type);
    expect(calls[1][0].payload).toEqual(mockOffers);
  });

  it('should fetch single offer from API', async () => {
    const mockOffer = { id: '1', title: 'Test Offer' };
    mockAPI.onGet('/offers/1').reply(200, mockOffer);

    const dispatch = vi.fn();
    const thunk = fetchOffer('1');
    await thunk(dispatch, () => ({}), api);

    const calls = dispatch.mock.calls as unknown as AnyAction[][];
    expect(calls[0][0].type).toBe(fetchOffer.pending.type);
    expect(calls[1][0].type).toBe(fetchOffer.fulfilled.type);
    expect(calls[1][0].payload).toEqual(mockOffer);
  });

  it('should fetch comments from API', async () => {
    const mockComments = [{ id: '1', comment: 'Great!' }];
    mockAPI.onGet('/comments/1').reply(200, mockComments);

    const dispatch = vi.fn();
    const thunk = fetchComments('1');
    await thunk(dispatch, () => ({}), api);

    const calls = dispatch.mock.calls as unknown as AnyAction[][];
    expect(calls[0][0].type).toBe(fetchComments.pending.type);
    expect(calls[1][0].type).toBe(fetchComments.fulfilled.type);
    expect(calls[1][0].payload).toEqual(mockComments);
  });
});
