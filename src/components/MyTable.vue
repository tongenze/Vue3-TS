<template>
    <div style="margin-top: 15px;">
        <!-- <a-table :dataSource="dataSource" :columns="columns" bordered size="small" /> -->

        <a-table :columns="columns" :data-source="dataSource" bordered style="height: 500px;">
            <template #bodyCell="{ column, text, record }">
                <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
                    <div>
                        <component :is="column.component" v-if="editableData[record.key]"></component>
                        <!-- <a-input v-if="editableData[record.key]"
                            v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" /> -->
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'operation'">
                    <div class="editable-row-operations">
                        <span v-if="editableData[record.key]">
                            <a-typography-link @click="save(record)">Save</a-typography-link>
                            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                                <a>Cancel</a>
                            </a-popconfirm>
                        </span>
                        <span v-else>
                            <a @click="edit(record.key)">Edit</a>
                        </span>
                    </div>
                </template>
            </template>
        </a-table>
    </div>

</template>

<script lang="ts" setup>
const props = defineProps(["dataSource", "columns", "editableData"]);
const emit = defineEmits(["edit", "save", "cancel"])


const edit = (key: string) => {
    emit("edit", key)
};
const save = (record: any) => {
    emit("save", record)
};
const cancel = (key: string) => {
    emit("cancel", key)
};
</script>

<style scoped lang="less"></style>