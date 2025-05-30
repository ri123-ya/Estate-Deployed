// import { Server } from "socket.io";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();


// app.use(cors(
//   { origin: process.env.CLIENT_URL,
//      credentials: true 
//   }));
const corsOptions = {
  origin: process.env.CLIENT_URL, // Frontend URL
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

app.use(cors(corsOptions)); // Enable CORS with options



app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
