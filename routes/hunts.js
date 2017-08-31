const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/:id/?', (req, res, next)=>{
  let huntId = req.params.id;
  let userId = req.query.user;
  console.log('in get', userId);
  knex('user_huntclue')
    .select('*')
    .whereRaw(`hunt_id = ${huntId} AND user_id = ${userId}`)
    .join('hunts','user_huntclue.hunt_id', '=','hunts.id')
    .select('description')
    .orderBy('clue_id')
    .then((clues)=>{
      if(clues.length == 0){
        knex('hunt_clues')
        .select('clue_id')
        .where('hunt_id',huntId)
        .then((clueIDs) => {
          clueIDs.forEach(ele =>{
            ele.completed = false;
            ele.user_id = userId;
            ele.hunt_id = parseInt(huntId);
            knex('user_huntclue')
            .insert(ele)
            .returning('*')
            .then(g =>{
              console.log('new user forEach ', g)
            })
          })
        }).then(setTimeout(function () {
          knex('user_huntclue')
          .select('*')
          .whereRaw(`hunt_id = ${huntId} AND user_id = ${userId}`)
          .join('hunts','user_huntclue.hunt_id', '=','hunts.id')
          .select('description')
          .orderBy('clue_id')
          .then(newClues=>{
            console.log('new user', newClues);
            res.send(newClues)
          })
        }, 100)
      )
      }else{
        console.log('old user');
        res.send(clues)
      }
    })
})

router.get('/clues/:id', (req, res, next)=>{
  let id = req.params.id;
  knex('clues')
    .select('description', 'photo_url', 'photo_class')
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
