<template>
    <div>
        <div class="tags">
            <div v-for="item in TagData" :key="item.key"
                :class="item.active ? 'tag_div tag_div_active' : 'tag_div tag_div_unactive'">
                <a-tag :color="item.active ? 'processing' : 'default'" class="tag_item" closable @click="ClickTag(item)"
                    @close="CloseTag(item)">{{
                        item.name }}</a-tag>
            </div>
        </div>
        <div>
            <router-view v-slot="{ Component }">
                <keep-alive :include="store.state.cacheKeepAlive">
                    <component :is="Component" />
                </keep-alive>
            </router-view>

            <div v-if="TagData.length === 0"><a-empty description="空单据" style="color:darkgray;" /></div>
        </div>
    </div>
</template>
<script setup lang="ts">

import router from '@/router';
import store from '@/store';
import { reactive } from 'vue';
interface TagItem {
    key: string;
    name: string;
    active: boolean;
}
const TagData = reactive<TagItem[]>(store.state.Tags)
const ClickTag = (obj: TagItem) => {
    router.push(obj.key)

    store.commit("ClickTag", obj)
}
const CloseTag = (obj: TagItem) => {
    //移除的是当前路由 需要跳转到下一个
    if (obj.active) {
        for (let i = 0; i < TagData.length; i++) {
            let e = TagData[i]
            if (e.key == obj.key) {
                if (TagData[i - 1] != undefined) {
                    router.push(TagData[i - 1].key)
                    store.commit("ClickTag", TagData[i - 1])
                    break
                } else if (TagData[i + 1] != undefined) {
                    router.push(TagData[i + 1].key)
                    store.commit("ClickTag", TagData[i + 1])
                    break
                } else {
                    router.push("/home/content")
                    window.sessionStorage.removeItem("tag")
                }
            }
        }
    }
    store.commit("RemoveTag", obj)
}
</script>

<style scoped lang="less">
@activeColor: rgb(72, 138, 218);

.tags {
    width: 100%;
    height: 30px;
    border-bottom: 2px solid rgb(229, 229, 229);

}

.tag_div {

    height: 100%;
    float: left;
    margin-top: 2px;
    margin-right: 8px;

    .tag_item {
        margin: 0;
        font-size: 14px;
    }

    .tag_item:hover {
        cursor: pointer
    }

}

.tag_div_active {
    border-bottom: 2px solid @activeColor;
}

.tag_div_unactive {
    border: none;
}

.tag_div:hover {

    border-bottom: 2px solid @activeColor;
}
</style>