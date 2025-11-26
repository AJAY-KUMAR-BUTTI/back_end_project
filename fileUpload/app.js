const express = require('express');
const app = express();
app.use(express.urlencoded());
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const base64 = require('js-base64');

cloudinary.config({
    cloud_name : 'dqtm1swio',
    api_key : '128136724988873',
    api_secret : 'rzqwIfjnaHhFf1Tl5Tf8WOqvCR4'
})

const upload = multer({
    storage : multer.memoryStorage()
})

app.use(express.static('public'));

let products = [];
app.post('/products',upload.single('image'), async (req, res) => {
     try {
        const productData = req.body;
     console.log("product post call executed", productData);
     const fileData = req.file;
     console.log(fileData);
     if(fileData) {
        const base64FileData = base64.encode(fileData.buffer);
        const cloudinaryResponse = await cloudinary.uploader.upload(`data:${fileData.mimetype};base64,${base64FileData}`);
        console.log(cloudinaryResponse);
        productData.imageUrl = cloudinaryResponse.secure_url;
        products.push(productData);
     }
     res.send({status : 'success', msg : 'product added successfully'});
     } catch (err) {
        res.status(500).send({status : 'error'});
     }
      
})

app.get('/products', (req, res) => {
    res.send(products);
})
app.listen(8000, () => {
    console.log('server is started');
})