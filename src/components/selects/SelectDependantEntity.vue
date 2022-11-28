<script lang="ts">
import { SelectOptionDTO } from "@/dto/admin/select";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    options: {
      type: Array as PropType<SelectOptionDTO[]>,
      required: true,
    },
    width: { type: String, required: true },
    disabled: { type: Boolean, required: true },
    initName: { type: String, required: false, default: "" },
    initID: { type: Number, required: false, default: 0 },
  },
  data() {
    return {
      optionsOpened: false,
    };
  },
  methods: {
    close(e: Event) {
      if (!this.$el.contains(e.target)) {
        this.optionsOpened = false;
      }
    },
    openClick() {
      this.optionsOpened = !this.optionsOpened;
    },
    putValue(option: SelectOptionDTO) {
      this.$emit("selectChange", option);
      this.openClick();
    },
  },
  computed: {
    optionStyle() {
      if (this.optionsOpened) {
        return {
          height: `${50 * this.options.length}px`,
        };
      } else {
        return {
          zIndex: 1,
          height: "0px",
        };
      }
    },
    calcDims() {
      return {
        width: this.width,
      };
    },
    rotate() {
      if (this.optionsOpened) {
        if (this.optionsOpened) {
          return {
            top: "24px",
            transform: "rotate(225deg)",
          };
        } else {
          return {};
        }
      } else {
        return {};
      }
    },
  },
});
</script>
<template>
  <div class="v-select" :class="{ shake: disabled }" :style="calcDims">
    <p class="v-select__title" @click="openClick">
      <span class="v-select__title-after" :style="rotate"></span>
      {{ initName }}
    </p>
    <div class="options" :style="optionStyle">
      <p v-for="option in options" :key="option.id" @click="putValue(option)">
        {{ option.name }}({{ option.id }})
      </p>
    </div>
  </div>
</template>

<style scoped>
p {
  padding: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.v-select {
  position: relative;
  width: 200px;
  color: cadetblue;
  transition: background-color 0.5s ease-in-out;
  border-radius: 8px;
}
.v-select:hover {
  background: rgb(255, 255, 255);
}
.v-select p {
  margin: 0;
}
.v-select__title {
  cursor: pointer;
  border-radius: 8px;
  border: solid 2px cadetblue;
}
.v-select__title-after {
  position: absolute;
  width: 8px;
  height: 8px;
  border-bottom: solid 2px cadetblue;
  border-right: solid 2px cadetblue;
  top: 20px;
  right: 10px;
  transform: rotate(45deg);
  transition: transform 0.5s ease-in-out, top 0.2s ease-in-out;
}
.options {
  overflow: hidden;
  z-index: 20;
  height: 0px;
  position: absolute;
  left: 10%;
  width: 80%;
  border: solid 1px cadetblue;
  transform: translateY(-2px);
  transition: height 0.5s ease-in-out;
  will-change: height, z-index;
  background-color: cadetblue;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
}
.options p {
  cursor: pointer;
  padding: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgb(255, 255, 255);
}
.options p:hover {
  background: rgb(255, 255, 255);
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
