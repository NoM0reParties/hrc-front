<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { FeatureBySprintDTO } from "@/dto/feature-by-sprint";
import FeatureItem from "@/components/dashboard/FeatureItem.vue";
import FeatureLineForm from "@/components/dashboard/FeatureLineForm.vue";
import axios, { AxiosError } from "axios";

export default defineComponent({
  props: {
    features: {
      type: Array as PropType<FeatureBySprintDTO[]>,
      required: true,
    },
    sprintID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      addLineOn: false,
      currentName: "",
    };
  },
  watch: {
    sprintID() {
      this.addLineOn = false;
      this.currentName = "";
    },
  },
  methods: {
    async changeName(name: string) {
      this.currentName = name;
    },
    async createFeature() {
      axios
        .post(`/api/v1/features/`, {
          sprint_id: this.sprintID,
          name: this.currentName,
        })
        .then(() => {
          this.$emit("reload");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async saveChanges() {
      this.createFeature();
      this.$emit("reload");
      this.addLineOn = false;
    },
  },
  components: {
    FeatureItem,
    FeatureLineForm,
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
    <li class="feature__list-item">
      <div class="center__it">
        <button class="add__btn" @click="addLineOn = true" v-if="!addLineOn">
          Добавить задание
        </button>
        <FeatureLineForm
          :name="currentName"
          @name="changeName"
          @save="saveChanges"
          @cancel="addLineOn = false"
          v-if="addLineOn"
        />
      </div>
    </li>
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

.feature__list-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add__btn {
  border-radius: 15px;
  width: 350px;
  height: 70px;
  background-color: white;
  color: cadetblue;
  border: none;
  font-weight: 800;
  font-size: large;
  cursor: pointer;
}
</style>
