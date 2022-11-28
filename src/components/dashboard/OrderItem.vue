<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { FeatureTeamOrderDTO } from "@/dto/feature-team-order";
import NumberInput from "../inputs/NumberInput.vue";
import axios, { AxiosResponse, AxiosError } from "axios";
import { DeveloperTeamDTO } from "@/dto/developer-team";
import SelectInput from "../selects/SelectDependantEntity.vue";
import { SelectOptionDTO } from "@/dto/admin/select";
import { DeveloperDTO } from "@/dto/developer";

export default defineComponent({
  props: {
    order: {
      type: Object as PropType<FeatureTeamOrderDTO>,
      required: true,
    },
  },
  data() {
    return {
      editMode: false as boolean,
      editOrder: this.order as FeatureTeamOrderDTO,
      possibleTeams: [] as DeveloperTeamDTO[],
      possibleDevelopers: [] as DeveloperDTO[],
      currentDevTeam: {} as SelectOptionDTO,
      currentDeveloper: {} as SelectOptionDTO,
      currentHours: 10,
      currentGap: 0,
    };
  },
  methods: {
    fetchDeveloperTeams() {
      axios
        .get("/api/v1/developer-teams")
        .then((response: AxiosResponse<DeveloperTeamDTO[]>) => {
          this.possibleTeams = response.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    fetchDevelopers() {
      axios
        .get(`/api/v1/developers?team=${this.currentDevTeam.id}`)
        .then((response: AxiosResponse<DeveloperDTO[]>) => {
          this.possibleDevelopers = response.data;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    updateOrder() {
      axios
        .put(`/api/v1/feature-team-orders/${this.order.id}`, {
          dev_team_id: this.currentDevTeam.id,
          hours: this.currentHours,
          gap: this.currentGap,
          developer_id: this.currentDeveloper.id,
        })
        .then(() => {
          this.$emit("reload");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    editClick() {
      this.fetchDeveloperTeams();
      this.currentDevTeam = {
        id: this.order.dev_team.id,
        name: this.order.dev_team.name,
      };
      this.currentDeveloper = {
        id: this.order.assigned_developer?.id,
        name: this.order.assigned_developer?.name,
      };
      this.currentHours = this.order.hours;
      this.currentGap = this.order.gap;
      this.fetchDevelopers();
      this.editMode = true;
    },
    saveChanges() {
      this.updateOrder();
      this.editMode = false;
    },
    devTeamChange(devTeam: SelectOptionDTO) {
      this.currentDevTeam = devTeam;
      this.currentDeveloper = {};
      this.fetchDevelopers();
    },
    devChange(dev: SelectOptionDTO) {
      this.currentDeveloper = dev;
    },
    hoursChange(hours: number) {
      this.currentHours = hours;
    },
    gapChange(gap: number) {
      this.currentGap = gap;
    },
  },
  computed: {
    assignedDeveloper() {
      if (this.order.assigned_developer) {
        return this.order.assigned_developer.name;
      } else {
        return "Разработчик не назначен";
      }
    },
  },
  components: {
    NumberInput,
    SelectInput,
  },
});
</script>

<template>
  <li>
    <div v-if="!editMode" class="orders__item">
      <span class="order__item-col">{{ order.dev_team.name }}</span>
      <span class="order__item-col">{{ order.hours }}</span>
      <span class="order__item-col">{{ assignedDeveloper }}</span>
      <span class="order__item-col">{{ order.gap }}</span>
      <span class="order__item-col">
        <button class="edit__btn" @click="editClick">Редактировать</button>
      </span>
    </div>
    <div v-if="editMode" class="orders__item">
      <span class="order__item-col"
        ><SelectInput
          :options="possibleTeams"
          width="150px"
          :disabled="false"
          :initName="currentDevTeam.name"
          :initID="currentDevTeam.id"
          @selectChange="devTeamChange"
      /></span>
      <span class="order__item-col"
        ><NumberInput :initValue="currentHours" @input="hoursChange"
      /></span>
      <span class="order__item-col"
        ><SelectInput
          :options="possibleDevelopers"
          width="150px"
          :disabled="false"
          :initName="currentDeveloper.name"
          :initID="currentDeveloper.id"
          @selectChange="devChange"
      /></span>
      <span class="order__item-col"
        ><NumberInput :initValue="currentGap" @input="gapChange"
      /></span>
      <span class="order__item-col">
        <button class="save__btn" @click="saveChanges">OK</button
        ><button class="close__btn" @click="editMode = false">X</button>
      </span>
    </div>
  </li>
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
  text-align: center;
  font-size: normal;
  font-weight: 400;
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit__btn {
  border-radius: 15px;
  width: 150px;
  height: 40px;
  background-color: cadetblue;
  color: white;
  border: none;
  font-size: large;
  cursor: pointer;
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
