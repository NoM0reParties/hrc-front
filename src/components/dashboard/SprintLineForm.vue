<script lang="ts">
import { defineComponent } from "vue";
import StringInput from "@/components/inputs/StringInput.vue";
import NumberInput from "@/components/inputs/NumberInput.vue";
import Datepicker from "@vuepic/vue-datepicker";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    gap: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async nameChange(event: KeyboardEvent) {
      if (event !== undefined) {
        this.$emit("name", (event.target as HTMLInputElement).value);
      }
    },
    async gapChange(event: KeyboardEvent) {
      if (event !== undefined) {
        this.$emit("gap", (event.target as HTMLInputElement).value);
      }
    },
  },
  data() {
    return {
      sprintBeginningDate: Date,
      sprintEndingDate: Date,
    };
  },
  components: {
    StringInput,
    Datepicker,
    NumberInput,
  },
});
</script>

<template>
  <div class="sprint__form">
    <span class="order__item-col"
      ><p>Название спринта</p>
      <StringInput
        :height="50"
        :width="300"
        :initValue="name"
        :borderColor="'#ddd'"
        @input="nameChange"
    /></span>
    <span class="order__item-col"
      ><p>Начало</p>
      <Datepicker v-model="sprintBeginningDate"
    /></span>
    <span class="order__item-col"
      ><p>Окончание</p>
      <Datepicker v-model="sprintEndingDate"
    /></span>
    <span class="order__item-col"
      ><p>Буфер</p>
      <NumberInput :initValue="gap" @input="gapChange"
    /></span>
    <span class="order__item-row">
      <button
        class="save__btn"
        @click="$emit('save', sprintBeginningDate, sprintEndingDate)"
      >
        OK</button
      ><button class="close__btn" @click="$emit('cancel')">X</button>
    </span>
  </div>
</template>

<style scoped>
.sprint__form {
  padding-left: 50px;
  width: 100%;
  border-radius: 20px;
  border: 3px solid cadetblue;
  height: 150px;
  font-weight: 600;
  font-size: large;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order__item-row {
  position: relative;
  text-align: center;
  font-size: normal;
  font-weight: 400;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order__item-col {
  position: relative;
  text-align: center;
  font-size: normal;
  font-weight: 400;
  width: 25%;
  display: flex;
  flex-direction: column;
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
