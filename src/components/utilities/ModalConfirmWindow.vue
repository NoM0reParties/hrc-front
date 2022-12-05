<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
    actionMessage: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <div class="screen">
    <div class="message">
      {{ message }}
      <div class="action__buttons">
        <button class="action__btn" @click="$emit('confirm')">
          {{ actionMessage }}
        </button>
        <button class="action__btn" @click="$emit('cancel')">Назад</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.727);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message {
  padding: 20px;
  border-radius: 15px;
  height: 30vh;
  width: 40vw;
  color: white;
  background-color: cadetblue;
  font-size: 26px;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}

.action__buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.action__btn {
  width: 150px;
  height: 50px;
  background-color: white;
  color: cadetblue;
  font-size: 26px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  margin: 0 30px;
  cursor: pointer;
}
</style>
