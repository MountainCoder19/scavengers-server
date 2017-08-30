const express = require('express');
const router = express.Router();
const fs = require('fs');
const ffmpeg = require('../image-resizer/ffmpeg.js');
const resizer = require('../image-resizer/resizer.js')
require('dotenv').load();


router.get('/dontUSE', ()=>{
  // var key = require('./auth');
  var watson = require('watson-developer-cloud');


  var visual_recognition = watson.visual_recognition({
    api_key: process.env.WATSON_API,
    version: 'v3',
    version_date: '2016-05-19',
  });

  var params = {
    images_file: fs.createReadStream('./newImages/pearl-mall-boulder.jpg'),
    'classifier_ids':['clues_302663712','clues_1123435983','clues_174302206','clues_1384175267','clues_1436159940']
  };

  visual_recognition.classify(params, function(err, res) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(res, null, 2));
  });

  // visual_recognition.listClassifiers({},
  //   function(err, response) {
  //     if (err)
  //     console.log(err);
  //     else
  //     console.log(JSON.stringify(response, null, 2));
  //   }
  // );

})

router.post('/', (req,res,next)=>{
  const imgdata = req.body.data;
  const path = './temp/userimg.jpg'
  const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  fs.writeFile(path, base64Data, 'base64', (err, suc) => {
    let resizeImg = new resizer.Resizer(["./temp/userimg.jpg"])
      // console.log('command', command.resizer(["./temp/userimg.jpg"]));
      resizeImg.resize().then((data)=>{
        console.log(data);
      })
  });
})



module.exports = router;
