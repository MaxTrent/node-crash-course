const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')

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
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
// app.use((req, res, next)=>{
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });



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

app.use('/blogs',blogRoutes);


//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
