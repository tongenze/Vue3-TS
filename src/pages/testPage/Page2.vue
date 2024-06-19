<template>
    <MyForm formname="page2" :FormHead="FormHead" :FormData="FormData" @submit="Submit" />
</template>

<script lang="ts" setup>
defineOptions({
    name: 'page2'
})

import { Button, Input } from 'ant-design-vue';
import { h, reactive, render } from 'vue';

const FormData = reactive({ username: "", usercode: "" })

const FormHead = reactive([
    {
        id: 1,
        span: 6,
        label: "急需",
        name: "username",
        required: true,
        errorMesg: "哈哈哈",
        component: () => h(Input, {
            onChange: (e: any) => { FormData.username = e.target.value }
        })
    },
    {
        id: 2,
        span: 6,
        label: "啊师傅",
        name: "usercode",
        required: true,
        errorMesg: "阿斯达",
        component: () => h(Input, {
            onChange: (e: any) => { FormData.usercode = e.target.value }
        })

    },
    {
        id: 3,
        span: 6,
        component: () => h(Button, { htmlType: "submit", type: "primary" }, () => "提交")
    }
])
const Submit = (values: any) => {
    console.log(values)
}

</script>