<script lang="ts">
import { defineComponent } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import axios, { AxiosResponse, AxiosError } from "axios";
import { SprintDTO } from "@/dto/admin/sprint";
import { FeatureBySprintDTO } from "@/dto/feature-by-sprint";
import SprintList from "@/components/dashboard/SprintList.vue";
import FeaturesList from "@/components/dashboard/FeatureList.vue";

export default defineComponent({
  data() {
    return {
      sprintList: [] as SprintDTO[],
      featureList: {} as FeatureBySprintDTO[],
      currSprintID: 0 as number,
    };
  },
  methods: {
    async fetchSprintList() {
      axios
        .get("/api/v1/sprints?limit=5")
        .then((response: AxiosResponse<SprintDTO[]>) => {
          this.sprintList = response.data.sort((a: SprintDTO, b: SprintDTO) => {
            return a.id > b.id ? 1 : -1;
          });
          this.currSprintID = Math.max(...this.sprintList.map((o) => o.id));
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchFeaturesList() {
      axios
        .get(`/api/v1/features/sprint/${this.currSprintID}`)
        .then((response: AxiosResponse<FeatureBySprintDTO[]>) => {
          this.featureList = response.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async handleSprint(sprintID: number) {
      this.currSprintID = sprintID;
      await this.fetchFeaturesList();
    },
    async reloadData() {
      this.fetchFeaturesList();
    },
  },
  async created() {
    await this.fetchSprintList();
    await this.fetchFeaturesList();
  },
  components: {
    SprintList,
    FeaturesList,
  },
});
</script>

<template>
  <div>
    <h3>спринты</h3>
    <SprintList
      :sprints="sprintList"
      :chosen-sprint="currSprintID"
      @sprint="handleSprint"
    />
    <h3>фичи</h3>
    <FeaturesList
      :features="featureList"
      :sprint-i-d="currSprintID"
      @reload="reloadData"
    />
  </div>
</template>

<style scoped>
h3 {
  font-size: 34px;
  margin-bottom: 50px;
  text-align: left;
}
</style>
