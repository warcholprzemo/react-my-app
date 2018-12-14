import React from 'react';
import './try-markdown.css';
import {Link} from 'react-router-dom';
const ReactMarkdown = require('react-markdown');


export class BlogDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            remote_url: API_URL + '/api/blog/' + this.props.match.params.id + "/",
            blog: {},
        }
    }

    componentDidMount(){
        this.fillBlogDetail();
    }

    fillBlogDetail(){
        fetch(this.state.remote_url, {
            method: 'GET',
        })
        .then(response => {
            //TODO: handle 4** and 5** statuses
            return response.json();
        })
        .then(response_json => {
            this.setState({
                blog: response_json
            });
        });
    }

    render(){
        return(
            <div>
                <h1>{ this.state.blog.title }</h1>
                <div className="try-markdown-main">
                    <ReactMarkdown source={ this.state.blog.content } />
                </div>
                <div className="debug">
                    endpoint_url <a href={this.state.remote_url}>{this.state.remote_url}</a>
                </div>
            </div>
        );
    }
}

export class BlogList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            blogs: [],
            remote_url: API_URL + '/api/blog/'
        }
    }

    componentDidMount(){
        this.fillBlogList();
    }

    fillBlogList(){
        fetch(this.state.remote_url, {
            method: 'GET',
        })
        .then(response => {
            //TODO: handle 4** and 5** statuses
            return response.json();
        })
        .then(response_json => {
            this.setState({
                blogs: response_json
            });
        });
    }

    render(){
        let rows = [];
        for(let i=0; i<this.state.blogs.length; i++){
            let blog = this.state.blogs[i];
            rows.push(
                <tr key={ blog.id }>
                    <td>{ blog.id }</td>
                    <td>
                        <Link to={`/blog/${blog['id']}`}>
                            { blog.title }
                        </Link>
                    </td>
                    <td>{ blog.created }</td>
                </tr>
            )
        }
        return(
            <div>
                <h1>Lista wpisów</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tytuł</th>
                            <th>Data utworzenia</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rows }
                    </tbody>
                </table>
            </div>
        );
    }
}

