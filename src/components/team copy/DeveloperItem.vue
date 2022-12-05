<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import axios, { AxiosError } from "axios";
import DeveloperLineForm from "./DeveloperLineForm.vue";
import { DeveloperBySprintDTO } from "@/dto/teams/DeveloperBySprintDTO";
import PersonalLoad from "../metrics-composnents/PersonalLoad.vue";

export default defineComponent({
  props: {
    developer: {
      type: Object as PropType<DeveloperBySprintDTO>,
      required: true,
    },
  },
  data() {
    return {
      editMode: false as boolean,
      editOrder: this.developer as DeveloperBySprintDTO,
      currentFirstName: "",
      currentLastName: "",
      currentInvolvement: 0,
    };
  },
  methods: {
    async updateDeveloper() {
      axios
        .put(`/api/v1/developers/${this.developer.id}`, {
          first_name: this.currentFirstName,
          last_name: this.currentLastName,
          involvement: this.currentInvolvement,
        })
        .then(() => {
          this.$emit("reload");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async editClick() {
      this.currentFirstName = this.developer.first_name;
      this.currentLastName = this.developer.last_name;
      this.currentInvolvement = this.developer.involvement;
      this.editMode = true;
    },
    async saveChanges() {
      this.updateDeveloper();
      this.editMode = false;
    },
    async firstNameChange(name: string) {
      this.currentFirstName = name;
    },
    async lastNameChange(name: string) {
      this.currentLastName = name;
    },

    async invChange(involvement: number) {
      this.currentInvolvement = involvement;
    },
  },
  components: {
    DeveloperLineForm,
    PersonalLoad,
  },
});
</script>

<template>
  <li>
    <div v-if="!editMode" class="orders__item">
      <span class="order__item-col"
        >{{ developer.first_name }} {{ developer.last_name }}</span
      >
      <span class="order__item-col">{{ developer.involvement }}</span>
      <span class="order__item-col">
        <PersonalLoad
          :current="developer.sprint_load"
          :overall="developer.possible_hours"
        />
      </span>
      <span class="order__item-col">{{ developer.fto_count }}</span>
      <span class="order__item-col">
        <button class="edit__btn" @click="editClick">Редактировать</button>
      </span>
    </div>

    <DeveloperLineForm
      :first-name="currentFirstName"
      :last-name="currentLastName"
      :involvement="currentInvolvement"
      @first="firstNameChange"
      @last="lastNameChange"
      @involvement="invChange"
      v-if="editMode"
      @save="saveChanges"
      @cancel="editMode = false"
    />
  </li>
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
  text-align: center;
  font-size: normal;
  font-weight: 400;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.order__item-col-2 {
  width: 50%;
}

.edit__btn {
  border-radius: 15px;
  width: 150px;
  height: 40px;
  background-color: cadetblue;
  color: white;
  border: none;
  font-size: large;
  cursor: pointer;
}
</style>
