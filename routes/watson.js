const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ffmpeg = require('../image-resizer/ffmpeg.js');
// const resizer = require('../image-resizer/resizer.js')
require('dotenv').load();
const watson = require('watson-developer-cloud');
const resizer = require('../image-resizer/resizer');
const multer = require('multer');
const cloudinary = require('cloudinary');
const axios = require('axios');

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb){
    cb(null, 'tempImg.jpg');
  }
});
const upload = multer({storage});

// const storageSmall = multer.diskStorage({
//   destination: './filesSmall',
//   filename(req, file, cb){
//     cb(null, 'temp.jpg');
//   }
// });
// const uploadSmall = multer({storageSmall});

router.post('/:endpoint', upload.single('file'), (req,res,next)=>{
  let file = req.file;
  let meta = req.body;
  let endpoint = req.params.endpoint;
  const Resizer = new resizer.Resizer([file.path])
  // // use the Resizer.resize() method as a simple promise
  Resizer.resize().then((filePaths) => {
    console.log('FILEPATHS', filePaths);
  var params = {
    images_file:fs.createReadStream(filePaths),
    'classifier_ids':[`${endpoint}`],
  }
  var visual_recognition = watson.visual_recognition({
    api_key: process.env.WATSON_API,
    version: 'v3',
    version_date: '2016-05-20'
  })
    visual_recognition.classify(params, function(err, response) {
      if (err) {
        console.log('error', err)
      } else {
        console.log(JSON.stringify(response, null, 2))
        var resultTemp= [];

        if(response.images[0].classifiers[0] === undefined){
          return res.sendStatus(404)
        }

        let classesResponse = response.images[0].classifiers[0].classes;
        console.log('images are being recognized', response.images[0].classifiers[0].classes)

        classesResponse.forEach(el=>{
          if(el.score > .50){
            resultTemp.push(el)
          }
        })
        let result = JSON.stringify(resultTemp, null, 2)
        res.send(result)
      }
    })
  })//END OF THEN
  .catch(err=>{console.log('Error', err);})

  // cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_SECRET
  // });
  //  See Configuration Options for more details and additional configuration methods.

  // cloudinary.uploader.upload(file.path, function(result) {
    // uploadSmall.single('result.url')
    // console.log(result.public_id);
  // },{crop:'fit', width:200, quality:'auto'})
  // .then((cloudUrl)=>{
    // cloudinary.v2.uploader.upload(cloudUrl.public_id,
    // { public_id: "filesSmall/tempImg" },
    // function
    // (error, result) {console.log(result); console.log('./filesSmall/tempImg') });



  // console.log('NAME', file.filepath);
  // fs.writeFile('userimg.jpg', base64Data, 'base64', (err, suc) => {
  //   const filePathsToResize = [imgpath]
    // it can be just one, but still has to be an array, you can give it all of your images, it will just spit out images that are already below the configured max size (2MB) without doing any processing, so no need to check on your end

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
