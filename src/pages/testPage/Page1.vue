<template>
    <MyForm formname="page1" :FormHead="FormHead" :FormData="FormData" @submit="Submit" />
    <MyTable :dataSource="dataSource" :columns="columns" :editableData="editableData" @edit="edit" @save="save"
        @cancel="cancel" />
</template>

<script lang="ts" setup>
defineOptions({
    name: 'page1'
})
import { Button, Input } from 'ant-design-vue';
import { h, reactive, ref, render } from 'vue';
import { cloneDeep } from 'lodash-es';
const FormData = reactive({ username: "", usercode: "" })
const FormHead = reactive([
    {
        id: 1,
        span: 6,
        label: "挑剔",
        name: "username",
        required: true,
        errorMesg: "哈哈哈",
        component: () => h(Input, {
            autocomplete: "off",//取消输入提示
            onChange: (e: any) => { FormData.username = e.target.value },
        })
    },
    {
        id: 2,
        span: 6,
        label: "第三方",
        name: "usercode",
        required: true,
        errorMesg: "阿斯达",
        component: () => h(Input, {
            autocomplete: "off",
            onChange: (e: any) => { FormData.usercode = e.target.value }
        })
    },
    {
        id: 3,
        span: 6,
        component: () => h(Button, { htmlType: "submit", type: "primary" }, () => "提交")
    }
])


import type { UnwrapRef } from 'vue';

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        component: () => h(Input, {
            value: "",
            autocomplete: "off",
        })
    },
    {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        component: () => h(Input, {
            autocomplete: "off",
        })
    },
    {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        component: () => h(Input, {
            autocomplete: "off",
        })
    },
    {
        title: 'operation',
        dataIndex: 'operation',

    },
];
interface DataItem {
    key: string;
    name: string;
    age: number;
    address: string;
}
const data: DataItem[] = [];

for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

const dataSource = ref(data);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
const Submit = (values: any) => {
    console.log(values)
}
const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = (record: any) => {
    console.log(record)
    Object.assign(dataSource.value.filter(item => record.key === item.key)[0], editableData[record.key]);
    delete editableData[record.key];
};
const cancel = (key: string) => {
    delete editableData[key];
};
</script>