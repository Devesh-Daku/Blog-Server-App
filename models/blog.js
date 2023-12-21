const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// we make a Schema that defines our structures 
const blogSchema = new Schema({ 
    title:{ 
        type: String,
        required: true
        },
    snippet:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    }

},{timestamps:true});

// Based on that schema we defines our model 
const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog;