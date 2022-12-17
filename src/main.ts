import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronLeft,
  faCirclePlus,
  faPen,
  faTrashCan,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPen, faTrashCan, faCirclePlus, faChevronLeft, faUserPen);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
