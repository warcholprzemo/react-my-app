import React from 'react';
import './try-markdown.css';
import {Link} from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

const global_input = `
# This is header1
### This is header3

*this is italic*

**this is bold **

~~This is Strikethrough~~

1. Ordered list item
2. Ordered list item

* Unordered list item
* Unordered list item
`

export class BlogDetail extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <h1>Test statyczny</h1>
                <div className="try-markdown-main">
                    <ReactMarkdown source={ global_input } />
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
                    <td>{ blog.title }</td>
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
                        <tr>
                            <td>0</td>
                            {/* <td><Link to={`/cinemas/${cinema['id']}`} >{ cinema['name'] }</Link>Test</td> */}
                            <td><Link to={`/blog/0`}>Test statyczny</Link></td>
                            <td>2018-10-23 20:50</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

