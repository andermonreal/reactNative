import * as ActionTypes from './ActionTypes';

export const comentarios = (state = { errMess: null, comentarios: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return { ...state, errMess: null, comentarios: action.payload };

    case ActionTypes.COMENTARIOS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMENTARIO:
      // Generamos el id en el reducer para evitar colisiones
      const nuevoId =
        state.comentarios.length > 0
          ? Math.max(...state.comentarios.map((c) => c.id)) + 1
          : 0;
      const comentarioConId = { ...action.payload, id: nuevoId };
      return { ...state, comentarios: state.comentarios.concat(comentarioConId) };

    default:
      return state;
  }
};
