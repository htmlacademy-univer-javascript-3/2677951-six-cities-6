import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchOffers, logout } from '../../store/action';
import { changeCity } from '../../store/slices/city-slice';
import {
  selectCurrentCity,
  selectOffers,
  selectIsOffersLoading,
  selectOffersError,
  selectAuthorizationStatus,
  selectUser,
  selectFavorites
} from '../../store/selectors';
import { SortType } from '../../constants/sort';
import { AuthorizationStatus } from '../../constants/auth';
import { Link } from 'react-router-dom';
import CityList from '../../components/city-list/city-list';
import OfferList from '../../components/offer-list/offer-list';
import Map from '../../components/map/map';
import SortOptions from '../../components/sort-options/sort-options';
import MainEmpty from '../../components/main-empty/main-empty';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/error-message/error-message';
import { Offer } from '../../types/offer';

function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const currentCity = useSelector(selectCurrentCity);
  const offers = useSelector(selectOffers);
  const isLoading = useSelector(selectIsOffersLoading);
  const error = useSelector(selectOffersError);
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  const favorites = useSelector(selectFavorites);

  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Popular);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const cityOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === currentCity),
    [offers, currentCity]
  );

  const sortedOffers = useMemo(() => {
    const sorted = [...cityOffers];
    switch (currentSort) {
      case SortType.PriceLowToHigh:
        return sorted.sort((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return sorted.sort((a, b) => b.price - a.price);
      case SortType.TopRatedFirst:
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [cityOffers, currentSort]);

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
    setCurrentSort(SortType.Popular);
    setSelectedOffer(null);
  };

  const handleSortChange = (sort: SortType) => {
    setCurrentSort(sort);
    setSelectedOffer(null);
  };

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(logout());
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{user.email}</span>
                        <span className="header__favorite-count">{favorites.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList currentCity={currentCity} onCityChange={handleCityChange} />
          </section>
        </div>
        <div className="cities">
          {sortedOffers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {sortedOffers.length} places to stay in {currentCity}
                </b>
                <SortOptions currentSort={currentSort} onSortChange={handleSortChange} />
                <OfferList offers={sortedOffers} onOfferHover={setSelectedOffer} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={sortedOffers} selectedOffer={selectedOffer} />
                </section>
              </div>
            </div>
          ) : (
            <MainEmpty city={currentCity} />
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
