import React from 'react';
import './try-markdown.css';
import {Link} from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

function ShowInstanceLink(props){
    const instance = props.instance;
    if(instance){
        return(
            <Link to={`/blog/${instance['id']}`} title={ instance.title }>{ instance.title }</Link>
        )
    }
    return (<span>---</span>);
}

export class BlogDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            remote_url: API_URL + '/api/blog/' + this.props.match.params.id + "/",
            blog: {},
            prev_blog: null,
            next_blog: null
        }
    }

    componentDidMount(){
        this.fillBlogDetail();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            remote_url: API_URL + '/api/blog/' + nextProps.match.params.id + "/",
        }, this.fillBlogDetail); //call fillBlogDetail as callback
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
                blog: response_json['instance'],
                prev_blog: response_json['prev_instance'],
                next_blog: response_json['next_instance']
            });
        });
    }

    render(){
        return(
            <div>
                <h1>{ this.state.blog.title }</h1>
                <div>
                    <span className="navigation-link"><ShowInstanceLink instance={this.state.prev_blog} /></span>
                    <span className="arrows">&lt;&lt; &gt;&gt;</span>
                    <span className="navigation-link"><ShowInstanceLink instance={this.state.next_blog} /></span>
                </div>
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

