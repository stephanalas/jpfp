const db = require('./db');
const { Model, DataTypes } = require('sequelize');

class Campus extends Model {}


Campus.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty:{
        msg: 'Campus name cannot be empty'
      }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: 'image not found'
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: {
          msg : 'address cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    }

},{sequelize:db, modelName:'campuses'})


class Student extends Model {}

Student.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'First name cannot be empty'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Last name cannot be empty'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'must be a valid Email'
      },
      notEmpty: {
        msg: 'E-mail cannot be empty'
      }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'image not found'
  },
  gpa: {
    type: DataTypes.FLOAT,
    // allowNull: false,
    validate: {
      isFloat: true,
      min: 0.0,
      max: 4.0
    }
  }
}, {sequelize:db, modelName:'students'})

module.exports = {
  Student

}


Student.belongsTo(Campus);
Campus.hasMany(Student);


module.exports = {
  Student, Campus

}
