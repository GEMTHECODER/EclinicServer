// app.js

const express = require('express');
const cors = require('cors');

//  for connection to mongodb
const connection = require('./config/mongodb');
connection();
//
const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());



// Mount the router
const bookrouter = require('./routes/api/bookRouter');
const doctorrouter = require('./routes/api/doctorRouter');
const schedulerouter = require('./routes/api/scheduleRouter');
const patientrouter = require('./routes/api/patientRouter');
const appointmentrouter = require('./routes/api/appointmentRouter');

app.use('/api/books',bookrouter);
app.use('/api/doctor',doctorrouter);
app.use('/api/doctor/schedule',schedulerouter);
app.use('/api/patient/',patientrouter);
app.use('/api/appointment/',appointmentrouter);





// app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));