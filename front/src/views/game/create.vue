<script setup>
import router from "@/router";
import socket_store from "@/stores/socket.js";
import ttt_store from "@/stores/ttt.js";

const socket = socket_store();
const ttt = ttt_store();

const room_id = Date.now().toString();

socket.set_room_id(room_id);

socket.socket.emit("join-room", room_id, "create");

const copy_room_id = function() {
  navigator.clipboard.writeText(room_id);
};

socket.socket.on("case-type", type => {
  ttt.set_type(type.create);
});

socket.socket.on("start", () => {
  router.push({ name: "game-play" });
});
</script>

<template>
  <main>
    <div class="container">
      <h1>Voici l'identifiant de la partie {{ room_id }}. Partagez le avec vos amis pour qu'ils rejoignent la partie !</h1>
      <div class="buttons">
        <button @click="copy_room_id();" class="button">Copier l'identifiant</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  text-align: center;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  width: 100%; 
}

.button {
  cursor: pointer;
  border: 2px solid #00bd7e;
  background-color: #00bd7e;
  color: #fff;
  border-radius: 6px;
  padding: 10px 25px;
  transition: 0.2s;
}

.button:hover {
  background-color: #00bd7e33;
}
</style>