<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { FeatureTeamOrderDTO } from "@/dto/feature-team-order";
import axios, { AxiosResponse, AxiosError } from "axios";
import { DeveloperTeamDTO } from "@/dto/developer-team";
import { SelectOptionDTO } from "@/dto/admin/select";
import { DeveloperDTO } from "@/dto/developer";
import OrderLineForm from "./OrderLineForm.vue";

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
      currentHours: this.order.hours,
      currentGap: this.order.gap,
    };
  },
  methods: {
    async updateOrder() {
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
    async editClick() {
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
      this.editMode = true;
    },
    async saveChanges() {
      this.updateOrder();
      this.editMode = false;
    },
    async devTeamChange(devTeam: SelectOptionDTO) {
      this.currentDevTeam = devTeam;
      this.currentDeveloper = {};
    },
    async devChange(dev: SelectOptionDTO) {
      this.currentDeveloper = dev;
    },
    async hoursChange(hours: number) {
      this.currentHours = hours;
    },
    async gapChange(gap: number) {
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
    OrderLineForm,
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

    <OrderLineForm
      :dev-team="currentDevTeam"
      :developer="currentDeveloper"
      :hours="currentHours"
      :gap="currentGap"
      @devteam="devTeamChange"
      @dev="devChange"
      @hours="hoursChange"
      @gap="gapChange"
      v-if="editMode"
      @save="saveChanges"
      @cancel="editMode = false"
    />
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
</style>
