<template>
  <div class="wrapper" v-loading="loading">
    <!-- 数据测试 -->
    <!-- <p>data:{{ data }}</p> -->

    <!-- 批量操作 -->
    <BtnGroup :btns="actionBtns" @group-btn-click="onGroupBtnClick">
      <template #delete>
        <el-icon><Delete /></el-icon>
      </template>

      <template #export>
        <el-icon><DocumentCopy /></el-icon>
      </template>

      <template #add>
        <el-icon><Plus /></el-icon>
      </template>
    </BtnGroup>

    <!-- 表格 -->
    <!-- :sortBy="{ prop: '_id', order: 'ascending' }" -->
    <EpTable
      :tableData="tableData"
      :dataKeys="dataKeys"
      @etSelectionChange="handleSelectionChange"
      :page-size="10"
      :total="data?.length"
      @ep-current-change="onPageChange"
    ></EpTable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Plus, Delete, DocumentCopy } from "@element-plus/icons-vue";

import BtnGroup from "@components/BtnGroup.vue";
import EpTable from "@components/EpTable2.vue";

import useAxios from "@hooks/useAxios";
import { getAllUsers } from "@api/userApi";

const actionBtns = [
  {
    name: "删除",
    type: "danger",
    slot: "delete",
    action: "patchDelete",
  },
  {
    name: "导出",
    type: "success",
    slot: "export",
  },
  {
    name: "添加",
    type: "primary",
    slot: "add",
    action: "addFilm",
  },
];

const onGroupBtnClick = (e) => {
  console.log("onGroupBtnClick", e);
};

const { data, err, loading } = useAxios(getAllUsers, [], null, 500);

const pageSize = 10;
const tableData = computed(() =>
  data.value?.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  )
);

const dataKeys = computed(() =>
  tableData.value ? Object.keys(tableData.value[0]).slice(1) : []
);

const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  console.log("handleSelectionChange", val);
  multipleSelection.value = val;
};

const currentPage = ref(1);
const onPageChange = (arg) => {
  console.log("onPageChange", arg);
  currentPage.value = arg;
};
</script>

<style lang="scss" scoped></style>
