import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from 'axios'

function* contentWatcher() {
    yield takeLatest('REQUEST_CONTENT', getContent)
}

function* getContent(param) {
    let content;
    if(param.param.userText){
        content = yield call([axios, axios.get], 'https://api.jikan.moe/v3/search/' + param.param.contentType + '?q=' + param.param.userText);
    }else{
        content = yield call([axios, axios.get], 'https://api.jikan.moe/v3/search/' + param.param.contentType + '?score=8.00-9.0');
    }
    yield put({ type: "GET_CONTENT", payload: content.data.results });
}

function* detailedWatcher() {
    yield takeLatest('REQUEST_DETAILED', getDetailed)
}

function* getDetailed(param) {
    var contentType;
    if(param.param.episodes || param.param.episodes === 0){
        contentType = "anime"
    }else{
        contentType = "manga"
    }
    const detailed = yield call([axios, axios.get], "https://api.jikan.moe/v3/" + contentType + "/"+param.param.contentId);
    yield put({ type: "GET_DETAILED", payload: detailed.data })
}



export default function* rootSaga() {
    yield all([
        contentWatcher(),
        detailedWatcher()
    ]);
}
