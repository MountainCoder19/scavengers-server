const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/:id', (req, res, next)=>{
  let id = req.params.id;
  knex('user_huntclue')
    .select('clue_id', 'completed')
    .where('hunt_id', id)
    .join('hunts','user_huntclue.hunt_id', '=','hunts.id')
    .select('description')
    .then((clues)=>{
      console.log(clues)
      res.send(clues)
    })
})

router.get('/clues/:id', (req, res, next)=>{
  let id = req.params.id;
  knex('clues')
    .select('description')
    .where('id', id)
    .then((clues)=>{
      res.send(clues[0])
    })
})

router.post('/', (req, res, next)=>{
  // const imgdata = req.body.data;
  // const path = './temp/userimg.jpg'
  // const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  // fs.writeFile(path, base64Data, 'base64', (err, suc) => {
  //     console.log(suc);
  // });
  // var buffer = new Buffer(req.body.data, 'base64');
  // console.log(buffer);
})
router.patch('/:id', (req, res, next)=>{
  let id = req.params.id;
  res.send('in patch with user id '+ id);
})
router.delete('/:id', (req, res, next)=>{
  let id = req.params.id;
  res.send('in delete with user id '+ id);
})

module.exports = router;
