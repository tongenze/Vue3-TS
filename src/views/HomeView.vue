<!-- @format -->

<template>
    <a-layout style="height: 100vh">
        <a-layout-sider v-model:collapsed="state.collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <a-menu v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys" mode="inline"
                theme="dark" :items="items" @click="handleClick"></a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header class="header" style="background: #fff; padding: 0 40px 0 20px;font-size: 20px;">
                <menu-unfold-outlined v-if="state.collapsed" class="trigger" @click="toggleCollapsed" />
                <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />
                <PoweroffOutlined style="float: right; margin-top: 20px;" @click="LogOut"></PoweroffOutlined>
            </a-layout-header>
            <a-layout-content :style="{
                margin: '12px 8px',
                padding: '16px',
                background: '#fff',
                minHeight: '280px',
            }">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, h, onMounted } from "vue";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    PoweroffOutlined,

} from "@ant-design/icons-vue";
import { ItemType } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";




const store = useStore();
const router = useRouter();
const state = reactive({
    collapsed: false,
    selectedKeys: [],
    openKeys: [],
    preOpenKeys: [],
});


const items: ItemType[] = reactive([]);
var menudata = store.state.ShowMenuData;
for (let i = 0; i < menudata.length; i++) {
    let arr: ItemType[] = []
    for (let j = 0; j < menudata[i].children.length; j++) {
        arr.push({ key: menudata[i].children[j].key, label: menudata[i].children[j].label, title: menudata[i].children[j].title })
    }
    items.push({
        key: menudata[i].key,
        label: menudata[i].label,
        title: menudata[i].title,
        children: arr,
        icon: () => {
            //添加icon
            if (menudata[i].key === '1') return h(PieChartOutlined)
            if (menudata[i].key === '2') return h(MailOutlined)
            return h('')
        },
    });
}




watch(
    () => state.openKeys,
    (_val, oldVal) => {
        state.preOpenKeys = oldVal;
    }
);
const toggleCollapsed = () => {
    state.collapsed = !state.collapsed;
    state.openKeys = state.collapsed ? [] : state.preOpenKeys;
};
const handleClick = (obj: any) => {
    router.push(obj.key)
    store.commit("AddTag", obj)
};
const LogOut = () => {
    router.push("/login")
    window.sessionStorage.clear()
    store.commit("ClearState")
}
</script>

<style scoped lang="less">
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

.header :hover {
    color: #3a8cff;
}
</style>
