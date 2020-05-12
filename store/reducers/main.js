import { FETCH_IMAGES } from "../actions/main";

const initialState = {
    images:[],
}

export const imagesReducer = (state=initialState, action) => {
    switch(action.type)
    {
        case FETCH_IMAGES:
            return {
                images:[...state.images, ...action.data]
            }
        default:
            return state;
    }
}