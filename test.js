const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const sequelize = new Sequelize('example', 'postgres', '110140', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
const Op = sequelize.Op
const user = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  bloodType: {
    type: Sequelize.ENUM('A-', 'A+', 'B-', 'B+', 'O-', 'O+', 'AB-', 'AB+')
  },
  birthday: {
    type: Sequelize.DATEONLY
  },
  username: {
    type: Sequelize.STRING
  },
  underlyingDisease: {
    type: Sequelize.STRING
  },
  drugAllergy: {
    type: Sequelize.STRING
  },
  citizenId: {
    type: Sequelize.STRING
  }
});

console.log(user);

// force: true will drop the table if it already exists
// user.sync({force: true}).then(() => {
//   // Table created
//   return console.log("User table created.")
// });

app.get('/',(req,res) => res.json({status: "hello"}))

app.get('/users/all', (req, res) => {
  user.findAll().then(a => {
    console.log(a)
    res.json({ status: "Success!", data: a })
  }).catch(e => {
    res.json({ status: "Error." })

  })
})

app.post('/users/create', (req, res) => {
  user.create(req.body).then(() => {
    res.json({ status: "success!" })
  }).catch(e => {
    res.json({ status: "Error." })
  })
});

const id = 35
app.get(`/users/${id}`,(req,res) => {
  user.findById(id).then(b => {
    console.log(b)
    res.json({ status: "Here is your profile!",data: b})
  }).catch(e => {
    res.json({ status: "Invalid ID or you are not registed!"})
  })
})

//to delete data.
// user.bulkCreate([
//   {subject: 'programming', status: 'executing'},
//   {subject: 'reading', status: 'executing'},
//   {subject: 'programming', status: 'finished'}
// ]).then(() => {
//   return user.destroy({
//     where: {
//       firstName: 'John'
//     },
//     truncate: true /* this will ignore where and truncate the table instead */
//   });
// }).then(affectedRows => {
//   // affectedRows will be 2
//   return user.findAll();
// }).then(tasks => {
//   console.log(tasks) // no programming, just reading :(
// })

//Binding the server to a port(3000)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

