<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { SprintDTO } from "@/dto/admin/sprint";

export default defineComponent({
  props: {
    sprints: {
      type: Array as PropType<SprintDTO[]>,
      required: true,
    },
    chosenSprint: {
      type: Number,
      required: true,
    },
  },
});
</script>

<template>
  <ul class="sprint__list">
    <li
      class="sprint__list-item"
      v-for="sprint in sprints"
      :key="sprint.id"
      @click="$emit('sprint', sprint.id)"
      :class="{ chosen: sprint.id === chosenSprint }"
    >
      <p>Спринт №{{ sprint.id }}</p>
      {{ sprint.beginning_date }} -
      {{ sprint.ending_date }}
    </li>
  </ul>
</template>

<style scoped>
.sprint__list {
  list-style: none;
  display: flex;
}

.sprint__list-item {
  width: 200px;
  height: 150px;
  background-color: rgb(43, 102, 43);
  border: 1px solid rgb(9, 163, 86);
  margin: 0 10px;
  transition: all 0.7s ease-in-out;
  cursor: pointer;
  color: white;
}

.chosen {
  border: 3px solid rgb(158, 245, 169);
  transform: scale(1.2);
  background-color: rgb(86, 204, 86);
}

p {
  margin-bottom: 50px;
}
</style>
