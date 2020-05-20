import {getGuest, AccessKey} from '../../config/apiConfig';
export const FETCH_IMAGES = 'FETCH_IMAGES';
export const FETCH_COLLECTIONS = 'FETCH_COLLECTIONS';

export const fetchImages = page => {
  return async dispatch => {
    let response;
    try {
      response = await getGuest.get('photos', {
        params: {
          page: page,
          per_page:30,
          client_id: AccessKey,
        },
      });
    } catch (err) {
      console.log(err);
    }

    dispatch({
      type: FETCH_IMAGES,
      data: response.data,
    });
  };
};

export const fetchCollections = page => {
  return async dispatch => {
    let response;
    try {
      response = await getGuest.get('collections', {
        params: {
          page: page,
          per_page:30,
          client_id: AccessKey,
        },
      });
    } catch (err) {
      console.log(err);
    }

    dispatch({
      type: FETCH_COLLECTIONS,
      data: response.data,
    });
  };
};
