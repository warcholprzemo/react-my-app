import React from 'react';
import './somedatalist.css';

export class SomeDataList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            object_list: [],
            maybeError: "",
        }
    }

    componentDidMount(){
        this.fillObjectList();
    }

    fillObjectList(){
        fetch(this.props.endpoint_url, {
            method: 'GET',
        })
        .then(response => {
            if(response.status === 404 || response.status === 500){
                var error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
        .then(response_json => {
            let resp_object_list = response_json;
            if(this.props.pack_object_to_list()){
                resp_object_list = [response_json];
            }
            this.setState({
                object_list: resp_object_list,
            });
        })
        .catch(error => {
            this.setState({
                maybeError: error.toString(),
            });
        });
    }

    render(){
        let html_rows = [];
        let column_labels = [];
        for(let i=0; i<this.state.object_list.length; i++){
            let next_object = this.state.object_list[i];
            let columns = [];

            for(let key in next_object){
                if (next_object.hasOwnProperty(key)) {
                    let next_value = next_object[key];
                    if(next_value !== null)
                        next_value = next_value.toString();

                    columns.push(
                        <td key={ 'column-' + key }>
                            { next_value }
                        </td>
                    )
                }
                if(i === 0){
                    column_labels.push(
                        <th key={ 'column_label-' + key }>
                            { key.toString() }
                        </th>
                    );
                }
            }

            html_rows.push(
                <tr key={ 'object-' + i }>
                    { columns }
                </tr>
            );
        }
        return(
            <div className="cinema-list">
                <h1>{this.props.custom_label}</h1>
                {/* <label>List of {this.props.custom_label}</label> */}
                <table>
                    <thead>
                        <tr>
                            {column_labels}
                        </tr>
                    </thead>
                    <tbody>
                        {html_rows}
                    </tbody>
                </table>
                <div className="debug">
                    endpoint_url <a href={this.props.endpoint_url}>{this.props.endpoint_url}</a>
                </div>
                <div className="maybeError">{this.state.maybeError}</div>
            </div>
        );
    }
}

SomeDataList.defaultProps = {
    pack_object_to_list: () => false
}
