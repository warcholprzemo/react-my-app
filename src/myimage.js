import React from 'react';
import {Link} from 'react-router-dom';


export class MyImageList extends React.Component{
    render(){
        return(
            <h2>Gallery in progress...</h2>
        )
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
            console.log(responseJson);
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
