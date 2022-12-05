<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { DeveloperBySprintDTO } from "@/dto/teams/DeveloperBySprintDTO";
import PersonalLoad from "../metrics-composnents/PersonalLoad.vue";

export default defineComponent({
  props: {
    developer: {
      type: Object as PropType<DeveloperBySprintDTO>,
      required: true,
    },
  },
  components: {
    PersonalLoad,
  },
});
</script>

<template>
  <li>
    <div class="orders__item">
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
    </div>
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
</style>
