const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// replace DB with process.env.DATABASE_LOCAL for local database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful');
  });

/* Create Document Example
const testUser = new User({
  name: 'sorawit nuankamma',
  lineId: 'notlinexdd',
  email: 'sorawit.nu@ku.th',
  classroom: [
    {
      classId: 1,
      role: 'owner',
    },
  ],
});

testUser
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('ERROR :', err);
  });

*/

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
