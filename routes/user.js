const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/hunts/:id',(req, res, next)=>{
  let id = req.params.id;
  // NOTE: route for user specific hunts
  // knex('hunt_users')
  //   .select('*')
  //   .where('user_id', id)
  //   .then((userHunts)=>{
  //     knex('hunts')
  //       .select(['id', 'name', 'description', 'total_clues', 'total_points'])
  //       .where('id', userHunts[0].hunt_id)
  //       .then((hunt)=>{
  //         res.send(hunt);
  //       })
  //   })
  // NOTE: MVP rout
  knex('hunts')
    .select(['id', 'name', 'description', 'total_clues', 'total_points'])
    .where('id', 1)
    .then((hunt)=>{
      res.send(hunt)
    })
})

router.post('/', (req, res, next)=>{
  knex('users')
    .select('*')
    .where('email', req.body.email)
    .then((user)=>{
      if(!user.length){
        knex('users')
          .insert(req.body, '*')
          .then((newUser)=>{
            res.send(newUser[0]);
          });
      }else{
        res.send(user[0]);
      }
    });
})

router.patch('/:clue', (req, res, next)=>{
  let clue = req.params.clue;
  console.log('clue ', clue)
  knex('user_huntclue')
    .where('clue_id', clue)
    .update({
      completed: true
    })
    .returning('*')
    .then((data)=>console.log(data))
  res.send('in post with user id ');
})

router.delete('/:id', (req, res, next)=>{
  let id = req.params.id;
  res.send('in post with user id '+ id);
})

module.exports = router;
