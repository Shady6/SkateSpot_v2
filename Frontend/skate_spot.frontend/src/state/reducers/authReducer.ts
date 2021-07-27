import { ITokenResponse } from '../../skate_spot_api/client';
import { AuthActions, AuthActionTypes } from '../action_types/authActionTypes';

interface IAuthState {
    content?: ITokenResponse,
    error?: string,
    loading: boolean    
}

const initialState: IAuthState = {loading: false};

export const authReducer = (state: IAuthState = initialState, action: AuthActions): IAuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            return {                
                content: action.payload,
                loading: false
            }
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,                
                error: action.payload,
                loading: false
            }
        case AuthActionTypes.LOADING:
            return {
                content: state.content,
                loading: true
            }
        default:
            return state
    }
}