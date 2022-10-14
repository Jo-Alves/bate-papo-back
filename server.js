require("dotenv").config()

const express = require("express")
const passport = require("passport")
const cors = require("cors")
const socketio = require("socket.io")
const http = require("http")

const loginRouter = require("./app/routes/login-router")
const userRouter = require("./app/routes/user-router")
const contactRouter = require("./app/routes/contact-router")
const messageRouter = require("./app/routes/message-router")

const app = express()
app.use(cors())
app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const server = http.createServer(app)
const io = socketio(server, {
    cors: "*"
})

io.on('connection', function(socket) {
    // console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        console.log(data)
        io.emit('MESSAGE', data)
    });
});

app.use("/", loginRouter)
app.use("/contact", contactRouter)
app.use("/user", userRouter)
app.use("/message", messageRouter)
const port = process.env.PORT || 3000 

app.use(passport.initialize());
require("./config/passport")(passport);

server.listen(port, () => {
    console.log("Servidor rodando com sucesso...")
})