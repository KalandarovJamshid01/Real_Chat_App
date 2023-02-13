
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  let user = users.find((user) => user.userId === userId);
  return user;
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and get message

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessages", {
      senderId,
      text,
    });
  });

  socket.on("sendNotify", ({ receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(user.socketId);
    io.to(user?.socketId).emit("getNotify", {
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnect");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
