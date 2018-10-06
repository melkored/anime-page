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
            const w = 1000;
            const h = 700;
            let left = (window.screen.width - w) / 2;
            let top = (window.screen.height - h) / 3;
            console.log(window.screen.width);
            console.log(window.screen.height);
            return(
                <button className={"anime-btn trailer-btn"} onClick={() => window.open(trailerUrl, "popupWindow",
                    'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, ' +
                    'copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left)}>Ver Trailer</button>
            )
        }else{
            return null
        }
    }

    eachContent(content){
        return content.map((op, i) => {
            return(
                <tr>
                    <td className={"title"} key={i}>{op}</td>
                </tr>
            )
        })
    }

    contentOpening2(content){
        if(content){
            return(
                <table>
                    <tbody>
                    <tr>
                        <th className={"ordinary-text"}>Openings:</th>
                    </tr>
                    {this.eachContent(content)}
                    </tbody>
                </table>
            )
        }else{
            return null
        }
    }
    contentEnding2(content) {
        if (content) {
            return (
                <table>
                    <tbody>
                    <tr>
                        <th className={"ordinary-text"}>Endings: </th>
                    </tr>
                    {this.eachContent(content)}
                    </tbody>
                </table>
            )
        } else {
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
            return null
        }
    }

    eachauthor(authors){
        return authors.map((au, i) => {
            return(
                <tr>
                    <td key={i} className={"title"}>{au.name}</td>
                </tr>
            )
        })
    }

    authors(author){
        if(author){
            return(
                <table>
                    <tbody>
                    <tr>
                        <th className={"ordinary-text"}>Autores:</th>
                    </tr>
                    {this.eachauthor(author)}
                    </tbody>
                </table>
            )
        }else{
            return null
        }
    }

    sequelContent(element){
        return element.map((item, i) => {
            console.log(item.name);
            return(
                <tr>
                    <td key={i} className={"title"}>{item.name}</td>
                </tr>
            )
        })
    }

    sequel(element){
        if(element){
            return(
                <table>
                    <tbody>
                    <tr>
                        <th className={"ordinary-text"}>Secuela:</th>
                    </tr>
                    <tr>
                        {this.sequelContent(element)}
                    </tr>
                    </tbody>
                </table>
            )
        }else{
            return null
        }
    }

    prequel(element){
        if(element){
            return(
                <table>
                    <tbody>
                    <tr>
                        <th className={"ordinary-text"}>Precuela:</th>
                    </tr>
                    <tr>
                        {this.sequelContent(element)}
                    </tr>
                    </tbody>
                </table>
            )
        }else{
            return null
        }
    }

    responsiveDiv(selected){
        if(selected !== undefined){
            return(
                <div className={"responsive-div"}>
                    <div className={"responsive-image"}>
                        <img height={"250px"} src={selected.image_url} alt=""/>
                    </div>
                    <div className={"responsive-detail"}>
                        <p className={"ordinary-text"}>Título: <p className={"title"}>{selected.title}</p></p>
                        <p className={"ordinary-text"}>Título en japonés: <p className={"title"}>{selected.title_japanese}</p></p>
                        <p className={"ordinary-text"}>Géneros:</p>
                        {this.contentGenres(selected.genres)}
                        {this.chaptersEpisodes(selected)}
                    </div>
                    <div className={"responsive-synopsis"}>
                        <p className={"ordinary-text synopsis-content"}>Sinopsis: <p className={"title"}>{selected.synopsis}</p></p>
                    </div>
                    <div className={"responsive-other-series"}>
                        {this.prequel(selected.related.Prequel)}
                        {this.sequel(selected.related.Sequel)}
                        {this.authors(selected.authors)}
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
                    </div>
                    <div className={"responsive-openings"}>
                        {this.contentOpening2(selected.opening_themes)}
                    </div>
                    <div className={"responsive-openings"}>
                        {this.contentEnding2(selected.ending_themes)}
                    </div>
                    <div className={"trailer-btn-div"}>
                        {this.trailer(selected.trailer_url)}
                    </div>
                </div>
            )
        }
    }

    showDetailed(selected, content){
        console.log(selected);
        if(selected !== undefined && content !== undefined){
            return(
                <div className={"all-detailed-bucket"}>
                    <div className={"detailed-image detailed-child bucket-child"}>
                        <img src={selected.image_url} alt=""/>
                    </div>
                    <div className={"detailed-child bucket-child"}>
                        <p className={"ordinary-text"}>Título: <p className={"title"}>{selected.title}</p></p>
                        <p className={"ordinary-text"}>Título en japonés: <p className={"title"}>{selected.title_japanese}</p></p>
                        <p className={"ordinary-text"}>Géneros: <br/>
                            {this.contentGenres(selected.genres)}
                        </p>

                        {this.chaptersEpisodes(selected)}

                        {/*<h2>{"Publicada: " + selected.aired.string}</h2>*/}
                    </div>
                    <div className={"other-content-div bucket-child"}>
                        {this.prequel(selected.related.Prequel)}
                        {this.sequel(selected.related.Sequel)}
                        <p className={"ordinary-text synopsis-content"}>Sinopsis: <p className={"title"}>{selected.synopsis}</p></p>
                        {this.authors(selected.authors)}
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
                        {this.contentOpening2(selected.opening_themes)}
                        {this.contentEnding2(selected.ending_themes)}
                        <div className={"trailer-btn-div"}>
                            {this.trailer(selected.trailer_url)}
                        </div>
                    </div>
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
                {this.responsiveDiv(selected, this.props.content)}
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