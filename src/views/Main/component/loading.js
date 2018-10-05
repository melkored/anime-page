import React from 'react'
import loadingImage from '../static/loading.gif'
import '../static/loading.css'

let Loading = () => (
    <div className={"loading-bucket"}>
        <img src={loadingImage} alt=""/>
    </div>
);

export default Loading