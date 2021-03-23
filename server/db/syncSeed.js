const { db, Student, Campus} = require('./index.js');

const faker = require('faker')

module.exports = async() => {
  try {
    await db.sync({force: true})
    const [ camp1, camp2, camp3, stu1, stu2, stu3] = await Promise.all([
      Campus.create({ name: `${faker.name.lastName()} University` , imageUrl: faker.image.imageUrl(), address: faker.address.streetAddress(), description: faker.lorem.paragraphs()}),
      Campus.create({ name: `${faker.name.lastName()} University` , imageUrl: faker.image.imageUrl(), address: faker.address.streetAddress(), description: faker.lorem.paragraphs()}),
      Campus.create({ name: `${faker.name.lastName()} University` , imageUrl: faker.image.imageUrl(), address: faker.address.streetAddress(), description: faker.lorem.paragraphs()}),
      Student.create({ firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.imageUrl(), gpa: faker.random.float({'min': 0.0, 'max': 4.0})}),
      Student.create({ firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.imageUrl(), gpa: faker.random.float({'min': 0.0, 'max': 4.0})}),
      Student.create({ firstName: faker.name.firstName(), lastName: faker.name.lastName(), email: faker.internet.email(), imageUrl: faker.image.imageUrl(), gpa: faker.random.float({'min': 0.0, 'max': 4.0})})
  
    ])
    stu1.campusId = camp1.id;
    stu2.campusId = camp1.id;
    stu3.campusId = camp2.id; 

    await Promise.all([
      stu1.save(),
      stu2.save(),
      stu3.save()
    ])
    
  } catch (error) {
    console.log(error)
  }
}