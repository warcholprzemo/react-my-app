import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class SimpleForm extends React.Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            debug: []
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
                    debug: ['Response status: 404']
                });
                return {};
            } else {
                return response.json();
            }
        })
        .then((responseJson) => {
            let msg = ["[OK; Data from backend]"];
            for(let key in responseJson)
                msg.push(key + ": " + responseJson[key]);

            this.setState({
                debug: msg,
            });
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
                        <input type="text" defaultValue="abc" name="sometext" />
                    </p>

                    <p>
                        <label>Some number</label>
                        <input type="number" defaultValue="13" name="somenumber" />
                    </p>

                    <p>
                        <label htmlFor="somecheckbox">Some checkbox</label>
                        <input type="checkbox" defaultChecked="checked"
                               id="somecheckbox" name="somecheckbox" />
                    </p>

                    <input type="submit" />

                </form>

                <div id="simple-form-debug-box">
                    <label>Debug</label>
                    <div>{this.state.debug.map((row, index) => <div key={"response-row-"+index}>{row}</div> )}</div>
                </div>
            </div>
        );
    }
}