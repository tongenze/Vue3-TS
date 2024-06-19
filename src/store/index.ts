import router from '@/router';
import { createStore } from 'vuex'


interface menuItem {
  id: number;
  key: string;
  label: string;
  title: string;
  children?: menuItem[]
}
interface routeItem {
  id: number;
  path: string;
  name: string;
  component: string
}
interface TagItem {
  key: string;
  name: string;
  active: boolean;
}
export default createStore({
  state: {
    MenuData: [
      {
        id: 1,
        key: '1',
        label: 'Navigation One',
        title: 'Navigation One',
        children: [
          {
            id: 1,
            key: "/home/content/page1",
            label: 'Navigation page1',
            title: 'Navigation page1',
          },
          {
            id: 2,
            key: "/home/content/page2",
            label: 'Navigation page2',
            title: 'Navigation page2',
          },
          {
            id: 3,
            key: "/home/content/page3",
            label: 'Navigation page3',
            title: 'Navigation page3',
          }
        ]
      },
      {
        id: 2,
        key: '2',
        label: 'Navigation two',
        title: 'Navigation two',
        children: [
          {
            id: 4,
            key: "/home/content/page4",
            label: 'Navigation page4',
            title: 'Navigation page4',
          },
          {
            id: 5,
            key: "/home/content/page5",
            label: 'Navigation page5',
            title: 'Navigation page5',
          },
        ]
      },

    ],
    Routes: [
      {
        id: 1,
        path: "/home/content/page1",
        name: 'page1',
        component: 'testPage/Page1.vue',
      },
      {
        id: 2,
        path: "/home/content/page2",
        name: 'page2',
        component: 'testPage/Page2.vue',
      },
      {
        id: 3,
        path: "/home/content/page3",
        name: 'page3',
        component: 'testPage/Page3.vue',
      },
      {
        id: 4,
        path: "/home/content/page4",
        name: 'page4',
        component: 'testPage/Page4.vue',
      },
      {
        id: 5,
        path: "/home/content/page5",
        name: 'page5',
        component: 'testPage/Page5.vue',
      },
    ],
    ShowMenuData: [] as menuItem[],
    ShowRoutes: [] as routeItem[],
    Tags: [] as TagItem[],
    cacheKeepAlive: [] as string[],
  },
  getters: {
  },
  mutations: {
    ShowMenuAndRoute(state) {
      const routes_arry = JSON.parse(window.sessionStorage.getItem("routes") as string)
      const { MenuData, Routes, ShowMenuData, ShowRoutes } = state
      //菜单
      let menulist: number[] = []
      for (let i = 0; i < MenuData.length; i++) {
        let item = MenuData[i]
        for (let j = 0; j < item.children.length; j++) {
          let child: menuItem = item.children[j]
          if (routes_arry.indexOf(child.id) >= 0) {
            if (menulist.indexOf(item.id) >= 0) {
              ShowMenuData[menulist.indexOf(item.id)].children!.push(child)
            } else {
              ShowMenuData.push({ id: item.id, key: item.key, label: item.label, title: item.title, children: [child] } as menuItem)
              menulist.push(item.id)
            }
          }
        }
      }
      //路由
      for (let i = 0; i < Routes.length; i++) {
        let item = Routes[i]
        if (routes_arry.indexOf(item.id) >= 0) {
          ShowRoutes.push(item)
        }
      }
    },
    AddTag(state, obj) {
      //添加tag
      let is = state.Tags.find((i) => i.key === obj.key)
      if (!is) {
        for (let i = 0; i < state.Tags.length; i++) {
          state.Tags[i].active = false
        }
        let i = { key: obj.key, name: obj.item.title, active: true }
        state.Tags.push(i)
        window.sessionStorage.setItem("tag", JSON.stringify(i))
      } else {
        router.push(obj.key)
        for (let i = 0; i < state.Tags.length; i++) {
          const e = state.Tags[i];
          if (e.key === obj.key) {
            e.active = true
            window.sessionStorage.setItem("tag", JSON.stringify(e))
          } else {
            e.active = false
          }
        }
      }
      //添加组件进入缓存 注意路由name和组件name  需要相同
      if (!is) {
        for (let i = 0; i < state.Routes.length; i++) {
          if (state.Routes[i].path === obj.key) {
            state.cacheKeepAlive.push(state.Routes[i].name)
            break
          }
        }
      }

    },
    AddCacheCom() { },
    ClickTag(state, obj) {
      for (let i = 0; i < state.Tags.length; i++) {
        const e = state.Tags[i];
        if (e.key === obj.key) {
          e.active = true
          window.sessionStorage.setItem("tag", JSON.stringify(e))
        } else {
          e.active = false
        }
      }
    },
    RemoveTag(state, obj) {
      for (let i = 0; i < state.Tags.length; i++) {
        const e = state.Tags[i];
        if (e.key === obj.key) {
          state.Tags.splice(i, 1)
          break
        }
      }
      //移除标签 移除组件缓存
      for (let i = 0; i < state.Routes.length; i++) {
        if (state.Routes[i].path === obj.key) {
          for (let j = 0; j < state.cacheKeepAlive.length; j++) {
            if (state.cacheKeepAlive[j] === state.Routes[i].name) {
              state.cacheKeepAlive.splice(j, 1)
              break
            }
          }
        }
      }
    },
    ReloadTag(state, obj) {
      state.Tags.push(obj)
      for (let i = 0; i < state.Routes.length; i++) {
        if (state.Routes[i].path === obj.key) {
          state.cacheKeepAlive.push(state.Routes[i].name)
          break
        }
      }
    },
    ClearState(state) {
      state.ShowMenuData = []
      state.ShowRoutes = []
      state.Tags = []
    }
  },
  actions: {
  },
  modules: {
  }
})



