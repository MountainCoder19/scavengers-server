const express = require('express');
const router = express.Router();
const fs = require('fs');
const ffmpeg = require('../image-resizer/ffmpeg.js');
// const resizer = require('../image-resizer/resizer.js')
require('dotenv').load();
const watson = require('watson-developer-cloud');
const resizer = require('../image-resizer/resizer');


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
router.post('/', (req,res,next)=>{

  const imgdata = req.body.data;
  const path = './temp/userimg.jpg'
  const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');

  fs.writeFile(path, base64Data, 'base64', (err, suc) => {
    const filePathsToResize = ["./temp/userimg.jpg"] // it can be just one, but still has to be an array, you can give it all of your images, it will just spit out images that are already below the configured max size (2MB) without doing any processing, so no need to check on your end
    const Resizer = new resizer.Resizer(filePathsToResize)
    // use the Resizer.resize() method as a simple promise
    Resizer.resize().then((filePaths) => {
     console.log(filePaths) // paths to the resized images
     var params = {
        images_file: fs.createReadStream(filePaths[0]),
        'classifier_ids':['clues_302663712','clues_1123435983','clues_174302206','clues_1384175267','clues_1436159940']
      }
      var visual_recognition = watson.visual_recognition({
        api_key: process.env.WATSON_API,
        version: 'v3',
        version_date: '2016-05-19',
      })
      let result;
      visual_recognition.classify(params, function(err, response) {
        if (err)
        console.log('error', err);
        else
        result=JSON.stringify(response, null, 2)
        // console.log(JSON.stringify(res, null, 2))
        res.send(result)
      })
    }).catch((error) => {
     console.log('error 2', error);
   })
  })




})



module.exports = router;
