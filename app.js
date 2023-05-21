// app.js

const express = require('express');
//  for connection to mongodb
const connection = require('./config/mongodb');
connection();
//
const app = express();
app.use(express.json());


// Mount the router
const bookrouter = require('./routes/api/bookRouter');
const doctorrouter = require('./routes/api/doctorRouter');
const schedulerouter = require('./routes/api/scheduleRouter');
const patientrouter = require('./routes/api/patientRouter');
app.use('/api/books',bookrouter);
app.use('/api/doctor',doctorrouter);
app.use('/api/doctor/schedule',schedulerouter);
app.use('/api/patient/',patientrouter);





// app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));