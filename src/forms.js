import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class SimpleForm extends React.Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            debug: ''
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target); //event.target !!

        fetch('http://localhost:8000/processform/', {
            method: 'POST',
            body: data,
        })
        .then((response) => {
            if(response.status === 404){
                this.setState({
                    debug: 'Response status: 404'
                });
                return {};
            } else {
                return response.json();
            }
        })
        .then((responseJson) => {
            console.log("Resp.json:", responseJson);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        return (
            <div>
                <form method="POST" className="simple-form"
                      onSubmit={this.handleSubmit}
                      action="http://localhost:8000/processform/">
                    <p>
                        <label>Some text</label>
                        <input type="text" defaultValue="abc" />
                    </p>

                    <p>
                        <label>Some number</label>
                        <input type="number" defaultValue="13" />
                    </p>

                    <p>
                        <label>Some checkbox</label>
                        <input type="checkbox" defaultChecked="checked" />
                    </p>

                    <input type="submit" />

                </form>

                <div id="simple-form-debug-box">
                    <label>Debug</label>
                    <div>{this.state.debug}</div>
                </div>
            </div>
        );
    }
}