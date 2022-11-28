import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "dashboard",
    component: () => import("../views/MainDashboardView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/AdminView.vue"),
  },
  {
    path: "/sprint/create",
    name: "sprintCreate",
    component: () => import("../views/form-views/SprintFormCreateView.vue"),
  },
  {
    path: "/sprint/:id/edit",
    name: "sprintEdit",
    component: () => import("../views/form-views/SprintFormEditView.vue"),
  },
  {
    path: "/feature/create",
    name: "featureCreate",
    component: () => import("../views/form-views/FeatureFormCreateView.vue"),
  },
  {
    path: "/feature/:id/edit",
    name: "featureEdit",
    component: () => import("../views/form-views/FeatureFormEditView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
