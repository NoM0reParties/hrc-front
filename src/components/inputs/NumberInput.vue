<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    height: { type: Number, required: false, default: 50 },
    width: { type: Number, required: false, default: 200 },
    maxValue: { type: Number, required: false, default: 100 },
    minValue: { type: Number, required: false, default: 0 },
    initValue: { type: Number, required: true },
  },
  data() {
    return {
      val: this.initValue as number,
    };
  },
  methods: {
    async valChange() {
      if (this.val > 100) {
        this.val = 100;
      } else if (this.val < 0) {
        this.val = 0;
      }
      this.$emit("input", this.val);
    },
  },
  computed: {
    inputStyle() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
      };
    },
  },
});
</script>

<template>
  <input
    type="number"
    :max="maxValue"
    :min="minValue"
    :style="inputStyle"
    v-model="val"
    @keyup="valChange"
  />
</template>

<style scoped>
input {
  font-size: 20px;
  border-radius: 10px;
  color: cadetblue;
  border: 2px solid cadetblue;
  padding: 5px;
  text-align: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
