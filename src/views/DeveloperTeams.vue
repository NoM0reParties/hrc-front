<template>
  <div>
    <Teams />
  </div>
</template>

<script lang="ts">
import Teams from "@/components/DeveloperTeams.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Teams,
  },
});
</script>
<style scoped></style>
