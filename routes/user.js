const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/',(req, res, next)=>{
  res.send({'message': 'in get'} );
})

router.post('/', (req, res, next)=>{
  console.log(req.body);
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

router.patch('/:id', (req, res, next)=>{
  let id = req.params.id;
  res.send('in post with user id '+ id);
})

router.delete('/:id', (req, res, next)=>{
  let id = req.params.id;
  res.send('in post with user id '+ id);
})

module.exports = router;
