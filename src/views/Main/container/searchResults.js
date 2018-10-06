import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../static/searchResults.css'
import {getContentDetailed} from "../../../actions";
import Loading from '../component/loading'

class SearchResults extends Component{

    eachElement(content){
        if(content){
            let sortContent = content.sort(function(a, b) {
                return b.score-a.score
            });
            return sortContent.map((item, i) => {
                const toSend = {
                    contentId:item.mal_id,
                    episodes:item.episodes
                };
                return(
                    <div key={item.mal_id} className={"each-content"} onClick={() => this.props.getContentDetailed(toSend)}>
                        <img className={"content-img"} src={item.image_url} alt="" width={"100px"}/>
                        <div className={"middle-div"}>
                            <div className={"content-basic-info"}>
                                <span className={"content-text"}>{item.title}</span>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        else{
            return(
                <div className={"no-content-to-show"}>
                    <span className={"first-instruction"}>¡Utiliza el búscador de arriba para encontrar los mejores animes y mangas!</span><br/><br/>
                    <span className={"first-instruction"}>¿No sabes qué buscar? ¡Solo aprieta el botón de búsqueda y encontrarás el mejor contenido!</span>
                </div>
            )
        }
    }

    loadingDiv(loading){
        if(loading){
            return(
                <Loading/>
            )
        }else{
            return null
        }
    }

    render() {
        return(
            <div className={"results-bucket child-bucket"}>
                <div className={"all-result-content"}>
                    {this.loadingDiv(this.props.searchLoading)}
                    {this.eachElement(this.props.content)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    content:state.content,
    searchLoading:state.searchLoading
});

const mapDispatchToProps = {
    getContentDetailed:getContentDetailed
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)