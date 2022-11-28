<script lang="ts">
import axios, { AxiosError, AxiosResponse } from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    entityName: { type: String, required: true },
    linkAddress: { type: String, required: true },
    collapsed: { type: Boolean, required: true },
  },
  data() {
    return {
      entityList: [] as any[],
    };
  },
  mounted() {
    this.getEntityList();
  },
  methods: {
    getEntityList() {
      axios
        .get(this.linkAddress)
        .then((response: AxiosResponse<any[]>) => {
          this.entityList = response.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    clickMainLine() {
      console.log("collapse", this.entityName);
      this.$emit("collapse", this.entityName);
    },
  },
});
</script>

<template>
  <div class="main__block">
    <Transition name="slide-fade">
      <div class="name__line" @click="clickMainLine" v-if="collapsed">
        {{ entityName }}
      </div>
    </Transition>
    <Transition name="slide-fade"
      ><ul class="entity__list" v-if="!collapsed">
        <li
          v-for="e in entityList"
          :key="e.id"
          class="entity__list-item"
          @click="$router.push({ path: `/${entityName}/${e.id}/edit` })"
        >
          <a>{{ e.id }} {{ e.name }} {{ entityName }}</a>
        </li>
        <div
          class="entity__list-item"
          @click="$router.push({ path: `/${entityName}/create` })"
        >
          Создать
        </div>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.name__line {
  background-color: beige;
  height: 100px;
  width: 600px;
  border-radius: 20px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
}

.main__block {
  min-height: 100px;
  margin-top: 50px;
}

.entity__list {
  margin: 0;
  list-style: none;
  padding-left: 0;
  position: relative;
  width: 600px;
}

.entity__list-item {
  padding: 10px;
  position: relative;
  width: 100%;
  border-radius: 20px;
  border: 1px solid black;
  cursor: pointer;
}

.entity__list-item:not(:last-child) {
  margin-bottom: 20px;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
