import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ReviewForm from './review-form';

const mockStore = configureMockStore();

describe('ReviewForm component', () => {
  it('should render form elements', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should disable submit button when form is invalid', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', async () => {
    const store = mockStore({});
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textarea = screen.getByRole('textbox');
    const rating5 = screen.getByDisplayValue('5');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.click(rating5);
    await user.type(textarea, 'A'.repeat(50));

    expect(submitButton).not.toBeDisabled();
  });
});
