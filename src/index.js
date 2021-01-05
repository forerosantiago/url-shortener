const express = require('express');
const bodyParser = require('body-parser');
const nanoid = require('nanoid');
const validUrl = require('valid-url');
const db = require('quick.db');

const app = express();



app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/:id', (req, res) => {
    let link = db.get(req.params.id);
    if(link === null) return res.redirect('/?error=1');
    res.redirect(link);
});

app.get('/generate', (req, res) => {
    res.redirect('/');
});



app.post('/generate', (req, res) => {
    if(!validUrl.isUri(req.body.url)) {
        return res.redirect('/?error=0');
    }
    let id = nanoid.nanoid(7);
    db.set(id, req.body.url);
    res.redirect('/?url=' + req.header('Host') + '/' + id);
});

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
});
