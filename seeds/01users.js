
exports.seed = function(knex, Promise) {
  return knex('users')
  .del()
    .then(function () {
      return knex('users').insert([{
        id:1,
        firstname:"Brennen",
        lastname: "Bull",
        accessToken:"EAASUE14fO4kBAEUChBVQcOZARHwmlyve3E3sALTTIO1koH7qgW4W7nWG0IStc0e5pmMTICeCBhhl4JRmhEmr1ZBkhbH3XfL3M55l3P5GTB25fhUTZBY3pOJzsjsj7a53FAwlMlvZB9fBCJTvSAQvzoQqjKT8mfRQb3yZCgFkarrTxbVeyFdNvSkMtDZCbYRJb2Rwqer4Am7QZDZD",
        total_points:8,
        email: "brennenbull@hotmail.com"
      },
      {id: 2,
      firstname: "Elizabeth",
      lastname: "Flournoy",
      accessToken:" EAASUE14fO4kBADVt7BCbDJlAUQMZBq3e2ZA6Wcw3jViarZC8OqRzmJDj8IRJSng9OX0RSAJT5zz8NN2zQwctPzkHKl3c4Y6RBZAhb9n3IxzbcZAd3qZA22TcR7VIewyvazYgytrpihDqYvTDKCDoRPpvk73yoq5JOSpr7uKKwAdh85LoBwT00runM3dH5EwroCfbcms8xP9QZDZD",
      total_points:10,
      email: "bflournoy@gmail.com"},
      {id: 3,
      firstname: "Jodie",
      lastname: "Rigali",
      accessToken: "EAASUE14fO4kBAHQYgb6ZCrlC74P6zH6eWttirQcukkN9EWrwU6nHa83byD7Hgi0cZChwZBjRRLZCd9ZB5r7ammdXfYlZBEbZADAqZB461KaMXhCpeWnwDVIanLNCTW0ES9kqCrLt9DcOmle7Pc5r6TQgdTy69T19H6QnTRkxehZCQyx6XxTErjIEGfzWepDFKku6YNaqlXqhN4gZDZD",
      total_points:6,
      email: "jmrigali@ymail.com"},
      {id: 4,
      firstname: "Ramsey",
      lastname: "Bolton",
      accessToken: "123",
      total_points: -1000,
      email: "dogMeat@winterfell.com"},
      {id: 5,
      firstname: "Hodor",
      lastname: "Hodor",
      accessToken: "1234",
      total_points: 100,
      email: "hodor@holdthedoor.com"},
      {id: 6,
      firstname: "Cersei",
      lastname: "Lanister",
      accessToken: "12345",
      total_points: -666,
      email: "president@jamiefanclub.com"}
    ]);
    }).then(function(){
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
