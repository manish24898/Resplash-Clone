import { FETCH_IMAGES, FETCH_COLLECTIONS } from "../actions/main";

const initialState = {
    images:[],
    collections:[]
}

export const imagesReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case FETCH_IMAGES:
            return {
                ...state,
                images:[...state.images, ...action.data]
            }
        case FETCH_COLLECTIONS:
            return {
                ...state,
                collections:[...state.collections, ...action.data]
            }
        default:
            return state;
    }
}