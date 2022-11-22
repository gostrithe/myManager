<template>
  <div class="wrapper" v-loading="loading">
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
    <EpTable
      :tableData="tableData"
      :sortBy="{ prop: 'filmId', order: 'descending' }"
      :formatters="formatters"
      @etSelectionChange="handleSelectionChange"
      
      :page-size="10"
      :total="data?.length"
      @ep-current-change="onPageChange"
    ></EpTable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Plus,
  Close,
  DocumentCopy,
  Delete,
  Edit,
} from "@element-plus/icons-vue";

import { getPreviews, deletePreviews } from "@api/previewApi";
import useAxios from "@hooks/useAxios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

import BtnGroup from "../../components/BtnGroup.vue";
import EpTable from "../../components/EpTable.vue";

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

const router = useRouter();
const { data, err, loading } = useAxios(getPreviews, [], null, 500);

const actorFormatter = (row, column) => {
  return (
    row.actors
      .map((actor) => actor.name)
      .slice(0, 3)
      .join("、") + "等"
  );
};

const premiereFormatter = (row) =>
  new Date(row.premiereAt * 1000).toLocaleDateString().replaceAll("/", "-");

const gradeFormatter = (row) => (row.grade ? row.grade * 1 : 0).toFixed(1);

const nameFormatter = (row) =>
  row.name.length < 10 ? row.name : row.name.slice(0, 10) + "...";

const formatters = {
  actors: actorFormatter,
  premiereAt: premiereFormatter,
  grade: gradeFormatter,
  name: nameFormatter,
};

const handleClick = () => console.log("handleClick");

// const multipleTableRef = ref();

const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  console.log("handleSelectionChange", val);
  multipleSelection.value = val;
};

const pageSize = 10;
const tableData = computed(() =>
  data.value?.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  )
);

const currentPage = ref(1);
const onPageChange = (arg) => {
  console.log("onPageChange", arg);
  currentPage.value = arg;
};

/* 批量删除电影 */
const patchDelete = async () => {
  // console.log("ready to delete:",multipleSelection.value);
  const ids = multipleSelection.value.map((film) => film._id);
  console.log("patchDelete ids=", ids);

  const results = await deletePreviews(ids);
  console.log("results=", results);

  results.forEach(({ status }) => {
    if (status === "fulfilled") {
      ElMessage({
        message: "数据删除成功",
        type: "success",
      });
    } else {
      ElMessage("删除数据失败", status);
    }
  });

  setTimeout(() => {
    window.location.reload();
  }, 500);
};

/* 新增电影 */
const addFilm = () => {
  router.push("/film/0");
};

const actions = {
  addFilm,
  patchDelete,
};
const onGroupBtnClick = (e) => {
  console.log("onGroupBtnClick", e);
  e && actions[e]();
};
</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  background-color: white;
  border-radius: 5px;
}

.middle {
  margin-bottom: 5px;
}

.bottom {
  padding: 5px;
}
</style>
