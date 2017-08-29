const express = require('express');
const router = express.Router();
// require('dotenv').load();
// var fs = require('fs');
// // var key = require('./auth');
// var watson = require('watson-developer-cloud');
//
//
// var visual_recognition = watson.visual_recognition({
//   api_key: process.env.WATSON_API,
//   version: 'v3',
//   version_date: '2016-05-19',
// });
//
// var params = {
//   images_file: fs.createReadStream('./newImages/pearl-mall-boulder.jpg'),
//   'classifier_ids':['clues_302663712','clues_1123435983','clues_174302206','clues_1384175267','clues_1436159940']
// };
//
// visual_recognition.classify(params, function(err, res) {
//   if (err)
//     console.log(err);
//   else
//     console.log(JSON.stringify(res, null, 2));
// });
//
// // visual_recognition.listClassifiers({},
// //   function(err, response) {
// //     if (err)
// //     console.log(err);
// //     else
// //     console.log(JSON.stringify(response, null, 2));
// //   }
// // );


module.exports = router;
