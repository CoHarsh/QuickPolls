const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const cookieParser = require('cookie-parser');

// import routes
const router = require('./Router');


const app = express();
const PORT = process.env.PORT || 1337;

// create the express middleware
app.use(bodyParser.json());
// allowonly localhost:5500

// access control allow origin

app.use(cors({ 
    origin: true, 
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// routes
app.use('/api', router);




// error handling middleware  
app.use((err, req, res, next) => {     
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({ message: message, data: data });
});  


const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};


start();
