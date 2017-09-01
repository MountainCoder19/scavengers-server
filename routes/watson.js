const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ffmpeg = require('../image-resizer/ffmpeg.js');
// const resizer = require('../image-resizer/resizer.js')
require('dotenv').load();
const watson = require('watson-developer-cloud');
const resizer = require('../image-resizer/resizer');
const multer= require('multer');

// router.get('/dontUSE', ()=>{
//   // var key = require('./auth');
//
//   // visual_recognition.listClassifiers({},
//   //   function(err, response) {
//   //     if (err)
//   //     console.log(err);
//   //     else
//   //     console.log(JSON.stringify(response, null, 2));
//   //   }
//   // );
//
// })

// function IBMClassify(filepath){
//
//   return setTimout(response, 5000);
// }
const storage = multer.diskStorage({
  destination: './temp',
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/:endpoint', upload.single('file'), (req,res,next)=>{
  console.log(req.FormData.file);
  const file = req.file; // file passed from client
  const meta = req.body; // all other values passed from the client, like name, etc..

  let endpoint = req.params.endpoint;
  // const imgdata = req.body.data;

  // var imgpath = path.join(process.cwd(), '/temp/userimg.jpg');

  // const imgpath = './temp/userimg.jpg'
  // const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');

  // fs.writeFile('userimg.jpg', imgdata, 'base64', (err, suc) => {
    // const filePathsToResize = [imgpath] // it can be just one, but still has to be an array, you can give it all of your images, it will just spit out images that are already below the configured max size (2MB) without doing any processing, so no need to check on your end
    // const Resizer = new resizer.Resizer(filePathsToResize)
    // // use the Resizer.resize() method as a simple promise
    // Resizer.resize().then((filePaths) => {
    //  console.log('FILEPATHS POST RESIZER', filePaths) // paths to the resized images
    //  var params = {
    //     images_file: file,
    //     'classifier_ids':[`${endpoint}`]
    //   }
      // console.log('PARAMS', params);
      // console.log("FILE", file);
      // var visual_recognition = watson.visual_recognition({
      //   api_key: process.env.WATSON_API,
      //   version: 'v3',
      //   version_date: '2016-05-19',
      // })
      // visual_recognition.classify(params, function(err, response) {
      //   if (err)
      //   console.log('error', err);
      //   else
      //   console.log(JSON.stringify(response, null, 2))
      //   var resultTemp= [];
      //   let classesResponse = response.images[0].classifiers[0].classes;
      //   classesResponse.forEach(el=>{
      //     if(el.score > .60){
      //       resultTemp.push(el)
      //     }
      //   })
      //   let result = JSON.stringify(resultTemp, null, 2)
      //   console.log('RESULT', result);
      //   res.send(result)
      // })
    // }).catch((error) => {
    //  console.log('error 2', error);
  //  })//END OF CATCH STATEMENT OF RESIZE
 // })//END OF WRITE FILE
})//END OF POST



module.exports = router;
