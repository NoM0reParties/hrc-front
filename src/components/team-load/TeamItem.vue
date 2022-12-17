<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import DeveloperItem from "@/components/team-load/DeveloperItem.vue";
import PersonalLoad from "@/components/metrics-composnents/PersonalLoad.vue";
import { DevTeamBySprintDTO } from "@/dto/teams/DevTeamBySprintDTO";

export default defineComponent({
  props: {
    team: {
      type: Object as PropType<DevTeamBySprintDTO>,
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
  },
  components: {
    DeveloperItem,
    PersonalLoad,
  },
  computed: {
    featureStyle() {
      if (this.opened) {
        return {
          height: `${
            70 *
            ((this.team.developers.length > 0
              ? this.team.developers.length
              : 1) +
              1)
          }px`,
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
      <span class="feature__name order__item-col"
        >{{ team.id }}. {{ team.name }}</span
      >
      <span class="order__item-col"
        >Количество разработчиков {{ team.developers.length }}</span
      >
      <span class="order__item-col"
        ><PersonalLoad
          :current="team.team_load"
          :overall="team.team_load_overall"
          :height="35"
          fade-color="white"
      /></span>
    </div>
    <ul class="orders" :style="featureStyle">
      <li class="orders__item">
        <span class="order__item-col">Имя</span>
        <span class="order__item-col">Вовлеченность</span>
        <span class="order__item-col">Загруженность</span>
        <span class="order__item-col">Количество задач</span>
      </li>
      <DeveloperItem
        v-for="developer in team.developers"
        :developer="developer"
        :key="developer.id"
        @reload="$emit('reload')"
      />
      <li
        class="orders__item"
        v-if="team.developers.length === 0"
        style="justify-content: center"
      >
        В Этой команде пока нет разработчиков
      </li>
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
