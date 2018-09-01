import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {SomeDataList} from './somedatalist'
import axios from 'axios';
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
        axios.get('http://localhost:8000/multiplex/cinemas/')
            .then(resp => {
                this.setState({
                    cinemas: resp.data
                });
            });
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
        const endpoint_url='http://localhost:8000/multiplex/cinemas/' + this.props.match.params.id +"/";
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