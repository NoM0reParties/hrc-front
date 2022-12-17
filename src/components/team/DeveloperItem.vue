<script lang="ts">
import { defineComponent, PropType } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { DeveloperDTO } from "@/dto/admin/developer";
import DeveloperLineForm from "@/components/team/DeveloperLineForm.vue";
import ModalConfirmWindow from "@/components/utilities/ModalConfirmWindow.vue";
import axios, { AxiosError } from "axios";

export default defineComponent({
  props: {
    developer: {
      type: Object as PropType<DeveloperDTO>,
      required: true,
    },
  },
  data() {
    return {
      deleteDeveloper: false,
      editDeveloper: false,
      delDeveloperData: {} as DeveloperDTO,
      currentFirstName: "",
      currentLastName: "",
      currentInvolvement: 0,
    };
  },
  methods: {
    async updateDeveloper() {
      axios
        .put(`/api/v1/developers/${this.developer.id}`, {
          first_name: this.currentFirstName,
          last_name: this.currentLastName,
          involvement: this.currentInvolvement,
          dev_team_id: this.developer.dev_team_id,
        })
        .then(() => {
          this.$emit("reload");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async removeDeveloper() {
      axios
        .delete(`/api/v1/developers/${this.delDeveloperData.id}`)
        .then(() => {
          this.$emit("reload");
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    },
    async editClick() {
      this.currentFirstName = this.developer.first_name;
      this.currentLastName = this.developer.last_name;
      this.currentInvolvement = this.developer.involvement;
      this.editDeveloper = true;
    },
    async saveChanges() {
      this.updateDeveloper();
      this.editDeveloper = false;
    },
    async firstNameChange(name: string) {
      this.currentFirstName = name;
    },
    async lastNameChange(name: string) {
      this.currentLastName = name;
    },
    async invChange(involvement: number) {
      this.currentInvolvement = involvement;
    },
    async deleteClick(developer: DeveloperDTO) {
      this.delDeveloperData = developer;
      this.deleteDeveloper = true;
    },
    async confirmRemove() {
      this.removeDeveloper();
      this.deleteDeveloper = false;
    },
    async cancelRemove() {
      this.deleteDeveloper = false;
    },
  },
  components: {
    DeveloperLineForm,
    ModalConfirmWindow,
  },
});
</script>

<template>
  <li>
    <div class="orders__item" v-if="!editDeveloper">
      <span class="order__item-col">{{ developer.first_name }}</span>
      <span class="order__item-col">{{ developer.last_name }}</span>
      <span class="order__item-col">
        {{ developer.involvement }}
      </span>
      <span class="order__item-col"
        ><font-awesome-icon
          icon="fa-solid fa-user-pen"
          class="action__btn"
          size="2x"
          @click="editDeveloper = true"
          v-if="!deleteDeveloper"
        />
        <font-awesome-icon
          class="action__btn"
          icon="fa-solid fa-trash-can"
          size="2x"
          @click="deleteClick(developer)"
          v-if="!deleteDeveloper"
        />
      </span>
    </div>
    <DeveloperLineForm
      :first-name="currentFirstName"
      :last-name="currentLastName"
      :involvement="currentInvolvement"
      @first="firstNameChange"
      @last="lastNameChange"
      @involvement="invChange"
      v-if="editDeveloper"
      @save="saveChanges"
      @cancel="editDeveloper = false"
    />
    <ModalConfirmWindow
      v-if="deleteDeveloper"
      :message="`Вы действительно хотите удалить разработчика ${delDeveloperData.first_name} ${delDeveloperData.last_name}`"
      action-message="Да"
      @confirm="confirmRemove"
      @cancel="cancelRemove"
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

.order__item-col-2 {
  width: 50%;
}

.action__btn {
  margin: 0 20px;
  border-radius: 10px;
  padding: 10px;
  color: white;
  cursor: pointer;
  background-color: cadetblue;
}
</style>
