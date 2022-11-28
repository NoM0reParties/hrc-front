<template>
  <div class="main__frame">
    <SprintForm action-type="edit" />
  </div>
</template>

<script lang="ts">
import SprintForm from "@/components/forms/SprintForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SprintForm,
  },
});
</script>
<style scoped>
.main__frame {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
