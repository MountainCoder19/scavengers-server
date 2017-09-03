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
    cb(null, 'tempImg.jpg');
  }
});
const upload = multer({storage});

const storageSmall = multer.diskStorage({
  destination: './filesSmall',
  filename(req, file, cb){
    cb(null, 'tempImgSmall.jpg');
  }
});
const uploadSmall = multer({storageSmall});

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
    // uploadSmall.single('result.url')
    // console.log(process.cwd('filesSmall'))
    var imgdata = result.url
    var imgpath = path.join(process.cwd(), '/temp/userimg.jpg')
    // const imgpath = './temp/userimg.jpg'
   const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
   console.log('WRITEFILE', imgpath, typeof imgpath);

   fs.writeFile('userimg.jpg', base64Data, 'base64', (err, suc) => {
     const filePathsToResize = [imgpath];
     var params = {
         images_file: fs.createReadStream(filePathsToResize),
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

            console.log('this is response.. find image classifers classes...', response.images[0].classifiers[0].classes)

            let classesResponse = response.images[0].classifiers[0].classes;
            if(!classesResponse){
              res.sendStatus(404)
            }

            classesResponse.forEach(el=>{
              if(el.score > .60){
                resultTemp.push(el)
              }
            })
            let result = JSON.stringify(resultTemp, null, 2)
            res.send(result)
          }
        })
   })

  },{crop:'fit', width:200, quality:'auto'})
  // .then((cloudUrl)=>{
  //   console.log('we fucking made it fam', cloudUrl)
  //
  //
  //   // setTimeout(()=>{
  //   //   console.log('we made it to the timeout')
  //   //   while(!'./filesSmall/tempImgSmall.jpg'){
  //   //     console.log('testing for small image file')
  //   //   }
  //
  //   // }, 1000)
  // })




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
