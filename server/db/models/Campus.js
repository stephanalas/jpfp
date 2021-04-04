const { Model, DataTypes } = require('sequelize');
const db = require('./index')
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


module.exports = {
  Campus

}