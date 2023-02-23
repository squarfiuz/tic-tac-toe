const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: ["http://localhost:5173"]
  }
});

io.on("connection", socket => {
  socket.on("join-room", (room, type) => {
    console.log(io.sockets.adapter.rooms);
    if (type === "join" && !io.sockets.adapter.rooms.has(room)) return socket.emit("room-not-exist"); 
    socket.join(room);
    if (type === "join") {
      const types = ["o", "x"];
      const random = Math.floor(Math.random() * types.length);
      io.to(room).emit("case-type", { create: types[random], join: types[random === 0 ? 1 : 0] });
      io.to(room).emit("start", room);
    }
  });

  socket.on("next-turn", (room) => {
    socket.to(room).emit("next-turn");
  });

  socket.on("new-board", (room, board) => {
    socket.to(room).emit("new-board", board);
    const result = checkWin(board);
    if (result) io.to(room).emit("end", result);
  });
});

const checkWin = function(board) {
  const check = (a, b, c) => a === b && b === c;
  const rowCol = (() => {
    for (let i = 0; i < board.length; i++) {
      if (check(...board[i])) return board[i][0];
      if (check(board[0][i], board[1][i], board[2][i])) return board[0][i];
    }
  })();
  if (rowCol) return rowCol;

  const diag = (() => {
    if (check(board[0][0], board[1][1], board[2][2])) return board[0][0];
    if (check(board[0][2], board[1][1], board[2][0])) return board[0][2];
  })();
  if (diag) return diag;
  if (board.every(row => row.every(value => value !== null))) return "draw";
  return false;
};

io.listen(3000);