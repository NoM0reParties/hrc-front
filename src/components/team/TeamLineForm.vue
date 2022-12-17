<script lang="ts">
import { defineComponent } from "vue";
import StringInput from "@/components/inputs/StringInput.vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    async nameChange(event: KeyboardEvent) {
      if (event !== undefined) {
        this.$emit("name", (event.target as HTMLInputElement).value);
      }
    },
  },
  components: {
    StringInput,
  },
});
</script>

<template>
  <div class="orders__item">
    <StringInput
      :height="70"
      :width="400"
      :initValue="name"
      :borderColor="'cadetblue'"
      @input="nameChange"
    />
    <span class="order__item-col">
      <button class="save__btn" @click="$emit('save')">OK</button
      ><button class="close__btn" @click="$emit('cancel')">X</button>
    </span>
  </div>
</template>

<style scoped>
.orders__item {
  position: relative;
  height: 70px;
  font-weight: 600;
  font-size: large;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order__item-col {
  position: relative;
  text-align: center;
  font-size: normal;
  font-weight: 400;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save__btn {
  width: 55px;
  height: 40px;
  margin-right: 10px;
  margin-left: 50px;
  border-radius: 15px;
  border: none;
  background-color: white;
  color: cadetblue;
  cursor: pointer;
}

.close__btn {
  width: 55px;
  height: 40px;
  border-radius: 15px;
  border: none;
  background-color: rgb(184, 223, 224);
  color: white;
  cursor: pointer;
}
</style>
