<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { FeatureBySprintDTO } from "@/dto/feature-by-sprint";
import FeatureItem from "@/components/dashboard/FeatureItem.vue";

export default defineComponent({
  props: {
    features: {
      type: Array as PropType<FeatureBySprintDTO[]>,
      required: true,
    },
  },
  components: {
    FeatureItem,
  },
});
</script>

<template>
  <ul class="feature__list">
    <FeatureItem
      v-for="feature in features"
      :feature="feature"
      :key="feature.id"
      @reload="$emit('reload')"
    />
  </ul>
</template>

<style scoped>
.feature__name {
  font-size: 26px;
  font-weight: 700;
}

.feature__list {
  list-style: none;
  width: 100%;
  background-color: cadetblue;
  color: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
