const express=require('express');
const app=express();

const PORT=9000;

app.get('/movies',(req, res)=>{
    res.send("All Movies Data in JSON format from Mongo DB");

})
app.get('/genres', (req, res) => {
    res.send("All Genres Data in JSON format from Mongo DB");
})
app.get('/artists', (req, res) => {
    res.send("All Artists Data in JSON format from Mongo DB");

})

app.listen(PORT, () => {
    console.log(`server start listening to  port ${PORT}`);
});