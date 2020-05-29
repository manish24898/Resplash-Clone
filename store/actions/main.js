import {getGuest, AccessKey} from '../../config/apiConfig';
export const FETCH_IMAGES = 'FETCH_IMAGES';
export const FETCH_COLLECTIONS = 'FETCH_COLLECTIONS';
export const RESET_IMAGES = 'RESET_IMAGES';
export const RESET_COLLECTIONS = 'RESET_COLLECTIONS'

export const resetImages = () => {
  return async dispatch => {
    dispatch({
      type: RESET_IMAGES,
    })
  }
}
export const resetCollections = () => {
  return async dispatch => {
    dispatch({
      type: RESET_COLLECTIONS,
    })
  }
}
export const fetchImages =(order_by ,page) => {
  //console.log("DISPATCH", order_by)
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
    //console.log("RESPONSE", response.data)
    dispatch({
      type: FETCH_IMAGES,
      data: response.data,
    });
  };
};

export const fetchCollectionsAll = page => {
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

export const fetchCollectionsFeatured = page => {
  return async dispatch => {
    let response;
    try {
      response = await getGuest.get('collections/featured', {
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
