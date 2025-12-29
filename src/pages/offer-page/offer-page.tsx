import { useEffect, MouseEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  FavoriteStatus,
  fetchOffer,
  fetchNearbyOffers,
  fetchComments,
  logout,
  toggleFavorite,
} from '../../store/action';
import {
  selectSortedLimitedComments,
  selectAuthorizationStatus,
  selectUser,
  selectFavorites,
  selectCurrentOffer,
  selectNearbyOffers,
  selectCurrentOfferError,
  selectCommentsError,
} from '../../store/selectors';
import { AuthorizationStatus } from '../../constants/auth';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/error-message/error-message';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const currentOffer = useSelector(selectCurrentOffer);
  const nearbyOffers = useSelector(selectNearbyOffers);
  const comments = useSelector(selectSortedLimitedComments);
  const offerError = useSelector(selectCurrentOfferError);
  const commentsError = useSelector(selectCommentsError);
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOffer(id))
      .unwrap()
      .catch(() => {
        navigate('/404');
      });

    dispatch(fetchNearbyOffers(id));
    dispatch(fetchComments(id));
  }, [id, dispatch, navigate]);

  const handleFavoriteClick = (): void => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    if (currentOffer) {
      const status = currentOffer.isFavorite ? FavoriteStatus.Remove : FavoriteStatus.Add;
      dispatch(
        toggleFavorite({
          offerId: currentOffer.id,
          status,
        })
      );
    }
  };

  const handleLogoutClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    dispatch(logout());
  };

  if (offerError) {
    return <ErrorMessage message={offerError} />;
  }

  if (!currentOffer) {
    return <Spinner />;
  }

  const mapOffers = [...nearbyOffers.slice(0, 3), currentOffer];
  const ratingWidth = `${Math.round(currentOffer.rating) * 20}%`;
  const typeText = currentOffer.type
    ? currentOffer.type.charAt(0).toUpperCase() + currentOffer.type.slice(1)
    : '';
  const bedroomsText =
    typeof currentOffer.bedrooms === 'number'
      ? `${currentOffer.bedrooms} Bedroom${currentOffer.bedrooms === 1 ? '' : 's'}`
      : null;
  const adultsText =
    typeof currentOffer.maxAdults === 'number'
      ? `${currentOffer.maxAdults} adult${currentOffer.maxAdults === 1 ? '' : 's'}`
      : null;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>

            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{favorites.length}</span>
                      </Link>
                    </li>

                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleLogoutClick}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper" />
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {(currentOffer.images ?? []).slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating.toFixed(1)}</span>
              </div>

              <ul className="offer__features">
                {typeText && <li className="offer__feature offer__feature--entire">{typeText}</li>}
                {bedroomsText && <li className="offer__feature offer__feature--bedrooms">{bedroomsText}</li>}
                {adultsText && <li className="offer__feature offer__feature--adults">Max {adultsText}</li>}
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              {(currentOffer.goods ?? []).length > 0 && (
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {(currentOffer.goods ?? []).map((good) => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentOffer.host && (
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div
                      className={`offer__avatar-wrapper user__avatar-wrapper ${
                        currentOffer.host.isPro ? 'offer__avatar-wrapper--pro' : ''
                      }`}
                    >
                      <img
                        className="offer__avatar user__avatar"
                        src={currentOffer.host.avatarUrl}
                        width={74}
                        height={74}
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{currentOffer.host.name}</span>
                    {currentOffer.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  {currentOffer.description && (
                    <div className="offer__description">
                      <p className="offer__text">{currentOffer.description}</p>
                    </div>
                  )}
                </div>
              )}

              {commentsError && <ErrorMessage message={commentsError} />}
              <ReviewList reviews={comments} />

              {authorizationStatus === AuthorizationStatus.Auth && id && (
                <ReviewForm offerId={id} />
              )}
            </div>
          </div>

          <section className="offer__map map">
            <Map offers={mapOffers} selectedOffer={currentOffer} />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.slice(0, 3).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
