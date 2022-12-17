<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import DeveloperItem from "@/components/team/DeveloperItem.vue";
import DeveloperLineForm from "./DeveloperLineForm.vue";
import { DeveloperTeamDTO } from "@/dto/teams/DevTeamBySprintDTO";
import axios, { AxiosError } from "axios";

export default defineComponent({
  props: {
    team: {
      type: Object as PropType<DeveloperTeamDTO>,
      required: true,
    },
  },
  data() {
    return {
      opened: false,
      addLineOn: false,
      name: "",
      currentFirstName: "",
      currentLastName: "",
      currentInvolvement: 0,
    };
  },
  methods: {
    async clickFeature() {
      this.opened = !this.opened;
    },
    async createNewDeveloper() {
      axios
        .post(`/api/v1/developers/`, {
          first_name: this.currentFirstName,
          last_name: this.currentLastName,
          involvement: this.currentInvolvement,
          dev_team_id: this.team.id,
        })
        .then(() => {
          this.$emit("reload");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
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
    async saveChanges() {
      await this.createNewDeveloper();
      this.addLineOn = false;
    },
  },
  components: {
    DeveloperItem,
    DeveloperLineForm,
  },
  computed: {
    featureStyle() {
      if (this.opened) {
        return {
          height: `${70 * (this.team.developers.length + 2)}px`,
          maxHeight: "auto",
          opacity: 1,
        };
      } else {
        return {
          opacity: 0,
          overflow: "hidden",
        };
      }
    },
  },
});
</script>

<template>
  <li class="feature__list-item">
    <div class="feature__title" @click="clickFeature">
      <span class="feature__name">{{ team.id }}. {{ team.name }}</span>
      <span>Количество разработчиков {{ team.developers.length }}</span>
    </div>
    <ul class="orders" :style="featureStyle">
      <li class="orders__item">
        <span class="order__item-col">Имя</span>
        <span class="order__item-col">Фамилия</span>
        <span class="order__item-col">Вовлеченность</span>
        <span class="order__item-col"></span>
      </li>
      <DeveloperItem
        v-for="developer in team.developers"
        :developer="developer"
        :key="developer.id"
        @reload="$emit('reload')"
      />
      <li class="orders__item" v-if="!addLineOn">
        <div class="center__it">
          <button class="add__btn" @click="addLineOn = true">
            Добавить разработчика
          </button>
        </div>
      </li>
      <DeveloperLineForm
        :first-name="currentFirstName"
        :last-name="currentLastName"
        :involvement="currentInvolvement"
        @first="firstNameChange"
        @last="lastNameChange"
        @involvement="invChange"
        v-if="addLineOn"
        @save="saveChanges"
        @cancel="addLineOn = false"
      />
    </ul>
  </li>
</template>

<style scoped>
.feature__name {
  font-size: 26px;
  font-weight: 700;
}

.feature__title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 60px;
  border-radius: 5px;
  border: 2px solid rgb(255, 255, 255);
  cursor: pointer;
}

.feature__list-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature__list-item:not(:last-child) {
  margin-bottom: 30px;
}

.orders {
  position: relative;
  padding: 0;
  margin: 0;
  height: 0px;
  top: 100%;
  width: 90%;
  list-style: none;
  color: cadetblue;
  background-color: white;
  will-change: height, overflow;
  transition: height 0.5s ease-in-out, opacity 1s ease-in-out;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.orders__item {
  position: relative;
  padding: 0;
  height: 70px;
  justify-content: space-between;
  font-weight: 600;
  font-size: large;
  display: flex;
  align-items: center;
}

.order__item-col {
  text-align: center;
  width: 25%;
}

.add__btn {
  border-radius: 15px;
  width: 250px;
  height: 50px;
  background-color: cadetblue;
  color: white;
  border: none;
  font-size: large;
  cursor: pointer;
}
</style>
