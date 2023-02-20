const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const Blog = require('./models/blog');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://samuelmax:test1111@nodetut.pw3jsiy.mongodb.net/nodetut?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
mongoose.connect(dbURI)
    .then((result) => { app.listen(3000); })
    .catch((err) => { console.log(err) });


//register view engine
app.set('view engine', 'ejs');




//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));
// app.use((req, res, next)=>{
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res)=>{
const blog = new Blog({
    title: 'New Blog',
    snippet: 'About my new blog',
    body: 'More about my new blog'
});

blog.save().then((result) => {
    res.send(result)
}).catch((err) => {
    console.log(err);
});
});


app.get('/all-blogs', (req, res)=> {
    Blog.find().then((result)=> {
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
});

app.get('/single-blog', (req, res)=>{
    Blog.findById('63f3a24117f79a8317d2493a').then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    });
});

// app.use((req, res, next)=>{
//     console.log('in the next middleware');
//     next();
// })

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>home page</p>');
    res.render('about', { title: 'About' });
});

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().then((result)=>{
        res.render('index', {
            title: 'All Blogs', blogs: result
        })
    }).catch((err)=>{
        console.log(err);
    })
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
})

//redirects
app.get('/about-us', (req, res) => {
    // res.send('<p>home page</p>');
    res.redirect('/about');
});

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
