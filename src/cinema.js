import React from 'react';
import './index.css';
import {SomeDataList} from './somedatalist'
import {Link} from 'react-router-dom';

export class CinemaList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cinemas: [],
        }
    }

    componentDidMount() {
        this.fillCinemas();
    }

    fillCinemas(){
        fetch(API_URL + '/api/multiplex/cinemas/', {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            console.log("responseJson", responseJson);
            this.setState({
                cinemas: responseJson, //.data
            });
        })
    }

    render(){
        let html_cinema_list = [];
        for(let i=0; i<this.state.cinemas.length; i++){
            let cinema = this.state.cinemas[i];
            let cinema_key = "cinema-" + i;
            html_cinema_list.push(
                <tr key={ cinema_key }>
                    <td>{ cinema['id'] }</td>
                    <td>
                        <Link to={`/cinemas/${cinema['id']}`} >{ cinema['name'] }</Link>
                    </td>
                    <td>{ cinema['address'] }</td>
                </tr>
            );
        }
        return(
            <div className="cinema-list">
                <h1>Cinemas</h1>
                <label>List of cinemas from django-api</label>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Adress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {html_cinema_list}
                    </tbody>
                </table>
            </div>
        );
    }
}


export class CinemaEdit extends React.Component{
    render(){
        const endpoint_url = API_URL + '/api/multiplex/cinemas/' + this.props.match.params.id +"/";
        return(
            <div>
                <SomeDataList endpoint_url={endpoint_url}
                              custom_label='Cinema detail'
                              pack_object_to_list={() => true}

                />
            </div>
        )
    }
}