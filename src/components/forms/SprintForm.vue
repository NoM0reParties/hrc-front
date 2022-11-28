<script lang="ts">
import { defineComponent } from "vue";
import StringInput from "@/components/inputs/StringInput.vue";
import NumberInput from "@/components/inputs/NumberInput.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { SprintDTO } from "@/dto/admin/sprint";
import axios, { AxiosError, AxiosResponse } from "axios";

export default defineComponent({
  props: {
    actionType: { type: String, required: true },
  },
  data() {
    return {
      currentSprintId: {} as number,
      oldName: "" as string,
      sprintName: "" as string,
      sprintBeginningDate: new Date() as Date,
      sprintEndingDate: new Date() as Date,
      sprintGap: 0 as number,
      areYouSure: false as boolean,
    };
  },
  methods: {
    sprintNameChange(event: KeyboardEvent) {
      if (event !== undefined) {
        this.sprintName = (event.target as HTMLInputElement).value;
      }
    },
    sprintGapChange(val: number) {
      this.sprintGap = val;
    },
    createEntity() {
      axios
        .post("/api/v1/sprints/", {
          name: this.sprintName,
          beginning_date: this.sprintBeginningDate,
          ending_date: this.sprintEndingDate,
          gap: this.sprintGap,
        })
        .then((response: AxiosResponse<SprintDTO>) => {
          console.log(response.data);
          this.$router.push({ path: "/admin" });
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    editEntity() {
      axios
        .patch(`/api/v1/sprints/${this.currentSprintId}`, {
          name: this.sprintName,
          beginning_date: this.sprintBeginningDate,
          ending_date: this.sprintEndingDate,
          gap: this.sprintGap,
        })
        .then(() => {
          this.$router.push({ path: "/admin" });
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    deleteEntity() {
      axios
        .delete(`/api/v1/sprints/${this.currentSprintId}`)
        .then(() => {
          this.$router.push({ path: "/admin" });
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    fetchCurrentEntity() {
      axios
        .get(`/api/v1/sprints/${this.$route.params.id}`)
        .then((response: AxiosResponse<SprintDTO>) => {
          this.currentSprintId = response.data.id;
          this.sprintName = this.oldName = response.data.name;
          this.sprintBeginningDate = response.data.beginning_date;
          this.sprintEndingDate = response.data.ending_date;
          this.sprintGap = response.data.gap;
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    toggleAreYouSure() {
      this.areYouSure = !this.areYouSure;
    },
  },
  computed: {
    createMode() {
      return this.actionType == "create";
    },
  },
  created() {
    if (!this.createMode) {
      this.fetchCurrentEntity();
    }
  },
  components: {
    StringInput,
    NumberInput,
    Datepicker,
  },
});
</script>

<template>
  <div class="main__block">
    <h2>
      {{ createMode ? "Новый спринт" : `Спринт "${oldName}"` }}
    </h2>
    <ul class="form__list">
      <li>
        <p>Name</p>
        <StringInput
          @input="sprintNameChange"
          :initValue="sprintName"
          :width="400"
        />
      </li>
      <li>
        <p>Beginning Date</p>
        <Datepicker v-model="sprintBeginningDate" />
      </li>
      <li>
        <p>Ending Date</p>
        <Datepicker v-model="sprintEndingDate" />
      </li>
      <li>
        <p>Gap</p>
        <NumberInput
          @input="sprintGapChange"
          :width="400"
          :initValue="createMode ? 0 : sprintGap"
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
