const app = require('./app');
const syncSeed = require('./db/syncSeed');
const { db } = require('./db/index')

const init = () => {
  // syncSeed()
  db.sync({force: true})
  const port = process.env.PORT || 3000;

  app.listen(port, () => console.log(`app is listening on port: ${port}`));
}

init();