import Cookies from "js-cookie";

function deleteAllCookies() {
  Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
}

const initialAuthState = {
  isLoggedIn: false,
  loginInput: "",
  passwordInput: "",
  isLoginInputError: false,
  isPasswordInputError: false,
  loginErrorMessage: null,
  passwordErrorMessage: null,

  passwordChange: {
    emailInput: "",
    codeInput: "",
    newPasswordInput: "",
    emailInputError: "",
    codeInputError: "",
    newPasswordInputError: "",
    isEmailInputError: false,
    isCodeInputError: false,
    isNewPasswordInputError: false,
    isEmailProvided: false,
    isPasswordChanged: false,
    isCodeFromUrl: false,
  },

  user: {
    email: "",
    fullname: "",
    faculty: "",
    course: "",
    nationality: "",
  },
};

const authActions = {
  AUTH_SET_ALL: "AUTH_SET_ALL",
  SET_LOGIN_INPUT: "SET_LOGIN_INPUT",
  SET_PASSWORD_INPUT: "SET_PASSWORD_INPUT",
  SET_LOGIN_INPUT_ERROR: "SET_LOGIN_INPUT_ERROR",
  SET_PASSWORD_INPUT_ERROR: "SET_PASSWORD_INPUT_ERROR",
  SET_CHANGE_PASSWORD_PAGE_EMAIL_INPUT: "SET_CHANGE_PASSWORD_PAGE_EMAIL_INPUT",
  SET_CHANGE_PASSWORD_PAGE_CODE_INPUT: "SET_CHANGE_PASSWORD_PAGE_CODE_INPUT",
  SET_CHANGE_PASSWORD_PAGE_NEW_PASSWORD_INPUT:
    "SET_CHANGE_PASSWORD_PAGE_NEW_PASSWORD_INPUT",
  SET_CHANGE_PASSWORD_PAGE_CODE_INPUT_ERROR:
    "SET_CHANGE_PASSWORD_PAGE_CODE_INPUT_ERROR",
  SET_CHANGE_PASSWORD_PAGE_EMAIL_INPUT_ERROR:
    "SET_CHANGE_PASSWORD_PAGE_EMAIL_INPUT_ERROR",
  SET_CHANGE_PASSWORD_PAGE_NEW_PASSWORD_INPUT_ERROR:
    "SET_CHANGE_PASSWORD_PAGE_NEW_PASSWORD_INPUT_ERROR",
  CLEAR_LOGIN_INPUTS: "CLEAR_LOGIN_INPUTS",
  SET_USER: "SET_USER",
  SET_LOGGED_IN: "SET_LOGGED_IN",
  LOGOUT: "LOGOUT",
  SET_IS_PASSWORD_CHANGED: "SET_IS_PASSWORD_CHANGED",
  SET_IS_EMAIL_PROVIDED: "SET_IS_EMAIL_PROVIDED",
  CLEAR_PASSWORD_CHANGE: "CLEAR_PASSWORD_CHANGE",
  SET_IS_CODE_FROM_URL: "SET_IS_CODE_FROM_URL",
};

function authReducer(state, action) {
  switch (action.type) {
    case authActions.AUTH_SET_ALL:
      return {
        ...state,
        ...action.payload,
        user: { ...state.user, ...action.payload.user },
        passwordChange: {
          ...state.passwordChange,
          ...action.payload.passwordChange,
        },
      };
    case authActions.SET_LOGIN_INPUT:
      return { ...state, loginInput: action.payload.loginInput };
    case authActions.SET_PASSWORD_INPUT:
      return { ...state, passwordInput: action.payload.passwordInput };
    case authActions.SET_LOGIN_INPUT_ERROR:
      return {
        ...state,
        isLoginInputError: action.payload.isLoginInputError,
        loginErrorMessage: action.payload.loginErrorMessage,
      };
    case authActions.SET_PASSWORD_INPUT_ERROR:
      return {
        ...state,
        isPasswordInputError: action.payload.isPasswordInputError,
        passwordErrorMessage: action.payload.passwordErrorMessage,
      };
    case authActions.SET_LOGGED_IN:
      return {
        ...state,
        passwordInput: "",
        isLoggedIn: action.payload.isLoggedIn,
      };
    case authActions.SET_USER:
      return {
        ...state,
        passwordInput: "",
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    case authActions.CLEAR_LOGIN_INPUTS:
      return {
        ...state,
        loginInput: "",
        passwordInput: "",
        isLoginInputError: false,
        isPasswordInputError: false,
        loginErrorMessage: null,
        passwordErrorMessage: null,
      };
    case authActions.LOGOUT:
      deleteAllCookies();
      return { ...state, ...initialAuthState };
    case authActions.SET_CHANGE_PASSWORD_PAGE_EMAIL_INPUT:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          emailInput: action.payload.emailInput,
        },
      };
    case authActions.SET_IS_EMAIL_PROVIDED:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          isEmailProvided: action.payload.isEmailProvided,
        },
      };
    case authActions.SET_IS_PASSWORD_CHANGED:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          isPasswordChanged: action.payload.isPasswordChanged,
        },
      };
    case authActions.SET_CHANGE_PASSWORD_PAGE_CODE_INPUT:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          codeInput: action.payload.codeInput,
        },
      };
    case authActions.SET_CHANGE_PASSWORD_PAGE_NEW_PASSWORD_INPUT:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          newPasswordInput: action.payload.newPasswordInput,
        },
      };
    case authActions.CLEAR_PASSWORD_CHANGE:
      return {
        ...state,
        passwordChange: {
          emailInput: "",
          codeInput: "",
          newPasswordInput: "",
          emailInputError: "",
          codeInputError: "",
          newPasswordInputError: "",
          isEmailInputError: false,
          isCodeInputError: false,
          isNewPasswordInputError: false,
          isEmailProvided: false,
          isCodeProvided: false,
          isPasswordChanged: false,
        },
      };
    case authActions.SET_CHANGE_PASSWORD_PAGE_EMAIL_INPUT_ERROR:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          emailInputError: action.payload.emailInputError,
          isEmailInputError: action.payload.isEmailInputError,
        },
      };
    case authActions.SET_CHANGE_PASSWORD_PAGE_CODE_INPUT_ERROR:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          codeInputError: action.payload.codeInputError,
          isCodeInputError: action.payload.isCodeInputError,
        },
      };
    case authActions.SET_CHANGE_PASSWORD_PAGE_NEW_PASSWORD_INPUT_ERROR:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          newPasswordInputError: action.payload.newPasswordInputError,
          isNewPasswordInputError: action.payload.isNewPasswordInputError,
        },
      };
    case authActions.SET_IS_CODE_FROM_URL:
      return {
        ...state,
        passwordChange: {
          ...state.passwordChange,
          isCodeFromUrl: action.payload.isCodeFromUrl,
        },
      };
    default:
      return state;
  }
}

export { initialAuthState, authActions, authReducer };
