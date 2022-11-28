<script lang="ts">
import { defineComponent } from "vue";
import { SelectOptionDTO } from "@/dto/admin/select";
import StringInput from "@/components/inputs/StringInput.vue";
import SelectEntity from "@/components/selects/SelectDependantEntity.vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { FeatureDTO } from "@/dto/admin/feature";
import axios, { AxiosError, AxiosResponse } from "axios";

export default defineComponent({
  props: {
    actionType: { type: String, required: true },
  },
  data() {
    return {
      currentFeatureId: 0 as number,
      oldName: "" as string,
      featureName: "" as string,
      featureSprintID: 0 as number,
      sprintList: [] as SelectOptionDTO[],
      areYouSure: false as boolean,
      currSprintID: 0 as number,
      currName: "" as string,
    };
  },
  methods: {
    async featureNameChange(event: KeyboardEvent) {
      if (event !== undefined) {
        this.featureName = (event.target as HTMLInputElement).value;
      }
    },
    async featureIDChange(val: number) {
      this.featureSprintID = val;
    },
    async createEntity() {
      axios
        .post("/api/v1/features/", {
          name: this.featureName,
          sprint_id: this.currSprintID,
        })
        .then(() => {
          this.$router.push({ path: "/admin" });
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async editEntity() {
      axios
        .put(`/api/v1/features/${this.currentFeatureId}`, {
          name: this.featureName,
          sprint_id: this.currSprintID,
        })
        .then(() => {
          this.$router.push({ path: "/admin" });
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async deleteEntity() {
      axios
        .delete(`/api/v1/features/${this.currentFeatureId}`)
        .then(() => {
          this.$router.push({ path: "/admin" });
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchCurrentEntity() {
      axios
        .get(`/api/v1/features/${this.$route.params.id}`)
        .then((response: AxiosResponse<FeatureDTO>) => {
          this.currentFeatureId = response.data.id;
          this.featureName = this.oldName = response.data.name;
          this.featureSprintID = response.data.sprint_id;
          this.currSprintID = response.data.sprint_id;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async fetchSprintList() {
      axios
        .get("/api/v1/sprints/")
        .then((response: AxiosResponse<SelectOptionDTO[]>) => {
          this.sprintList = response.data;
          const results: SelectOptionDTO[] = this.sprintList.filter(
            (obj: SelectOptionDTO) => {
              return obj.id === this.currSprintID;
            }
          );
          this.currName = results[0].name || "";
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async toggleAreYouSure() {
      this.areYouSure = !this.areYouSure;
    },
    async optionChange(option: SelectOptionDTO) {
      this.currSprintID = option.id || 0;
      this.currName = option.name || "";
    },
  },
  computed: {
    createMode() {
      return this.actionType == "create";
    },
  },
  async created() {
    if (!this.createMode) {
      this.fetchCurrentEntity();
    }
    this.fetchSprintList();
  },
  components: {
    StringInput,
    SelectEntity,
  },
});
</script>

<template>
  <div class="main__block">
    <h2>
      {{ createMode ? "Новая Фича" : `Фича "${oldName}"` }}
    </h2>
    <ul class="form__list">
      <li>
        <p>Name</p>
        <StringInput
          @input="featureNameChange"
          :initValue="featureName"
          :width="400"
        />
      </li>
      <li>
        <p>Sprint</p>
        <SelectEntity
          :options="sprintList"
          :width="'400px'"
          :disabled="false"
          :initID="currSprintID"
          :initName="currName"
          @selectChange="optionChange"
        />
      </li>
    </ul>
    <button v-if="createMode" class="submit__btn" @click="createEntity">
      Отправить
    </button>
    <button
      v-if="!createMode"
      class="submit__btn save__btn"
      @click="editEntity"
    >
      Сохранить
    </button>
    <button
      v-if="!createMode && !areYouSure"
      class="submit__btn delete__btn"
      @click="toggleAreYouSure"
    >
      Удалить
    </button>
    <div class="delete__confirmation" v-if="areYouSure">
      Уверен?
      <button
        class="submit__btn delete__confirmation-btn"
        @click="deleteEntity"
      >
        Да, удалить
      </button>
      <button
        class="submit__btn delete__confirmation-btn"
        @click="toggleAreYouSure"
      >
        Галя, у нас отмена
      </button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 34px;
  margin-bottom: 50px;
}
.main__block {
  padding: 50px;
  list-style: none;
  border-radius: 20px;
  border: 2px solid black;
  width: 500px;
}

.form__list {
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 50px;
}

p {
  margin-bottom: 5px;
  text-align: left;
  font-size: 18px;
}

.dp__main,
.dp__main div,
.dp__input_wrap {
  width: 400px;
  border: 1px solid black;
  border-radius: 10px;
}

.submit__btn {
  color: #fff;
  background-color: wheat;
  border: none;
  border-radius: 10px;
  width: 300px;
  height: 50px;
  font-size: 18px;
  cursor: pointer;
}

.save__btn {
  background-color: rgb(147, 206, 147);
  margin-bottom: 25px;
}

.delete__btn {
  background-color: rgb(236, 116, 116);
}

.delete__confirmation {
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete__confirmation-btn {
  width: 150px;
  font-size: 16px;
}
</style>
