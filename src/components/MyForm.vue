<template>
    <a-row>
        <a-form :model="FormData" :name="formname" :label-col="{ span: 6 }" :wrapper-col="{ span: 0 }"
            @finish="onFinish" @finishFailed="onFinishFailed" style="width: 100%;margin-top: 15px;" layout="inline"
            labelAlign="left">

            <a-col v-for="item in FormHead" :key="item.id" :span="item.span">
                <a-form-item :label="item.label" :name="item.name"
                    :rules="[{ required: item.required, message: item.errorMesg }]">
                    <component :is="item.component"></component>
                </a-form-item>
            </a-col>

        </a-form>
    </a-row>
</template>

<script lang="ts" setup>

const props = defineProps(["formname", "FormHead", "FormData"]);
const emit = defineEmits(['submit'])

const onFinish = (values: any) => {

    emit("submit", values)

};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>

<style scoped lang="less"></style>