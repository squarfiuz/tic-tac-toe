import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("ttt", () => {
  const board = ref([[null, null, null], [null, null, null], [null, null, null]]);
  const type = ref(null);
  const turn = ref(false);
  const winner = ref(null);

  const set_type = function(new_type) {
    return type.value = new_type;
  };

  const set_board = function(new_board) {
    return board.value = new_board;
  };

  const update_board = function(row, value, _type) {
    return board.value[row][value] = _type;
  };

  const reset_board = function() {
    return board.value = [[null, null, null], [null, null, null], [null, null, null]];
  };

  const set_turn = function(new_turn) {
    return turn.value = new_turn;
  };

  const set_winner = function(new_winner) {
    return winner.value = new_winner;
  };

  const reset_winner = function() {
    return winner.value = null;
  };

  return { board, type, turn, winner, set_type, set_board, update_board, reset_board, set_turn, set_winner, reset_winner };
});
