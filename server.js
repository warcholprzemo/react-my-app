const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + "/dist"));

// send the user to index html page inspite of the url
app.get('/dist/static/index.js', (req, res) => {
    console.log("1", req.url);
    res.sendFile(path.resolve(__dirname, 'dist/static/index.js'));
});
app.get('*', (req, res) => {
    console.log("2", req.url);
    res.sendFile(path.resolve(__dirname, 'prod-template/index.html'));
});

app.listen(port);
