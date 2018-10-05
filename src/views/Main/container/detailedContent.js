import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../static/detailedContent.css'
import Loading from "../component/loading";

class DetailedContent extends Component{

    contentGenres(allGenres){
        return allGenres.map((genre, i) => {
            return(
                <span className={"content-badge"} key={genre.mal_id}>{genre.name}</span>
            )
        })
    }

    trailer(trailerUrl){
        if(trailerUrl){
            return(
                <button className={"anime-btn trailer-btn"} onClick={() => window.open(trailerUrl, "popupWindow", "width=1000, height=700, scrollbars=yes")}>Ver Trailer</button>
            )
        }else{
            return null
        }
    }

    contentOpenings(openings){
        if(openings !== undefined && openings.length !== 0){
            return openings.map((op, i) => {
                return(
                    <tr>
                        <td className={"title"} key={i}>{op}</td>
                    </tr>
                )
            })
        }else{
            return(
                <tr>
                    <td className={"title"}>{"N/A"}</td>
                </tr>
            )
        }
    }

    chaptersEpisodes(selected){
        if(selected.episodes){
            return(
                <p className={"ordinary-text"}>Episodios: <p className={"title"}>{selected.episodes}</p></p>
            )
        }else if(selected.chapters){
            return(
                <p className={"ordinary-text"}>Capítulos: <p className={"title"}>{selected.chapters}</p></p>
            )
        }else{
            return(
                <p className={"ordinary-text"}>Episodios: <p className={"title"}>{"N/A"}</p></p>
            )
        }
    }

    ahtuors(authors){
        if(authors){
            return authors.map((au, i) => {
                return(
                    <tr>
                        <td key={i} className={"title"}>{au.name}</td>
                    </tr>
                )
            })
        }else{
            return(
                <tr>
                    <td className={"title"}>{"N/A"}</td>
                </tr>
            )
        }
    }

    sequel(element){
        if(element !== undefined && element.length !== 0){
            return element.map((item, i) => {
                console.log(item.name);
                return(
                    <tr>
                        <td key={i} className={"title"}>{item.name}</td>
                    </tr>
                )
            })
        }else{
            return(
                <tr>
                    <td className={"title"}>{"N/A"}</td>
                </tr>
            )
        }
    }

    showDetailed(selected, content){
        console.log(selected);
        if(selected !== undefined && content !== undefined){
            return(
                <div className={"all-detailed-bucket"}>
                    <div className={"detailed-image detailed-child"}>
                        <img src={selected.image_url} alt=""/>
                    </div>
                    <div className={"detailed-child"}>
                        <p className={"ordinary-text"}>Título: <p className={"title"}>{selected.title}</p></p>
                        <p className={"ordinary-text"}>Título en japonés: <p className={"title"}>{selected.title_japanese}</p></p>
                        <p className={"ordinary-text"}>Géneros: <br/>
                            {this.contentGenres(selected.genres)}
                        </p>

                        {this.chaptersEpisodes(selected)}

                        {/*<h2>{"Publicada: " + selected.aired.string}</h2>*/}
                    </div>
                    <div className={"other-content-div"}>
                        <table>
                            <tbody>
                            <tr>
                                <th className={"ordinary-text"}>Precuela:</th>
                            </tr>
                            <tr>
                                {this.sequel(selected.related.Prequel)}
                            </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                            <tr>
                                <th className={"ordinary-text"}>Secuela:</th>
                            </tr>
                            <tr>
                                {this.sequel(selected.related.Sequel)}
                            </tr>
                            </tbody>
                        </table>
                        <p className={"ordinary-text synopsis-content"}>Sinopsis: <p className={"title"}>{selected.synopsis}</p></p>
                        <table>
                            <tbody>
                            <tr>
                                <th className={"ordinary-text"}>Autores:</th>
                            </tr>
                            {this.ahtuors(selected.authors)}
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                            <tr>
                                <th className={"ordinary-text"}>Rank:</th>
                                <th className={"ordinary-text"}>Puntaje:</th>
                                <th className={"ordinary-text"}>Popularidad:</th>
                                <th className={"ordinary-text"}>Clasificación:</th>
                            </tr>
                            <tr>
                                <td className={"title"}>{selected.rank}</td>
                                <td className={"title"}>{selected.score}</td>
                                <td className={"title"}>{selected.popularity}</td>
                                <td className={"title"}>{selected.rating}</td>
                            </tr>
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                            <tr>
                                <th className={"ordinary-text"}>Openings</th>
                            </tr>
                            {this.contentOpenings(selected.opening_themes)}
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                            <tr>
                                <th className={"ordinary-text"}>Endings</th>
                            </tr>
                            {this.contentOpenings(selected.ending_themes)}
                            </tbody>
                        </table>
                        <div className={"trailer-btn-div"}>
                            {this.trailer(selected.trailer_url)}
                        </div>
                    </div>
                </div>
            )
        }else if(content !== undefined && selected === undefined){
            return(
                <div className={"no-content-to-show"}>
                    <span className={"first-instruction"}>¡Ya que encontraste un anime o manga, seleccionalo y podrás ver más información!</span>
                </div>
            )
        }else{
            return null
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
        const selected = this.props.detailed;
        return(
            <div className={"detailed-bucket child-bucket"}>
                {this.loadingDiv(this.props.detailedLoading)}
                {this.showDetailed(selected, this.props.content)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    content:state.content,
    detailed:state.detailed,
    detailedLoading:state.detailedLoading
});

export default connect(mapStateToProps)(DetailedContent)