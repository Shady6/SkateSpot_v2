import { ITokenResponse } from '../../skate_spot_api/client';
import { AuthActions, AuthActionTypes } from '../action_types/authActionTypes';

export interface AuthState {
    content?: ITokenResponse,
    error?: string,
    loading: boolean    
}

const initialState: AuthState = {loading: false};

export const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            if (!Array.isArray(action.payload.roles))
                action.payload.roles = [action.payload.roles as unknown as string]
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