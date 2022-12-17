<script lang="ts">
import { defineComponent } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import axios, { AxiosResponse, AxiosError } from "axios";
import { DeveloperTeamDTO } from "@/dto/teams/DevTeamBySprintDTO";
import DevTeamsList from "./team/DevTeamsList.vue";

export default defineComponent({
  data() {
    return {
      teamList: [] as DeveloperTeamDTO[],
    };
  },
  methods: {
    async fetchDevTeamsList() {
      axios
        .get(`/api/v1/developer-teams/`)
        .then((response: AxiosResponse<DeveloperTeamDTO[]>) => {
          this.teamList = response.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async reloadData() {
      this.fetchDevTeamsList();
    },
  },
  async created() {
    await this.fetchDevTeamsList();
  },
  components: {
    DevTeamsList,
  },
});
</script>

<template>
  <div>
    <h3>Команды</h3>
    <DevTeamsList :teams="teamList" @reload="reloadData" />
  </div>
</template>

<style scoped>
h3 {
  font-weight: 500;
  font-size: 34px;
  margin-bottom: 50px;
  text-align: left;
}
</style>
