// database.js
const mongoose = require('mongoose');

// Connect to the MongoDB database // 1 way
//import with, connection
// mongoose.connect('mongodb://127.0.0.1:27017/eclinic', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to the database');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to the database:', error);
//   });


// module.exports = mongoose.connection;

  //connect to MongdoBD using another way
  // import with, connection()
  const connection =async function (){
  mongoose.connect('mongodb://127.0.0.1:27017/eclinic', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.error('Failed to connect to the database:', error);
    });
}

module.exports = connection;