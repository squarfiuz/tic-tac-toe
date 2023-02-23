<script setup>
import router from "@/router";
import socket_store from "@/stores/socket.js";
import ttt_store from "@/stores/ttt.js";

const socket = socket_store();
const ttt = ttt_store();

if (!socket.room_id) router.push({ name: "index" });

ttt.reset_board();
ttt.reset_winner();
ttt.set_turn(ttt.type === "o" ? true : false);

const add_case = function(row, value) {
  if (!ttt.turn || ttt.winner) return;
  if (ttt.board[row][value]) return;
  ttt.update_board(row, value, ttt.type);
  socket.socket.emit("next-turn", socket.room_id);
  ttt.set_turn(false);
  socket.socket.emit("new-board", socket.room_id, ttt.board);
};

socket.socket.on("new-board", board => {
  ttt.set_board(board);
});

socket.socket.on("next-turn", () => {
  ttt.set_turn(true);
});

socket.socket.on("end", result => {
  ttt.set_winner(result);
});
</script>

<template>
  <div v-if="!ttt.winner" class="turn-box">
    <span>{{ ttt.turn ? "It's your turn to play!" : "It's to the opponent to play!" }}</span>
  </div>
  <div v-else :class="`end-box ${ttt.winner === 'draw' ? 'draw' : ttt.winner === ttt.type ? 'win' : 'lose'}`">
    <span>{{ ttt.winner === "draw" ? "Partie nulle." : ttt.winner === ttt.type ? "You have won!" : "You have lost!" }}</span>
    <router-link :to="{ name: 'index' }" class="link">Back to home page</router-link>
  </div>
  <div class="game">
    <div class="grid">
      <div v-for="(i, ii) in ttt.board" :key="ii" :class="`row ${['zero', 'one', 'two'][ii]}`">
        <div v-for="(j, ij) in i" :key="ij" :class="`case ${ij} ${['zero', 'one', 'two'][ij]}`" @click="add_case(ii, ij)">
          <svg class="icon" v-if="j === 'o'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
          <svg class="icon" v-if="j === 'x'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.turn-box {
  background-color: rgb(35, 80, 177, 0.3);
  border: rgb(35, 80, 177) 2px solid;
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 50px;
}

.end-box {
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 50px;
}

.end-box span {
  margin-right: 10px;
}

.end-box.draw {
  background-color: rgb(35, 80, 177, 0.3);
  border: rgb(35, 80, 177) 2px solid;
}

.end-box.win {
  background-color: rgba(35, 177, 47, 0.3);
  border: rgb(35, 177, 47) 2px solid;
}

.end-box.lose {
  background-color: rgba(177, 35, 35, 0.3);
  border: rgb(177, 35, 35) 2px solid;
}

.link {
  color: #00bd7e;
  text-decoration: none;
  transition: 0.3s;
}

.link:hover {
  color: #00bd7e83;
}

.game {
  display: flex;
  justify-content: center;
}

.grid {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
}

.row.one {
  border-top: 4px solid white;
  border-bottom: 4px solid white;
  border-radius: 4px;
}

.case {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 100px;
  width: 100px;
}

.case.zero, .case.one {
  border-right: 2px solid white;
}

.case.one, .case.two {
  border-left: 2px solid white;
}

.icon {
  fill: white;
  height: 100%;
  width: 100%;
}
</style>