
exports.seed = function(knex, Promise) {
  return knex('users')
  .del()
    .then(function () {
      return knex('users').insert([{
        id:1,
        firstname:"Brennen",
        lastname: "Bull",
        accessToken:"EAASUE14fO4kBAEUChBVQcOZARHwmlyve3E3sALTTIO1koH7qgW4W7nWG0IStc0e5pmMTICeCBhhl4JRmhEmr1ZBkhbH3XfL3M55l3P5GTB25fhUTZBY3pOJzsjsj7a53FAwlMlvZB9fBCJTvSAQvzoQqjKT8mfRQb3yZCgFkarrTxbVeyFdNvSkMtDZCbYRJb2Rwqer4Am7QZDZD",
        email: "brennenbull@hotmail.com"
      }]);
    }).then(function(){
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
