import { useEffect, MouseEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  fetchOffer,
  fetchNearbyOffers,
  fetchComments,
  logout,
  toggleFavorite,
} from '../../store/action';
import { AuthorizationStatus } from '../../constants/auth';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import Spinner from '../../components/spinner/spinner';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const currentOffer = useSelector(
    (state: RootState) => state.currentOffer.currentOffer
  );
  const nearbyOffers = useSelector(
    (state: RootState) => state.currentOffer.nearbyOffers
  );
  const comments = useSelector(
    (state: RootState) => state.comments.comments
  );
  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );
  const user = useSelector(
    (state: RootState) => state.user.user
  );
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

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
      const status = currentOffer.isFavorite ? 0 : 1;
      dispatch(
        toggleFavorite({
          offerId: currentOffer.id,
          status,
        })
      );
    }
  };

  const handleLogoutClick = (
    event: MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    dispatch(logout());
  };

  if (!currentOffer) {
    return <Spinner />;
  }

  const mapOffers = [...nearbyOffers.slice(0, 3), currentOffer];

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>

            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to="/favorites"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper" />
                        <span className="header__user-name user__name">
                          {user.email}
                        </span>
                        <span className="header__favorite-count">
                          {favorites.length}
                        </span>
                      </Link>
                    </li>

                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={handleLogoutClick}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="/login"
                    >
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
              {currentOffer.images?.slice(0, 6).map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${
                    currentOffer.isFavorite
                      ? 'offer__bookmark-button--active'
                      : ''
                  }`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

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
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
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
