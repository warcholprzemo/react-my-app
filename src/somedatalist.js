import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class SomeDataList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            object_list: [],
        }
    }

    componentDidMount(){
        this.fillObjectList();
    }

    fillObjectList(){
        fetch('http://localhost:8000/some-data-list/', {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(response_json => {
            this.setState({
                object_list: response_json,
            });
        });
    }

    render(){
        let html_rows = [];
        let column_labels = [];
        for(let i=0; i<this.state.object_list.length; i++){
            let next_object = this.state.object_list[i];
            console.log(next_object);

            let columns = [];
            for(let key in next_object){
                if (next_object.hasOwnProperty(key)) {
                    columns.push(
                        <td key={ 'column-' + key }>
                            { next_object[key].toString() }
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
                <label>List of somedata</label>
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
            </div>
        );
    }
}