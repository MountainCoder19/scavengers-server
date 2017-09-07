const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/:id/?', (req, res, next)=>{
  console.log('made this route');
  let huntId = req.params.id;
  let userId = req.query.user;
  knex('user_huntclue')
    .select('*')
    .whereRaw(`hunt_id = ${huntId} AND user_id = ${userId}`)
    .join('hunts','user_huntclue.hunt_id', '=','hunts.id')
    .select('name')
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
            res.send(newClues)
          })
        }, 1000)
      ).catch(err=>{console.error('Error',err)})
      }else{
        res.send(clues)
      }
    }).catch(err=>{console.error('Error:', err)})
})

router.get('/clues/:id', (req, res, next)=>{
  let id = req.params.id;
  knex('clues')
    .select('description', 'photo_url', 'photo_class')
    .where('id', id)
    .then((clues)=>{
      res.send(clues[0])
    })
    .catch(err=>{console.error(err)})
})

router.get('/userhuntclue/:id', (req,res,next)=>{
  let id= req.params.id;
  knex('user_huntclue')
  .select('completed')
  .whereRaw(`hunt_id = 1 AND user_id = ${id}`)
  .then(data=>{
    res.send(data)
  })
  .catch(err=>{
    console.error('ERROR', err)
  })


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
