const { Sequelize, Model, DataTypes } = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/jpfp-db');
const faker = require('faker');
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

const syncSeed = async() => {
  try {
    await db.sync({force: true})
    await Promise.all([
      Campus.create({ name: `${faker.name.lastName()} University` , imageUrl: faker.image.imageUrl(), address: faker.address.streetAddress(), description: faker.lorem.paragraphs()}),
      Campus.create({ name: `${faker.name.lastName()} University` , imageUrl: faker.image.imageUrl(), address: faker.address.streetAddress(), description: faker.lorem.paragraphs()}),
      Campus.create({ name: `${faker.name.lastName()} University` , imageUrl: faker.image.imageUrl(), address: faker.address.streetAddress(), description: faker.lorem.paragraphs()}),
      Student.create({ firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.imageUrl(), gpa: faker.random.float({'min': 0.0, 'max': 4.0})}),
      Student.create({ firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.imageUrl(), gpa: faker.random.float({'min': 0.0, 'max': 4.0})}),
      Student.create({ firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.imageUrl(), gpa: faker.random.float({'min': 0.0, 'max': 4.0})})
  
    ])
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  syncSeed, db, models: { Campus, Student}

}