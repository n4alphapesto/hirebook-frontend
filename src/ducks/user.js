import { call, put } from "redux-saga/effects";
import axios from "axios";
//import { useSnackbar } from "notistack";
//const { // enqueueSnackbar } = useSnackbar();

import CONST from "../utils/constants";
//User Actions
export const RESEND_OTP = {
  ON_REQUEST: "RESEND_OTP_REQUEST",
  ON_SUCCESS: "RESEND_OTP_SUCCESS",
  ON_ERROR: "RESEND_OTP_ERROR",
};

export const VERIFY_USER = {
  ON_REQUEST: "VERIFY_USER_REQUEST",
  ON_SUCCESS: "VERIFY_USER_SUCCESS",
  ON_ERROR: "VERIFY_USER_ERROR",
};

export const USER_LOGIN = {
  ON_REQUEST: "USER_LOGIN_REQUEST",
  ON_SUCCESS: "USER_LOGIN_SUCCESS",
  ON_ERROR: "USER_LOGIN_ERROR",
};

export const REGISTER_USER = {
  ON_REQUEST: "REGISTER_USER_REQUEST",
  ON_SUCCESS: "REGISTER_USER_SUCCESS",
  ON_ERROR: "REGISTER_USER_ERROR",
};

export const GET_USER_DATA = {
  ON_REQUEST: "GET_USER_DATA_REQUEST",
  ON_SUCCESS: "GET_USER_DATA_SUCCESS",
  ON_ERROR: "GET_USER_DATA_ERROR",
};

const initialState = {
  userDetails: null,
  isLogging: false,
  loginErrorMsg: null,
  isVerifying: false,
  verifyErrorMsg: null,
  resendingOtp: false,
  isSinging: false,
  signInErrMsg: null,
};
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_DATA.ON_REQUEST:
      return {
        ...state,
        fetchingUser: true,
        userData: null,
      };
    case GET_USER_DATA.ON_SUCCESS:
      return {
        ...state,
        fetchingUser: "done",
        userData: payload.data,
      };
    case GET_USER_DATA.ON_ERROR:
      return {
        ...state,
        fetchingUser: false,
        userData: [],
      };
    case USER_LOGIN.ON_REQUEST:
      return {
        ...state,
        isLogging: true,
        loginErrorMsg: null,
        userDetails: null,
      };
    case USER_LOGIN.ON_SUCCESS:
      return {
        ...state,
        isLogging: "done",
        loginErrorMsg: null,
        userDetails: payload,
      };
    case USER_LOGIN.ON_ERROR:
      return {
        ...state,
        isLogging: true,
        loginErrorMsg: payload,
        userDetails: null,
      };
    case RESEND_OTP.ON_REQUEST:
      return { ...state, resendingOtp: true };
    case RESEND_OTP.ON_SUCCESS:
      return { ...state, resendingOtp: false };
    case RESEND_OTP.ON_ERROR:
      return { ...state, resendingOtp: false };
    case VERIFY_USER.ON_REQUEST:
      return { ...state, isVerifying: true, verifyErrorMsg: null };
    case VERIFY_USER.ON_SUCCESS:
      return { ...state, isVerifying: false, verifyErrorMsg: payload };
    case VERIFY_USER.ON_ERROR:
      return { ...state, isVerifying: false, verifyErrorMsg: payload };
    case REGISTER_USER.ON_REQUEST:
      return { ...state, isSinging: true, signInErrMsg: null };
    case REGISTER_USER.ON_SUCCESS:
      return { ...state, isSinging: "done", signInErrMsg: payload };
    case REGISTER_USER.ON_ERROR:
      return { ...state, isSinging: false, signInErrMsg: payload };
    default:
      return { ...state };
  }
}

export function login(payload) {
  return {
    type: USER_LOGIN.ON_REQUEST,
    payload,
  };
}

export function verify(payload) {
  return {
    type: VERIFY_USER.ON_REQUEST,
    payload,
  };
}

export function resendOtp(payload) {
  return {
    type: RESEND_OTP.ON_REQUEST,
    payload,
  };
}

export function register(payload) {
  return {
    type: REGISTER_USER.ON_REQUEST,
    payload,
  };
}

export function getUserData(payload) {
  return {
    type: GET_USER_DATA.ON_REQUEST,
    payload,
  };
}

export function* loginApi({ payload }) {
  const options = {
    email: payload.email,
    password: payload.password,
  };
  try {
    const response = yield call(axios, {
      method: "POST",
      url: `${CONST.BASE_URL + CONST.USER_URL.LOGIN}`,
      data: options,
    });
    const data = response.data?.data;
    yield put({
      type: USER_LOGIN.ON_SUCCESS,
      payload: data,
    });
    // enqueueSnackbar("Login Successfully.", { variant: "success" });
  } catch (e) {
    yield put({ type: USER_LOGIN.ON_ERROR, payload: e.response });
    // enqueueSnackbar(error.message, { variant: "error" });
  }
}

export function* verifyOTPApi({ payload }) {
  const options = {
    email: payload.email,
    otp: payload.otp,
  };
  try {
    const response = yield call(axios, {
      method: "POST",
      url: `${CONST.BASE_URL + CONST.USER_URL.VERIFY}`,
      data: options,
    });
    const data = response.data;
    // enqueueSnackbar("Verified Successfully..", { variant: "success" });
    yield put({
      type: VERIFY_USER.ON_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // enqueueSnackbar("Verification Failed..", { variant: "error" });
    yield put({ type: VERIFY_USER.ON_ERROR, payload: e.response });
  }
}

export function* resendOtpApi({ payload }) {
  const options = {
    email: payload.email,
  };
  try {
    const response = yield call(axios, {
      method: "POST",
      url: `${CONST.BASE_URL + CONST.USER_URL.RESEND_OTP}`,
      data: options,
    });
    // enqueueSnackbar("OTP Sent.", { variant: "success" });
    const data = response.data;
    yield put({
      type: RESEND_OTP.ON_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // enqueueSnackbar("Operation Failed.", { variant: "error" });
    yield put({ type: RESEND_OTP.ON_ERROR, payload: e.response });
  }
}

export function* registerApi({ payload }) {
  try {
    const response = yield call(axios, {
      method: "POST",
      url: `${CONST.BASE_URL + CONST.USER_URL.REGISTER}`,
      data: payload,
    });
    const data = response.data;
    // enqueueSnackbar("Signup Successfully.", { variant: "success" });
    yield put({
      type: REGISTER_USER.ON_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // enqueueSnackbar("Signup Failed.", { variant: "error" });
    yield put({ type: REGISTER_USER.ON_ERROR, payload: e.response });
  }
}

export function* getUserDataApi({ payload }) {
  try {
    const response = yield call(axios, {
      method: "GET",
      url: `${CONST.BASE_URL + CONST.USER_URL.GET_USER_DATA} `,
      body: payload,
    });
    const data = response.data?.data;

    yield put({
      type: GET_USER_DATA.ON_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({ type: GET_USER_DATA.ON_ERROR, payload: e.response });
  }
}
