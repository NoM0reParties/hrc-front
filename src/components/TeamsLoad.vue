<script lang="ts">
import { defineComponent } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import axios, { AxiosResponse, AxiosError } from "axios";
import { SprintDTO } from "@/dto/admin/sprint";
import SprintList from "@/components/dashboard/SprintList.vue";
import DevTeamsList from "./team-load/DevTeamsList.vue";
import { DevTeamBySprintDTO } from "@/dto/teams/DevTeamBySprintDTO";

export default defineComponent({
  data() {
    return {
      sprintList: [] as SprintDTO[],
      teamList: {} as DevTeamBySprintDTO[],
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
    async fetchDevTeamsList() {
      axios
        .get(`/api/v1/developer-teams/sprint/${this.currSprintID}`)
        .then((response: AxiosResponse<DevTeamBySprintDTO[]>) => {
          this.teamList = response.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async handleSprint(sprintID: number) {
      this.currSprintID = sprintID;
      await this.fetchDevTeamsList();
    },
    async reloadData() {
      this.fetchDevTeamsList();
    },
  },
  async created() {
    await this.fetchSprintList();
  },
  watch: {
    currSprintID() {
      this.fetchDevTeamsList();
    },
  },
  components: {
    SprintList,
    DevTeamsList,
  },
});
</script>

<template>
  <div>
    <h3>Спринты</h3>
    <SprintList
      :sprints="sprintList"
      :chosen-sprint="currSprintID"
      @sprint="handleSprint"
      @newsprint="fetchSprintList"
    />
    <h3>Команды</h3>
    <DevTeamsList
      :teams="teamList"
      :sprint-i-d="currSprintID"
      @reload="reloadData"
    />
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
