import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "/",
        component: () => import("../components/index/allCosmetic.vue"),
      },
      {
        path: "category/:id",
        name: "category",
        component: () => import("../components/index/cateCosmetic.vue"),
      },
    ],
  },
  {
    path: "/message",
    component: () => import("../views/message/Message.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/order/Order.vue"),
  },
  {
    path: "/user",
    component: () => import("../views/user/Home.vue"),
    children: [
      {
        path: "home",
        component: () => import("../components/user/HomePage.vue"),
      },
      {
        path: "userModify",
        component: () => import("../components/user/userModify.vue"),
      },
      {
        path: "firmModify",
        component: () => import("../components/user/firmModify.vue"),
      },
      {
        path: "favorite",
        component: () => import("../components/user/Favorite.vue"),
      },
      {
        path: "firm/cosmetics",
        component: () => import("../components/firm/Cosmetics.vue"),
      },
    ],
  },
  {
    path: "/register_user",
    component: () => import("../views/user/RegisterUser.vue"),
  },
  {
    path: "/register_firm",
    component: () => import("../views/user/RegisterFirm.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/user/Login.vue"),
  },
  {
    path: "/cosmeticInfo/:ISBN",
    name: "cosmeticInfo",
    component: () => import("../views/cosmeticInfo/CosmeticInfo.vue"),
  },
  {
    path: "/submitOrder/:ISBN",
    name: "submitOrder",
    component: () => import("../views/purchase/SubmitOrder.vue"),
  },
  {
    path: "/confirmOrder/:ISBN",
    name: "confirmOrder",
    component: () => import("../views/purchase/ConfirmOrder.vue"),
  },
  {
    path: "/orderPay/:id",
    name: "orderPay",
    component: () => import("../views/order/OrderPay.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
