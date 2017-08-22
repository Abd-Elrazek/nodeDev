//@EVO_TODO: use ritalin next time!!
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// register middleware
app.use((req, res, next) => {
    let log = `${new Date().toString()}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.warning('!! unable to append to \'server.log\'');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

// helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (txt) => {
    return txt.toUpperCase();
});
hbs.registerHelper('generateMenu', () => {
    return pages;
});


var pages = {
    home: '/',
    about: '/about',
    projects: '/projects',
    bad: '/bad'
};

// root page
app.get(pages.home, (req, res) => {
    res.render('home.hbs', {
        title: 'welcome to <u>batmans</u> page',
        text: 'crazy stuff here, hu?'
    });
});

// about page
app.get(pages.about, (req, res) => {
    res.render('about.hbs', {
        title: 'awesome about',
        text: 'crazy text here, hu?'
    });
});
// about page
app.get(pages.projects, (req, res) => {
    res.render('projects.hbs', {
        title: 'batmans secrets',
        text: 'batman has many, many projects...to many to tell u!'
    });
});

// error handling page
app.get(pages.bad, (req, res) => {
    res.send({
        errorMsg: 'wrong page, fucker!'
    });
});


// start server
let port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log('## server is up on port', port);
});