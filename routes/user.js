const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/', (req, res, next)=>{
  knex('users')
    .select(['id','firstname', 'lastname', 'total_points'])
    .orderBy('total_points')
    .then((topUsers)=>{
      res.send(topUsers)
    })
})

router.get('/hunts/:id',(req, res, next)=>{
  console.log('working');
  let id = req.params.id;
  let result = [];
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
  // NOTE: MVP route
  knex('hunts')
    .select(['id', 'name', 'description', 'total_clues', 'total_points'])
    .where('id', 1)
    .then((hunt)=>{
      result.push(hunt[0]);
      knex('users')
      .select('firstname', 'lastname')
      .where('users.id', id)
      .then(username=>{
        result.push(username[0])
        console.log(result);
        res.send(result)
      })
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

router.patch('/:clue/?', (req, res, next)=>{
  let clue = req.params.clue;
  let userId = req.query.user
  knex('user_huntclue')
    .whereRaw(`clue_id = ${clue} AND user_id = ${userId}`)
    .update({
      completed: true
    })
    .returning('*')
    .then((data)=>console.log(data))
  res.send('in post with user id ')
})

router.delete('/:id', (req, res, next)=>{
  let id = req.params.id;
  res.send('in post with user id '+ id);
})

module.exports = router;
