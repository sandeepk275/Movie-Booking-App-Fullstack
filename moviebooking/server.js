const express=require('express');
const cors=require('cors');

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT=8085;

//cors
const corsoptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,

}
app.use(cors(corsoptions));



// database connection..............
const db = require("./models/index");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");

    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
});


require('./routes/user.routes')(express, app);
require('./routes/artist.routes')(express, app);
require('./routes/genre.routes')(express, app);
require('./routes/movie.routes')(express, app);

app.listen(PORT, () => {
    console.log(`server start listening to  port ${PORT}`);
});