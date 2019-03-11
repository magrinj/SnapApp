import {
  ADD_VIDEO,
  REMOVE_SNAP
} from "../actions/video";

const initialState = {
  snap: []
};
  
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDEO:
      return {
        ...state,
        snap: state.snap.concat(action.payload.path)
      };
    case REMOVE_SNAP:
      return {
        ...state,
        snap: []
      };
    default:
      return state;
  }
};
  