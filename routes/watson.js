const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ffmpeg = require('../image-resizer/ffmpeg.js');
// const resizer = require('../image-resizer/resizer.js')
// require('dotenv').load();
const watson = require('watson-developer-cloud');
const resizer = require('../image-resizer/resizer');
const multer = require('multer');
const cloudinary = require('cloudinary');
const axios = require('axios');

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb){
    cb(null, `${new Date()}-${file.originalname}`);
  }
});

const upload = multer({storage});

router.post('/:endpoint', upload.single('file'), (req,res,next)=>{
  let file = req.file;
  let meta = req.body;
  let endpoint = req.params.endpoint;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
  //  See Configuration Options for more details and additional configuration methods.

  cloudinary.uploader.upload(file.path, function(result) {

    var params = {
      images_file: result.secure_url,
      'classifier_ids':[`${endpoint}`]
    }

    var visual_recognition = watson.visual_recognition({
      api_key: process.env.WATSON_API,
      version: 'v3',
      version_date: '2016-05-20',
    })
    visual_recognition.classify(params, function(err, response) {
      if (err){
        console.log('error',params.images_file);
        console.log('error', err);
      } else {
        console.log('success', params.images_file)
        console.log(JSON.stringify(response, null, 2))
        var resultTemp= [];

        let classesResponse = response.images[0].classifiers[0].classes;

        classesResponse.forEach(el=>{
          if(el.score > .60){
            resultTemp.push(el)
          }
        })
        let result = JSON.stringify(resultTemp, null, 2)
        res.send(result)
      }
    })
  },{crop:'fit', width:200});


  // console.log('NAME', file.filepath);
  // fs.writeFile('userimg.jpg', base64Data, 'base64', (err, suc) => {
  //   const filePathsToResize = [imgpath]
    // it can be just one, but still has to be an array, you can give it all of your images, it will just spit out images that are already below the configured max size (2MB) without doing any processing, so no need to check on your end
    // const Resizer = new resizer.Resizer([file.path])
    // // use the Resizer.resize() method as a simple promise
    // Resizer.resize().then((filePaths) => {
      // console.log('FILEPATH: ', filePaths);
      // console.log('FILEPATH AT 0', filePaths[0]);
      // console.log('TYPE OF FILEPATHS', typeof filePaths);
      // console.log('TYPE OF FILEPATHS AT 0', typeof filePaths[0])
    //  console.log('FILEPATHS POST RESIZER', filePaths) // paths to the resized images
    // }).catch((error) => {
    //  console.log('error 2', error);
  //  })//END OF CATCH STATEMENT OF RESIZE
 // }) //END OF WRITE FILE
}) //END OF POST



module.exports = router;
