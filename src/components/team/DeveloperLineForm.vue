team-loadteam-loadteam-load
<script lang="ts">
import { defineComponent } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import NumberInput from "../inputs/NumberInput.vue";
import StringInput from "../inputs/StringInput.vue";

export default defineComponent({
  props: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    involvement: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async firstNameChange(event: KeyboardEvent) {
      if (event !== undefined) {
        this.$emit("first", (event.target as HTMLInputElement).value);
      }
    },
    async lastNameChange(event: KeyboardEvent) {
      if (event !== undefined) {
        this.$emit("last", (event.target as HTMLInputElement).value);
      }
    },
    async invChange(involvement: number) {
      this.$emit("involvement", involvement);
    },
  },
  components: {
    NumberInput,
    StringInput,
  },
});
</script>

<template>
  <div class="orders__item">
    <span class="order__item-col"
      ><StringInput :initValue="firstName" @input="firstNameChange"
    /></span>
    <span class="order__item-col"
      ><StringInput :initValue="lastName" @input="lastNameChange"
    /></span>
    <span class="order__item-col"
      ><NumberInput :initValue="involvement" @input="invChange"
    /></span>
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
  border-radius: 15px;
  border: none;
  background-color: cadetblue;
  color: white;
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
