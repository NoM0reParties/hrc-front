<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { SprintDTO } from "@/dto/admin/sprint";
import SprintLineForm from "./SprintLineForm.vue";
import axios, { AxiosError, AxiosResponse } from "axios";

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
  data() {
    return {
      newSprint: false,
      newSprintName: "",
      newSprintGap: 0,
      newSprintBegin: new Date() as Date,
      newSprintEnd: new Date() as Date,
    };
  },
  methods: {
    async changeName(name: string) {
      this.newSprintName = name;
    },
    async changeGap(gap: number) {
      this.newSprintGap = gap;
    },
    async saveChanges(begin: Date, end: Date) {
      this.newSprintBegin = begin;
      this.newSprintEnd = end;
      this.createEntity();
    },
    async cancelNew(name: string) {
      this.newSprint = false;
    },
    async createEntity() {
      axios
        .post("/api/v1/sprints/", {
          name: this.newSprintName,
          beginning_date: this.newSprintBegin,
          ending_date: this.newSprintEnd,
          gap: this.newSprintGap,
        })
        .then((response: AxiosResponse<SprintDTO>) => {
          console.log(response.data);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
  },
  components: {
    SprintLineForm,
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
      :class="{ chosen: sprint.id === chosenSprint, hidden: newSprint }"
    >
      <p>Спринт №{{ sprint.id }}</p>
      {{ sprint.beginning_date }} -
      {{ sprint.ending_date }}
    </li>
    <li
      class="sprint__list-item sprint__list-new"
      @click="newSprint = true"
      :class="{ hidden: newSprint }"
    >
      +
    </li>
    <SprintLineForm
      :name="newSprintName"
      :gap="newSprintGap"
      @name="changeName"
      @gap="changeGap"
      @save="saveChanges"
      @cancel="cancelNew"
      v-if="newSprint"
    />
  </ul>
</template>

<style scoped>
.sprint__list {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.sprint__list-item {
  width: 200px;
  height: 150px;
  background-color: cadetblue;
  margin: 0 10px;
  transition: all 0.7s ease-in-out;
  cursor: pointer;
  color: white;
  font-weight: 800;
  border-radius: 15px;
}

.sprint__list-new {
  font-weight: 4800;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chosen {
  border: 3px solid;
  transform: scale(1.2);
  background-color: rgb(101, 191, 194);
}

.hidden {
  display: none;
}

p {
  font-size: 24px;
  margin-bottom: 50px;
}
</style>
