<template>
  <div class="main__frame">
    <FeatureForm action-type="edit" />
  </div>
</template>

<script lang="ts">
import FeatureForm from "@/components/forms/FeatureForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    FeatureForm,
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
