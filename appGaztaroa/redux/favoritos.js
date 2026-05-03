import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITO:
      // Si ya está en favoritos, devolvemos el estado sin cambios
      if (state.favoritos.some((el) => el === action.payload)) {
        return state;
      }
      // Si no está, lo añadimos al array
      return { ...state, favoritos: state.favoritos.concat(action.payload) };

    default:
      return state;
  }
};
