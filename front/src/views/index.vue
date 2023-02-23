<script setup>
import socket_store from "@/stores/socket.js";

const socket = socket_store();
</script>

<template>
  <main>
    <div class="container">
      <h1>Play tic-tac-toe online with a friend!</h1>
      <div class="buttons">
        <router-link :to="{ name: 'game-create' }" class="button">Create</router-link>
        <router-link :to="{ name: 'game-join' }" class="button">Join</router-link>
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
  background-color: #00bd7e;
  color: #fff;
  border-radius: 6px;
  padding: 10px 25px;
  margin: 0 20px;
  transition: 0.2s;
}

.button:hover {
  background-color: #00bd7e33;
}
</style>
