// ** Redux import
import { createSlice } from "@reduxjs/toolkit";

// ** Jwt import
import { jwtConfig } from "../@core/auth/jwt/jwtDefaultConfig";
import { authService } from "../@core/auth/jwt/authService";

const initialUser = () => {
  const item = window.localStorage.getItem(jwtConfig.userData);
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser(),
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      authService.setLocalStorageWhenLogin(action.payload);
    },
    logout: (state) => {
      state.user = null;
      authService.removeLocalStorageWhenLogout();
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      authService.updateUser(action.payload);
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
