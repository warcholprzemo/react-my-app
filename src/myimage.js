import React from 'react';
import {Link} from 'react-router-dom';

import './myimage.css';


export class MyImageList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images: []
        };
    }

    componentDidMount(){
        this.fillGallery();
    }

    fillGallery(){
        fetch(API_URL + "/api/myimage/list/", {
            method: 'GET'
        })
        .then(response => {
            return response.json();
        })
        .then(response_json => {
            this.setState({
                images: response_json
            });
        });
    }

    render(){
        let rows = [];
        for(let i=0; i<this.state.images.length; i++){
            const image=this.state.images[i];
            rows.push(
                <tr key={image.id}>
                    <td>
                        <a href={image.image}>{image.image}</a>
                    </td>
                    <td>
                        <img src={image.image} title={image.image} />
                    </td>
                    <td>
                        <span>{image.size[0]}x{image.size[1]}</span>
                    </td>
                </tr>
            );
        }
        return(
            <div>
                <h2 className="gallery_header">*** Gallery ***</h2>
                <table className="gallery_table">
                    <thead>
                        <tr>
                            <th>Link</th>
                            <th>Preview</th>
                            <th>Original size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}


export class MyImageCreate extends React.Component{
    constructor(props){
        super(props);
        this.uploadFileToServer = this.uploadFileToServer.bind(this);
        /* The goal: fileUrl: "http://localhost:8000/media/file.png" */
        this.state = {
            fileUrl: "",
            objectID: null
        }
    }

    uploadFileToServer(event){
        event.preventDefault();
        const data = new FormData(event.target);

        fetch(API_URL + "/api/myimage/create/", {
            method: 'POST',
            body: data,
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            this.setState({
                fileUrl: responseJson.image,
                objectID: responseJson.id
            })
        });
    }

    renderImage(){
        if(this.state.fileUrl){
            return (
                <div>
                    <label>Object id: { this.state.objectID }</label>
                    <p><img src={ this.state.fileUrl } title={ this.state.fileUrl } /></p>
                </div>
            );
        }
        return (
            <span>File not found</span>
        );
    }


    render(){
        let fileHtml = "";
        if(this.state.fileUrl){
            fileHtml = () => '<img src="' + this.state.fileUrl + '" />';
        } else {
            fileHtml = () => '<span>File not found</span>';
        }

        return(
            <div>
                <h2>Try to upload a file</h2>
                <form method="POST"
                      onSubmit={this.uploadFileToServer}
                      action={API_URL + "/api/myimage/create/"}
                      encType="multipart/form-data">
                    <p>
                        <input type="file" name="image" />
                    </p>
                    <p>
                        <input type="submit" value="Send form" />
                    </p>
                </form>
                {this.renderImage()}
                <div>
                    <Link to="/myimage/list">Link to Gallery</Link>
                </div>
            </div>
        );
    }
}
