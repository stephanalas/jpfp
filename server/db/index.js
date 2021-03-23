const { Sequelize, Model, DataTypes } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/jpfp-db');
class Campus extends Model {}
class Student extends Model {}


Campus.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
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
        notEmpty: true,
        notNull: true
      }
    },
    description: {
      type: DataTypes.TEXT
    }

},{sequelize:db, modelName:'campuses'})

Student.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notNull: true,
      notEmpty: true
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'image not found'
  },
  gpa: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0.0,
      max: 4.0
    }
  }
}, {sequelize:db, modelName:'students'})

Student.belongsTo(Campus);
Campus.hasMany(Student);


module.exports = {
  db,  Student, Campus

}