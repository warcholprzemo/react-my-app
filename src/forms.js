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
                    debug: ['[Response status: 404]']
                });
                return {};
            }
            else if(response.status === 500){
                this.setState({
                    debug: ['[Critical error: 500]']
                });
                return response.json();
            }
            else {
                this.setState({
                    debug: ["[OK; Data from backend]"],
                });
                return response.json();
            }
        })
        .then((responseJson) => {
            let msg = [];
            for(let key in responseJson)
                msg.push(key + ": " + responseJson[key]);

            let curr_debug = this.state.debug;
            this.setState({
                debug: curr_debug.concat(msg),
            });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        return (
            <div>
                <h1>Simple Form</h1>
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

                    <input type="submit" value="Send form" />

                </form>

                <div id="simple-form-debug-box">
                    <label>Debug</label>
                    <div>{this.state.debug.map((row, index) => <div key={"response-row-"+index}>{row}</div> )}</div>
                </div>
            </div>
        );
    }
}