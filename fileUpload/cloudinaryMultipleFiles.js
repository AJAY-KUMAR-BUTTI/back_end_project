const express = require('express');
const app = express();
const multer = require('multer');
const base64 = require('js-base64');
const cloudinary = require('cloudinary').v2;


cloudinary.config ({ 
    cloud_name : 'dqtm1swio',
    api_key : '128136724988873',
    api_secret : 'rzqwIfjnaHhFf1Tl5Tf8WOqvCR4'
})
app.use(express.static('public'));
const upload = multer({ 
    storage : multer.memoryStorage()
})
const products = [];
app.post('/products', upload.array('image'),async (req, res) => {
    
    try {
        const postData = req.body;

        console.log('POST CALL EXECUTED SUCCESSFULLY', postData);

        const fileData = req.files;
        console.log(fileData);
        if(fileData) {
            postData.imageUrl = []
            for(let index=0;index<fileData.length;index++) {
                let singleFile = fileData[index];
                const base64FileData = base64.encode(singleFile.buffer);
                const cloudinaryResponseData = await cloudinary.uploader.upload(`data:${singleFile.mimetype};base64,${base64FileData}`);
                console.log(cloudinaryResponseData);
                postData.imageUrl.push(cloudinaryResponseData.secure_url);
                products.push(postData);
               }
            }
           
        res.send({status : 'success', msg : 'post added successfully'});
    } catch(err) {
        console.log(err);
        res.status(500).send({status : 'Error', msg : 'POST NOT ADDED'})
    }
})
app.listen(8000, () => {
    console.log("the server is running");
})
