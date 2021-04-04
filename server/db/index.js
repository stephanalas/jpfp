// const { Student } = require('./models/Student');
// const { Campus } = require('./models/Campus');

// const db = require('./models/');

// Student.belongsTo(Campus);
// Campus.hasMany(Student);


// module.exports = {
//   db, Student, Campus

// }
const db = require('./db')
const { Student, Campus } =  require('./models.js');

module.exports = {
  db, Student, Campus
}