import { put, takeLatest, all, call } from 'redux-saga/effects';
import { baseUrl } from "./baseUrl";
import axios from 'axios'

import { REQUEST_CONTENT, REQUEST_DETAILED, GET_DETAILED, GET_CONTENT } from "../actions/actionTypes";

/* contentWatcher es "el inicador" para obtener el contenido que se busca, también inicia el loading dentro de los
resultados de búsqueda */

function* contentWatcher() {
    yield takeLatest(REQUEST_CONTENT, getContent)
}

/* getCcontent es el que hace el request para la obteneción de la búsqueda de anime y manga, toma en consideración el
tipo de contenido y/o el campo de búsqueda que el usuario ingrese */

function* getContent(param) {
    let content;
    if(param.param.userText){
        content = yield call([axios, axios.get], baseUrl + 'search/' + param.param.contentType + '?q=' + param.param.userText);
    }else{
        content = yield call([axios, axios.get], baseUrl + 'search/' + param.param.contentType + '?score=8.00-9.0');
    }
    yield put({ type: GET_CONTENT, payload: content.data.results });
}

/* detailedWatcher es "el iniciador" del la acción para obtener el detalle del contenido, también es el que inicia el
loading dentro del detalle del contenido */

function* detailedWatcher() {
    yield takeLatest(REQUEST_DETAILED, getDetailed)
}

/* getDetailed obtiene la información del elemento seleccionado, tomando en consideración si ID y el tipo de contenido
(anime o manga), tamién finaliza el loading dentro del detalle del contenido */

function* getDetailed(param) {
    let contentType;
    if(param.param.episodes || param.param.episodes === 0){
        contentType = "anime"
    }else{
        contentType = "manga"
    }
    const detailed = yield call([axios, axios.get], baseUrl + contentType + "/"+param.param.contentId);
    yield put({ type: GET_DETAILED, payload: detailed.data })
}



export default function* rootSaga() {
    yield all([
        contentWatcher(),
        detailedWatcher()
    ]);
}
