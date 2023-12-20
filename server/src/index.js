const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;
const dbConnection = require('./config/dbConnection');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const userRoutes = require('./routes/userRoute');
const chatRoutes = require('./routes/chatRoute');
const messageRoutes = require('./routes/msgRoute');
const categoryRoutes = require('./routes/categoryRoute')

const app = express();
dbConnection();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsOptions));

// ROUTEING
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/category', categoryRoutes);

// MIDDLEWARE 
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`.yellow.italic);
});

// const server = app.listen(port, () => {
//   console.log(`Server started on port ${port}`.yellow.italic);
// });

// const io = require('socket.io')(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: '*',
//   },
// });

// io.on('connection', (socket) => {
//   console.log('Connected to socket.io');

//   socket.on('setup', (userData) => {
//     socket.join(userData._id);
//     socket.emit('connected');
//   });

//   socket.on('join chat', (room) => {
//     socket.join(room);
//     console.log('User Joined Room: ' + room);
//   });

//   socket.on('typing', (room) => socket.in(room).emit('typing'));
//   socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

//   socket.on('new message', (newMessageReceived) => {
//     var chat = newMessageReceived.chat;

//     if (!chat.users) return console.log('chat.users not defined');

//     chat.users.forEach((user) => {
//       if (user._id == newMessageReceived.sender._id) return;

//       socket.in(user._id).emit('message recieved', newMessageReceived);
//     });
//   });

//   socket.off('setup', () => {
//     console.log('USER DISCONNECTED');
//     socket.leave(userData._id);
//   })
// });