// ** Auth Endpoints
export const jwtConfig = {
  logoutEndpoint: '/login',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  expires: 'expires',
  userData: 'userData',
  refreshToken: 'refreshToken',
};
