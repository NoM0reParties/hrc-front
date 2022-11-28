<template>
  <div>
    <MainDashboard />
  </div>
</template>

<script lang="ts">
import MainDashboard from "@/components/MainDashboard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    MainDashboard,
  },
});
</script>
<style scoped></style>
