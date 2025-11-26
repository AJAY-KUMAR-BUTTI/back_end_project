const { request } = require('express');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
let posts = require('./mock/post');


app.get('/posts', (req, res) => {
    const { name, username } = req.query;

    let responseData = posts;
    if(name) {
        responseData = responseData.filter((post) => {
            return post.name == name;
        })
    }
    if(username) {
        responseData = responseData.filter((post) => {
            return post.username == username;
        })
    }
    res.send({status : 'success', data : responseData});
})
app.get('/posts/:postId', (req, res) => {
    const { postId } = req.params;
    
    const requestPost = posts.filter((post) => {
        return post.id === Number(postId);
    })
    if(requestPost.length === 0) {
        res.status(404).send({status : 'Error', msg : 'data not found'});
    } else {
        res.send({status : 'success', data : requestPost});
    }
})
app.delete('/posts/:postId', (req, res) => {
    const { postId } = req.params;

    posts = posts.filter((post) => {
        return post.id === Number(postId) ? false : true;
    })
    res.send({status : 'success', msg : 'deleted successfully'});
})
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public', { index : false }));
app.post('/posts', (req, res) => {
    const postData = req.body;

    if(postData) {
        posts.push(postData);
        res.send({status : 'success', msg : 'post added successfully', data : postData});
    } else {
        res.status(400).send({status : 'Error', msg : "inalid input data"})
    }
})
app.put('/posts/:postId', (req, res) => {
    const { postId } = req.params;
    const newPostData = req.body;
    const index = posts.findIndex((post) => {
        return post.id === Number(postId);
    })
    if(index == -1) {
        res.status(400).send({stataus : 'Error', msg : 'data not found'});
    } else {
        const oldData = posts[index];
        posts[index] = {
            ...oldData,
            ...newPostData
        }
        // posts[index] = newPostData;
        res.send({status : 'success', msg : 'updated data successfully', data : newPostData});
    }
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(8000, () => {
    console.log("the server is running");
})