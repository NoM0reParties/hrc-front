<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    current: {
      type: Number,
      required: true,
    },
    overall: {
      type: Number,
      required: true,
    },
    primaryColor: {
      type: String,
      required: false,
      default: "cadetblue",
    },
    secondaryColor: {
      type: String,
      required: false,
      default: "white",
    },
    fadeColor: {
      type: String,
      required: false,
      default: "rgba(128, 128, 128, 0.404)",
    },
    units: {
      type: String,
      required: false,
      default: "часов",
    },
    height: {
      type: Number,
      required: false,
      default: 50,
    },
    width: {
      type: Number,
      required: false,
      default: 200,
    },
  },
  methods: {
    loadPercent() {
      return (this.current / this.overall) * 100;
    },
  },
  computed: {
    mainStyle() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
      };
    },
    statStyle() {
      return {
        height: `${this.height / 3}px`,
        width: `${this.width}px`,
      };
    },
    loadStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height / 3}px`,
      };
    },
    fadeStyle() {
      return {
        backgroundColor: this.fadeColor,
      };
    },
    lineStyle() {
      const load = this.loadPercent();
      if (load > 100) {
        return {
          width: `${load}%`,
          backgroundColor: "red",
        };
      } else {
        return {
          width: `${load}%`,
          backgroundColor: "green",
        };
      }
    },
  },
});
</script>

<template>
  <div class="main__block" :style="mainStyle">
    <div class="stats__block" :style="statStyle">
      {{ current }}/{{ overall }} {{ units }}
    </div>
    <div class="load__block" :style="loadStyle">
      <div class="line__block-fade" :style="fadeStyle"></div>
      <div class="line__block" :style="lineStyle"></div>
    </div>
  </div>
</template>

<style scoped>
.main__block {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.load__block {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
}

.line__block {
  position: inherit;
  height: 20%;
  border-radius: 10px;
}

.line__block-fade {
  position: absolute;
  height: 20%;
  border-radius: 10px;
  width: 100%;
  z-index: 0;
}
</style>
