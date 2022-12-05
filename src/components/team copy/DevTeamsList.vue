<script lang="ts">
import { defineComponent, PropType } from "vue";
import TeamItem from "@/components/team/TeamItem.vue";
import TeamLineForm from "@/components/team/TeamLineForm.vue";
import axios, { AxiosError } from "axios";
import { DevTeamBySprintDTO } from "@/dto/teams/DevTeamBySprintDTO";

export default defineComponent({
  props: {
    teams: {
      type: Array as PropType<DevTeamBySprintDTO[]>,
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
    async createTeam() {
      axios
        .post(`/api/v1/features/`, {
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
      this.createTeam();
      this.$emit("reload");
      this.addLineOn = false;
    },
  },
  components: {
    TeamItem,
    TeamLineForm,
  },
});
</script>

<template>
  <ul class="feature__list">
    <TeamItem
      v-for="team in teams"
      :team="team"
      :key="team.id"
      @reload="$emit('reload')"
    />
    <li class="feature__list-item">
      <div class="center__it">
        <button class="add__btn" @click="addLineOn = true" v-if="!addLineOn">
          Добавить задание
        </button>
        <TeamLineForm
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
