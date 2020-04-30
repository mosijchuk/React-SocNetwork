import {authMe} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";


const SET_INITIALIZED = "SET_INITIALIZED";

export type InitialStateType = {
    initialized: boolean;
};

const initialState: InitialStateType = {
    initialized: false,
};

type ActionsType = initializeSuccessActionType

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            };
        default: {
            return state;
        }
    }
};

type initializeSuccessActionType = {
    type: typeof SET_INITIALIZED;
};
export const initializeSuccess = (): initializeSuccessActionType => ({
    type: SET_INITIALIZED,
});

//thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const initializeApp = (): ThunkType => async (dispatch) => {
    const promise = dispatch(authMe());

    Promise.all([promise]).then(() => {
        dispatch(initializeSuccess());
    });
};
export default appReducer;
