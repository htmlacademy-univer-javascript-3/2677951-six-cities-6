import { cityReducer, changeCity } from './city-slice';

describe('citySlice', () => {
  it('should return initial state', () => {
    const state = cityReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state.currentCity).toBe('Paris');
  });

  it('should change city', () => {
    const initialState = { currentCity: 'Paris' };
    const state = cityReducer(initialState, changeCity('Amsterdam'));
    expect(state.currentCity).toBe('Amsterdam');
  });
});
