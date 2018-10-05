import React, { Component } from 'react'
import { getContent } from "../../../actions";
import '../static/searchHeader.css'
import { connect } from 'react-redux';

class SearchHeader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contentType: "anime",
            userText: ""
        };
        this.onSelect = this.onSelect.bind(this);
        this.inputText = this.inputText.bind(this);
    }

    onSelect(e){
        this.setState({
            contentType:e.target.value
        })
    }

    inputText(e){
        this.setState({
            userText:e.target.value
        })
    }

    render() {
        return(
            <div className={"search-header-bucket"}>
                <div className={"search-input-div"}>
                    <input className={"content-input"} type="text" placeholder={"Busca por Anime o Manga"} onChange={this.inputText}/>
                    <button className={"anime-btn search-btn"} onClick={() => this.props.getContent(this.state)}>Buscar</button>
                </div>
                <div className={"type-search-div"}>
                    <label className="">
                        <input type="radio" name="content-type" value={"anime"} defaultChecked onChange={this.onSelect}/>
                        <span className="checkmark"></span>
                        Anime
                    </label>
                    <label className="">
                        <input type="radio" name="content-type" value={"manga"} onChange={this.onSelect} />
                        <span className="checkmark"></span>
                        Manga
                    </label>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getContent:getContent
};

export default connect(null, mapDispatchToProps)(SearchHeader)