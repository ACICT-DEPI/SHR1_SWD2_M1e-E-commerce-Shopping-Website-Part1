// OrderAction.js

export const DELETE_ORDER = 'DELETE_ORDER';
export const EDIT_ORDER = 'EDIT_ORDER';

export const deleteOrder = (id) => ({
  type: DELETE_ORDER,
  payload: id,
});

export const editOrder = (order) => ({
  type: EDIT_ORDER,
  payload: order,
});
