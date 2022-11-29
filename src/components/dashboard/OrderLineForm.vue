<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import NumberInput from "../inputs/NumberInput.vue";
import axios, { AxiosResponse, AxiosError } from "axios";
import { DeveloperTeamDTO } from "@/dto/developer-team";
import SelectInput from "../selects/SelectDependantEntity.vue";
import { SelectOptionDTO } from "@/dto/admin/select";
import { DeveloperDTO } from "@/dto/developer";

export default defineComponent({
  props: {
    devTeam: {
      type: Object as PropType<SelectOptionDTO>,
      required: true,
    },
    developer: {
      type: Object as PropType<SelectOptionDTO>,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    gap: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      possibleTeams: [] as DeveloperTeamDTO[],
      possibleDevelopers: [] as DeveloperDTO[],
    };
  },
  methods: {
    async fetchDeveloperTeams() {
      axios
        .get("/api/v1/developer-teams")
        .then((response: AxiosResponse<DeveloperTeamDTO[]>) => {
          this.possibleTeams = response.data;
          if (this.devTeam.id === undefined) {
            console.log("here");
            this.$emit("devteam", {
              id: response.data[0].id,
              name: response.data[0].name,
            });
          }
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchDevelopers(dev_team_id: number) {
      axios
        .get(`/api/v1/developers?team=${dev_team_id}`)
        .then((response: AxiosResponse<DeveloperDTO[]>) => {
          this.possibleDevelopers = response.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async devTeamChange(devTeam: SelectOptionDTO) {
      await this.fetchDevelopers(devTeam.id || 0);
      this.$emit("devteam", devTeam);
    },
    async devChange(dev: SelectOptionDTO) {
      this.$emit("dev", dev);
    },
    async hoursChange(hours: number) {
      this.$emit("hours", hours);
    },
    async gapChange(gap: number) {
      this.$emit("gap", gap);
    },
  },
  async created() {
    await this.fetchDeveloperTeams();
    await this.fetchDevelopers(this.devTeam.id || 0);
  },
  components: {
    NumberInput,
    SelectInput,
  },
});
</script>

<template>
  <div class="orders__item">
    <span class="order__item-col"
      ><SelectInput
        :options="possibleTeams"
        width="150px"
        :disabled="false"
        :initName="devTeam.name"
        :initID="devTeam.id"
        @selectChange="devTeamChange"
    /></span>
    <span class="order__item-col"
      ><NumberInput :initValue="hours" @input="hoursChange"
    /></span>
    <span class="order__item-col"
      ><SelectInput
        :options="possibleDevelopers"
        width="150px"
        :disabled="false"
        :initName="developer.name"
        :initID="developer.id"
        @selectChange="devChange"
    /></span>
    <span class="order__item-col"
      ><NumberInput :initValue="gap" @input="gapChange"
    /></span>
    <span class="order__item-col">
      <button class="save__btn" @click="$emit('save')">OK</button
      ><button class="close__btn" @click="$emit('cancel')">X</button>
    </span>
  </div>
</template>

<style scoped>
.orders__item {
  position: relative;
  height: 70px;
  font-weight: 600;
  font-size: large;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order__item-col {
  position: relative;
  text-align: center;
  font-size: normal;
  font-weight: 400;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save__btn {
  width: 55px;
  height: 40px;
  margin-right: 10px;
  border-radius: 15px;
  border: none;
  background-color: cadetblue;
  color: white;
  cursor: pointer;
}

.close__btn {
  width: 55px;
  height: 40px;
  border-radius: 15px;
  border: none;
  background-color: rgb(184, 223, 224);
  color: white;
  cursor: pointer;
}
</style>
