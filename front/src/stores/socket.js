import { ref } from "vue";
import { defineStore } from "pinia";
import { io } from "socket.io-client";

export default defineStore("socket", () => {
  const socket = io("ws://localhost:3000");
  const room_id = ref("");

  const set_room_id = function(id) {
    return room_id.value = id;
  };

  return { socket, room_id, set_room_id };
});
