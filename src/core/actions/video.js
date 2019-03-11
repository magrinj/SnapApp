export const ADD_VIDEO = "ADD_VIDEO";
export const addVideoToSnap = (path) => ({
  type: ADD_VIDEO,
  payload: { path }
});

export const REMOVE_SNAP = "REMOVE_SNAP";
export const removeSnap = () => ({
  type: REMOVE_SNAP
});