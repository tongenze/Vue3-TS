/** @format */

import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw, } from "vue-router";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue")
  },
  {
    path: "/home",
    redirect: "/home/welcome",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    children: [
      {
        path: "/home/welcome",
        name: "welcome",
        component: () => import("@/views/WelcomeView.vue"),
      },
      {
        path: "/home/content",
        name: "content",
        component: () => import("@/views/ContentView.vue"),
        children: []
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const setRoutes = () => {
  for (let i = 0; i < store.state.ShowRoutes.length; i++) {
    const item = store.state.ShowRoutes[i]
    router.addRoute(
      "content",
      {
        name: item.name,
        path: item.path,
        component: () => import(`@/pages/${item.component}`)
      })
  }
}




//路由守卫，包含动语路由刷新无页面处理
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem("user")
  if (to.path === "/login") {
    return next()
  }
  if (!token) {
    return next("/login")
  } else {

    //判断是否有值 无值代表用户刷新 需重新添加路由及菜单
    const route = JSON.parse(window.sessionStorage.getItem("routes")!)
    if (store.state.ShowRoutes.length == 0) {
      if (route[0] == "") {
        console.log("无权限")
      } else {
        //设置菜单
        store.commit("ShowMenuAndRoute")
        //设置路由
        setRoutes()
        if (window.sessionStorage.getItem("tag")) {
          store.commit("ReloadTag", JSON.parse(window.sessionStorage.getItem("tag")!))
        }
        return next(to.path)
      }
    }
    return next()
  }
})


export default router;
