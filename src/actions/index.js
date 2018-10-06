/* Accion para la obtención del contenido de búsqueda, enviando como paramentros, el tipo de contenido (anime o manga)
pudiendo tener o no el campo ingresado por el usuario  */

import { REQUEST_CONTENT, REQUEST_DETAILED } from "./actionTypes";

export const getContent = (param) => (
    {
        type: REQUEST_CONTENT,
        param
    }
);

/* Acción para la obtención del detalle de selección, enviando los parametros de ID del contenido seleccionado así como
 el tipo de contenido que se desea buscar */

export const getContentDetailed = (param) => (
    {
        type: REQUEST_DETAILED,
        param
    }
);