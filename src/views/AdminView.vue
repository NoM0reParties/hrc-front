<template>
  <div class="main__frame">
    <AdminMultiTool
      entityName="sprint"
      linkAddress="/api/v1/sprints/"
      :collapsed="sprint"
      @collapse="collapseTool"
    />
    <AdminMultiTool
      entityName="feature"
      linkAddress="/api/v1/features/"
      :collapsed="feature"
      @collapse="collapseTool"
    />
    <AdminMultiTool
      entityName="feature-team-order"
      linkAddress="/api/v1/feature-team-orders/"
      :collapsed="featureTeamOrder"
      @collapse="collapseTool"
    />
    <AdminMultiTool
      entityName="developer"
      linkAddress="/api/v1/developers/"
      :collapsed="developer"
      @collapse="collapseTool"
    />
    <AdminMultiTool
      entityName="developer-team"
      linkAddress="/api/v1/developer-teams/"
      :collapsed="developerTeam"
      @collapse="collapseTool"
    />
  </div>
</template>

<script lang="ts">
import AdminMultiTool from "@/components/AdminMultiTool.vue";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      sprint: true as boolean,
      feature: true as boolean,
      featureTeamOrder: true as boolean,
      developer: true as boolean,
      developerTeam: true as boolean,
    };
  },
  methods: {
    closeAll() {
      this.sprint = true;
      this.feature = true;
      this.featureTeamOrder = true;
      this.developer = true;
      this.developerTeam = true;
    },
    collapseTool(entity: string) {
      this.closeAll();
      switch (entity) {
        case "sprint":
          this.sprint = false;
          break;
        case "feature":
          this.feature = false;
          break;
        case "feature-team-order":
          this.featureTeamOrder = false;
          break;
        case "developer":
          this.developer = false;
          break;
        case "developer-team":
          this.developerTeam = false;
          break;
      }
    },
  },
  components: {
    AdminMultiTool,
  },
});
</script>
<style scoped>
.main__frame {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
