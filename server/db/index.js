const { Student } = require('./models/Student');
const { Campus } = require('./models/Campus');

const db = require('./models/');

Student.belongsTo(Campus);
Campus.hasMany(Student);


module.exports = {
  db, Student, Campus

}