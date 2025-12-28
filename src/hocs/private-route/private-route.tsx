import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AuthorizationStatus } from '../../constants/auth';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
