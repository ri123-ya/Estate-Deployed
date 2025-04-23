// import { Server } from "socket.io";
// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoute from "./routes/auth.route.js";
// import postRoute from "./routes/post.route.js";
// import testRoute from "./routes/test.route.js";
// import userRoute from "./routes/user.route.js";
// import chatRoute from "./routes/chat.route.js";
// import messageRoute from "./routes/message.route.js";

// const app = express();
// import dotenv from 'dotenv';
// dotenv.config();


// app.use(cors(
//   { origin: process.env.CLIENT_URL,
//      credentials: true 
//   }));
// app.use(express.json());
// app.use(cookieParser());


// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/test", testRoute);
// app.use("/api/chats", chatRoute);
// app.use("/api/messages", messageRoute);

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const io = new Server(server, {
//   cors: {
//     origin: process.env.CLIENT_URL,  // Allow the client URL
//     methods: ["GET", "POST"],        // Allowed HTTP methods
//     credentials: true                // Allow credentials like cookies
//   }
// });

// // Socket.IO connection handler
// io.on("connection", (socket) => {
//   console.log("A user connected");
//   // Your socket events go here
//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });
// // app.listen(8800, () => {
// //   console.log("Server is running!");
// // });

import { Server } from "socket.io"; // Importing Socket.IO
import express from "express"; // Importing Express
import cors from "cors"; // Importing CORS
import cookieParser from "cookie-parser"; // Importing cookie parser
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

// Creating an Express app
const app = express();
import dotenv from 'dotenv';
dotenv.config();

// Middleware for CORS (to allow cross-origin requests)
app.use(cors({
  origin: process.env.CLIENT_URL,  // Allow the client URL (coming from environment variables)
  credentials: true                // Allow credentials like cookies
}));

// Middleware for JSON parsing and cookie handling
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Create the server with Express and listen on the desired port
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Now, we attach Socket.IO to this same server object
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,  // Allow the client URL
    methods: ["GET", "POST"],        // Allow GET and POST methods for Socket.IO
    credentials: true                // Allow credentials like cookies
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle events on the socket
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
