<script lang="ts">
import { defineComponent, PropType } from "vue";
import TeamItem from "@/components/team/TeamItem.vue";
import { DevTeamBySprintDTO } from "@/dto/teams/DevTeamBySprintDTO";

export default defineComponent({
  props: {
    teams: {
      type: Array as PropType<DevTeamBySprintDTO[]>,
      required: true,
    },
  },
  components: {
    TeamItem,
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
</style>
