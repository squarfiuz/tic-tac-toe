<script setup>
import { ref } from "vue";
import router from "@/router";
import socket_store from "@/stores/socket.js";
import ttt_store from "@/stores/ttt.js";

const socket = socket_store();
const ttt = ttt_store();

const room_id = ref("");
const not_exist = ref(false);

const join_room = function() {
  socket.set_room_id(room_id.value);
  socket.socket.emit("join-room", room_id.value, "join");
};

socket.socket.on("room-not-exist", () => {
  not_exist.value = true;
  return setTimeout(() => {
    not_exist.value = false;
  }, 5000);
});

socket.socket.on("case-type", type => {
  ttt.set_type(type.join);
});

socket.socket.on("start", () => {
  router.push({ name: "game-play" });
});
</script>

<template>
  <main>
    <div v-if="not_exist" class="not-exist">
      <span>This game dosn't exist.</span>
    </div>
    <div class="container">
      <h1>Join a friend's game via their id!</h1>
      <div class="inputs">
        <input type="text" v-model="room_id" class="input" placeholder="Enter the ID of the party you want to join">
        <button @click="join_room()" class="button">Join</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.not-exist {
  background-color: rgba(177, 35, 35, 0.3);
  border: rgb(177, 35, 35) 2px solid;
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 50px;
}

.container {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  text-align: center;
}

.inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  width: 100%; 
}

.input {
  outline: none;
  border: 2px solid #00bd7e;
  color: #000;
  border-radius: 6px 0 0 6px;
  padding: 10px 15px;
  transition: 0.2s;
  width: 300px;
}

.button {
  cursor: pointer;
  border: 2px solid #00bd7e;
  background-color: #00bd7e;
  color: #fff;
  border-radius: 0 6px 6px 0;
  padding: 10px 25px;
  transition: 0.2s;
}

.button:hover {
  background-color: #00bd7e33;
}
</style>