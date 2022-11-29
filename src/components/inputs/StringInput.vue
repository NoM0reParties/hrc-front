<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    height: { type: Number, required: false, default: 50 },
    width: { type: Number, required: false, default: 200 },
    initValue: { type: String, required: true },
    borderColor: { type: String, required: false, default: "#000000" },
    backgroundColor: { type: String, required: false, default: "#fff" },
  },
  data() {
    return {
      val: this.initValue,
    };
  },
  computed: {
    inputStyle() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
        borderColor: this.borderColor,
        backgroundColor: this.backgroundColor,
      };
    },
  },
});
</script>

<template>
  <input
    type="text"
    :style="inputStyle"
    :value="initValue"
    @change="$emit('input')"
  />
</template>

<style scoped>
input {
  font-size: 20px;
  border-radius: 10px;
  border: 1px solid;
  padding: 5px;
  text-align: center;
}
</style>
