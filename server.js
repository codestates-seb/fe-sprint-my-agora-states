const http = require('http');
const app = require("./app");

const mainPage = require('./routes/mainPage');
const mainBoard = require('./routes/mainBoard');

app.get("/", (req, res)=> {
    res.sendFile(__dirname + '/public/Route/MainPage/MainPage.html');
})

app.get("/board", (req, res)=>{
    res.sendFile(__dirname + '/public/Route/MainBoard/MainBoard.html');
})

// app.use('/', mainPage);
// app.use('/board', mainBoard);

const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log("run on Server http://localhost:3000");
});