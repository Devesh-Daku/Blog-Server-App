const express = require('express');
const app = express();    
const morgan = require('morgan')  
const mongoose = require('mongoose') 
const Blog = require('./models/blog')

//connect to mongoDB
const dbURI = 'mongodb+srv://Suppandi:Suppandi@cluster0.lqgdzmd.mongodb.net/SuppandiDB?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result)=> app.listen(3000))
.catch((err) => console.log(err))

//register view engine
app.set('view engine','ejs');

//app.set('views','views_folder_name')

// creating middlewares 
// middlewares and static file
app.use(express.static('public')); // we mentioned that the static folder is public so 
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true})); // in heading of ejs file we can reffer / to public

// mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title:'new blog 2',
        snippet:'about my new blog',
        body:'more about my new blog'
    });
    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=> {
            console.log(err)
        })
        
})
app.get('/all-blogs',(req,res)=>{
    Blog.find()
        .then((results)=>{
            res.send(results);
        })
        .catch((err)=>{
            console.log(err)
        })
})
app.get('/single-blog',(req,res)=>{
    Blog.findById('656424bbe4a8394e12e9695f')
        .then((result)=>{
            res.send(result);
        })
        .catch((err) =>{
            console.log(err);
        })
})

  
//routes
app.get('/',(req,res)=>{
    res.redirect('/blogs')
})
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
})

//blog routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({ createdAt : -1})
        .then((result)=>{
            res.render('index',{title:'All blogs', blogs:result})
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.post('/blogs',(req,res)=>{
    // console.log(req.body);
})
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create'});
})

app.use((req,res ,next)=>{
    console.log('In the next middleware');
    // were rearly reaches here
    next();//to send further 
});

app.use((req,res)=>{
    res.status(404).render('404',{title:'404-error'});
})
