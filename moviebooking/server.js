const express=require('express');
const app=express();

const PORT=9000;


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



app.get('/movies',(req, res)=>{
    res.send("All Movies Data in JSON format from Mongo DB");
})
app.get('/genres', (req, res) => {
    res.send("All Genres Data in JSON format from Mongo DB");
})
app.get('/artists', (req, res) => {
    res.send("All Artists Data in JSON format from Mongo DB");

})


require('./routes/user.routes')(express, app);

app.listen(PORT, () => {
    console.log(`server start listening to  port ${PORT}`);
});