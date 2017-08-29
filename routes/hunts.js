const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/:id', (req, res, next)=>{
  let id = req.params.id;
  knex('hunt_clues')
    .select('clue_id', 'description', 'photo_url')
    .where('hunt_id', id)
    .join('clues','hunt_clues.clue_id', '=','clues.id')
    .then((clues)=>{
      res.send(clues)
    })
})
router.post('/:id', (req, res, next)=>{
  let id = req.params.id;
  res.send('in post with user id '+ id);
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
