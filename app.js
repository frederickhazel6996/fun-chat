require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
const { addUser, removeUser, getUser, getUsersInRoom } = require("./extra");
var debug = require("debug")("chat-room:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
console.log(port);
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("User connected to sockets");
    socket.on("join", ({ name, room, id }, callback) => {
        const { error, user, rejoin } = addUser({ id: socket.id, name, room, user_id: id });
        const usersInroom = getUsersInRoom(room.trim().toLowerCase());
        // console.log(error);
        if (error) return callback(error);

        if (user) {
            socket.emit("message", { user: "Moderator", text: `${user.name} welcome to ${user.room}`, users: usersInroom });
            socket.broadcast.to(user.room).emit("message", { user: "Moderator", text: `${user.name} has joined the chat`, users: usersInroom });
            socket.join(user.room);
        }

        if (rejoin) {
            socket.emit("message", { user: "Moderator", text: `${rejoin.name} welcome Back`, users: usersInroom });
            socket.broadcast
                .to(rejoin.room)
                .emit("message", { user: "Moderator", text: `${rejoin.name} has re-joined the chat`, users: usersInroom });
            socket.join(rejoin.room);
        }
        callback();
    });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit("message", { user: user.name, text: message });

        callback();
    });
    socket.on("closechat", () => {
        console.log("close chat");
        socket.disconnect();
    });
    try {
        socket.on("disconnect", () => {
            const user = getUser(socket.id);

            io.to(user.room).emit("message", { user: "Moderator", text: `${user.name} has left the chat` });
            console.log("user disconnected");
        });
    } catch (e) {
        console.log(e);
    }
});
/**
 * Normalize a port into a number, string, or false.
 */

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
