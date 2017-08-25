
var watson = require('watson-developer-cloud');

var visual_recognition = watson.visual_recognition({
  api_key: process.env.WATSON_API,
  version: 'v3',
  version_date: '2016-05-19',
});

var fs = require('fs');

var params = {
  name: 'fruit',
  apple_positive_examples: fs.createReadStream('./apples.zip'),
    banana_positive_examples: fs.createReadStream('./yellow.zip'),
    orange_positive_examples: fs.createReadStream('./pos_ex.zip'),
  negative_examples: fs.createReadStream('./vegetables.zip')
};

visual_recognition.createClassifier(params,
  function(err, response) {
   	 if (err)
      		console.log(err);
    	 else
   		console.log(JSON.stringify(response, null, 2));
});
