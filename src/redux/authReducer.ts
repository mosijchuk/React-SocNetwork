import {AuthAPI, AuthMeResType, SecurityAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {checkNewMessages} from "./dialogsReducer";
import {ResultCodesEnum, ResultCodeWithCaptchaEnum} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_LOGIN_DATA = "SET_LOGIN_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

export type InitialStateType = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isLogged: boolean;
    captchaUrl: string | null;
};

const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isLogged: false,
    captchaUrl: null,
};

type ActionsType = SetAuthUserDataActionType | SetCaptchaUrlActionType

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_LOGIN_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            };
        default: {
            return state;
        }
    }
};


type SetAuthUserDataPayloadType = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isLogged: boolean;
    captchaUrl: string | null;
};
type SetAuthUserDataActionType = {
    type: typeof SET_LOGIN_DATA;
    payload: SetAuthUserDataPayloadType;
};

export const setAuthUserData = (
    userId: number | null,
    email: string | null,
    login: string | null,
    isLogged: boolean
): SetAuthUserDataActionType => ({
    type: SET_LOGIN_DATA,
    payload: {userId, email, login, isLogged, captchaUrl: null},
});

type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL;
    payload: {
        captchaUrl: string;
    };
};
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    payload: {captchaUrl},
});

//thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const authMe = (): ThunkType => async (dispatch) => {
    const data: AuthMeResType = await AuthAPI.authMe()
    if (data.resultCode === ResultCodesEnum.Success) {
        const {id, email, login} = data.data
        const isLogged = true
        dispatch(setAuthUserData(id, email, login, isLogged))
        dispatch(checkNewMessages())
    } else {
        dispatch(setAuthUserData(null, null, null, false))
    }

};

export const getCaptchaUrl = (): ThunkType => (dispatch) => {
    return SecurityAPI.getCaptcha().then((url: string) => {
        dispatch(setCaptchaUrl(url));
    });
};

export const loginMe = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
): ThunkType => async (dispatch) => {
    AuthAPI.login(email, password, rememberMe, captcha).then((data) => {
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(authMe());
        } else {
            if (data.resultCode === ResultCodeWithCaptchaEnum.CaptchaIsRequired) {
                dispatch(getCaptchaUrl());
            }
            // @ts-ignore
            dispatch(stopSubmit("login", {_error: data.messages[0] || 'Error'}));
        }
    });
};

export const logoutMe = (): ThunkType => async (dispatch) => {
    AuthAPI.logout().then((data: any) => {
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    });
};


export default authReducer;
