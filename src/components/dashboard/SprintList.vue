<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { SprintDTO } from "@/dto/admin/sprint";
import SprintLineForm from "./SprintLineForm.vue";
import axios, { AxiosError } from "axios";
import ModalConfirmWindow from "@/components/utilities/ModalConfirmWindow.vue";

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
      modalActive: false,
      deleteSprintID: 0,
      deleteSprint: false,
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
      this.newSprint = false;
    },
    async cancelNew() {
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
        .then(() => {
          this.$emit("newsprint");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },

    async removeEntity() {
      axios
        .delete(`/api/v1/sprints/${this.deleteSprintID}`)
        .then(() => {
          this.modalActive = false;
          this.deleteSprintID = 0;
          this.$emit("newsprint");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async RemoveSprintConfrim() {
      this.removeEntity();
    },
    async SprintDelete(ID: number) {
      this.deleteSprintID = ID;
      this.modalActive = true;
    },
  },
  components: {
    SprintLineForm,
    ModalConfirmWindow,
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
      :class="{
        chosen: sprint.id === chosenSprint,
        hidden: newSprint || deleteSprint,
      }"
    >
      <p>Спринт №{{ sprint.id }}</p>
      {{ sprint.beginning_date }} -
      {{ sprint.ending_date }}
    </li>
    <li
      class="sprint__list-item actions__remove"
      v-for="sprint in sprints"
      :key="sprint.id"
      @click="SprintDelete(sprint.id)"
      :class="{
        hidden: !deleteSprint,
      }"
    >
      Спринт №{{ sprint.id }}
      <font-awesome-icon
        class="action__removebtn"
        icon="fa-solid fa-trash-can"
        size="3x"
      />
    </li>
    <li class="sprint__list-item actions__item" :class="{ hidden: newSprint }">
      <font-awesome-icon
        icon="fa-solid fa-circle-plus"
        class="action__btn"
        size="3x"
        @click="newSprint = true"
        v-if="!deleteSprint"
      />
      <font-awesome-icon
        class="action__btn"
        icon="fa-solid fa-trash-can"
        size="3x"
        @click="deleteSprint = true"
        v-if="!deleteSprint"
      />
      <font-awesome-icon
        class="action__btn"
        icon="fa-solid fa-chevron-left"
        size="3x"
        @click="deleteSprint = false"
        v-if="deleteSprint"
      />
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
    <ModalConfirmWindow
      :message="`Вы действительно хотите удалить спринт номер ${deleteSprintID}?`"
      action-message="Удалить"
      v-if="modalActive"
      @confirm="RemoveSprintConfrim"
      @cancel="modalActive = false"
    />
  </ul>
</template>

<style scoped>
.sprint__list {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
}

.sprint__list-item {
  width: 200px;
  height: 150px;
  background-color: cadetblue;
  transition: all 0.7s ease-in-out;
  cursor: pointer;
  color: white;
  font-weight: 800;
  border-radius: 15px;
}

.chosen {
  border: 3px solid;
  transform: scale(1.2);
  background-color: rgb(57, 161, 165);
}
.actions__item {
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: auto;
  background-color: white;
}

.action__btn {
  border-radius: 10px;
  padding: 10px;
  color: white;
  cursor: pointer;
  background-color: cadetblue;
}

.action__removebtn {
  display: block;
  color: white;
}

.actions__remove {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgb(126, 72, 72);
}

p {
  font-size: 24px;
  margin-bottom: 50px;
}

.hidden {
  display: none;
}
</style>
