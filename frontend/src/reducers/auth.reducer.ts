import { createSlice } from '@reduxjs/toolkit';

export enum LoginStatus {
  LOGGEDOUT,
  PENDING,
  FAILED,
  SUCCESSFUL,
}

export interface AuthState {
  username: string;
  token: string;
  email: string;
  loginStatus: LoginStatus;
  active: boolean;
}

const initialState: AuthState = {
  active: false,
  token: '',
  username: '',
  email: '',
  loginStatus: LoginStatus.LOGGEDOUT,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.loginStatus = LoginStatus.PENDING;
    },
    loginFailure(state) {
      state.loginStatus = LoginStatus.FAILED;
    },
    loginSuccess(state) {
      state.loginStatus = LoginStatus.SUCCESSFUL;
    },
    logout(state) {
      state.loginStatus = LoginStatus.LOGGEDOUT;
    },
  },
});

export const AuthActions = authSlice.actions;

export default authSlice.reducer;
