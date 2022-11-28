<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { FeatureBySprintDTO } from "@/dto/feature-by-sprint";
import OrderItem from "@/components/dashboard/OrderItem.vue";

export default defineComponent({
  props: {
    feature: {
      type: Object as PropType<FeatureBySprintDTO>,
      required: true,
      addLineOn: false,
    },
  },
  methods: {
    clickFeature() {
      this.opened = !this.opened;
    },
  },
  data() {
    return {
      opened: false,
    };
  },
  components: {
    OrderItem,
  },
  computed: {
    featureStyle() {
      if (this.opened) {
        return {
          height: `${70 * (this.feature.dev_team_orders.length + 2)}px`,
          maxHeight: "auto",
        };
      } else {
        return {};
      }
    },
  },
});
</script>

<template>
  <li class="feature__list-item">
    <div class="feature__title" @click="clickFeature">
      <span class="feature__name">{{ feature.id }}. {{ feature.name }}</span>
      <span>Количество задач {{ feature.dev_team_orders.length }}</span>
    </div>
    <ul class="orders" :style="featureStyle">
      <li class="orders__item">
        <span class="order__item-col">Команда</span>
        <span class="order__item-col">Часы на выполнение</span>
        <span class="order__item-col">Разработчик</span>
        <span class="order__item-col">Буфер</span>
        <span class="order__item-col"></span>
      </li>
      <OrderItem
        v-for="order in feature.dev_team_orders"
        :order="order"
        :key="order.id"
        @reload="$emit('reload')"
      />
      <li class="orders__item">
        <div class="center__it">
          <button class="add__btn">Добавить задание</button>
        </div>
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
  padding: 0;
  margin: 0;
  overflow: hidden;
  height: 0px;
  top: 100%;
  width: 90%;
  list-style: none;
  color: cadetblue;
  background-color: white;
  will-change: height;
  transition: height 0.5s ease-in-out, z-index 0.5s ease-in-out;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.orders__item {
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
