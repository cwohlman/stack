import { ProfileEndpoint as HomePageProfileEndpoint } from '../features/endpoints'

const routes = {
  ["api/HomePage/Profile"]: HomePageProfileEndpoint,
  ["/profile"]: HomePageProfileEndpoint,
};
export default routes;
