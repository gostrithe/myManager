<template>
  <div class="wrapper">
    <!-- <p class="title">NowPlaying</p> -->
    <!-- <p>data: {{ data }}</p> -->
    <!-- <p>err: {{ err }}</p> -->

    <p v-if="loading">Loading...</p>

    <div v-else>
      <!-- 批量操作 -->
      <div class="mb-8 card top">
        <el-button class="opBtn" type="danger" @click="patchDelete">
          <el-icon><Close /></el-icon>&nbsp;删除
        </el-button>

        <el-button class="opBtn" type="success"
          ><el-icon><DocumentCopy /></el-icon>&nbsp; 导出</el-button
        >

        <el-button class="opBtn" type="primary" @click="addFilm">
          <el-icon><Plus /> </el-icon> 
          &nbsp; 添加
        </el-button>
      </div>

      <!-- 表格 -->
      <div class="card middle">
        <el-table
          ref="multipleTableRef"
          :data="tableData"
          :default-sort="{ prop: 'filmId', order: 'descending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40" />

          <el-table-column prop="filmId" label="id" sortable width="80" fixed />

          <el-table-column
            prop="name"
            label="片名"
            sortable
            width="180"
            :formatter="nameFormatter"
          />

          <el-table-column label="海报" width="60">
            <template #default="scope">
              <div style="display: flex; align-items: center">
                <el-image :src="scope.row.poster" />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="actors"
            label="主演"
            width="200"
            sortable
            :formatter="actorFormatter"
          />

          <el-table-column prop="nation" label="国家" width="100" sortable />

          <el-table-column prop="category" label="类型" width="150" sortable />

          <el-table-column prop="runtime" label="片长" width="80" sortable />

          <el-table-column
            prop="grade"
            label="评分"
            width="80"
            sortable
            :formatter="gradeFormatter"
          />

          <el-table-column
            prop="premiereAt"
            label="首映日期"
            width="150"
            sortable
            :formatter="premiereFormatter"
          />

          <!-- fix-right -->
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="120"
          >
            <template #default="scope">
              <el-button
                type="primary"
                :icon="Edit"
                plain
                circle
                size="default"
                @click="$router.push(`/film/${scope.row._id}`)"
              />
              <el-button
                type="danger"
                :icon="Delete"
                plain
                circle
                size="default"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页器 -->
      <div class="card bottom">
        <el-pagination
          :page-size="10"
          background
          layout="prev, pager, next"
          :total="data?.length"
          @current-change="onPageChange"
        />
      </div>
    </div>
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

import { getPlayings, deleteFilms } from "@api/filmApi";
import useAxios from "@hooks/useAxios";
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const { data, err, loading } = useAxios(getPlayings);

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

const handleClick = () => console.log("handleClick");

const multipleTableRef = ref();
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  console.log("handleSelectionChange", val);
  multipleSelection.value = val;
};

const pageSize = 10;
const currentPage = ref(1);
const tableData = computed(() =>
  data.value?.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  )
);
const onPageChange = (arg) => {
  console.log("onPageChange", arg);
  currentPage.value = arg;
};

/* 批量删除电影 */
const patchDelete = async () => {
  // console.log("ready to delete:",multipleSelection.value);
  const ids = multipleSelection.value.map((film) => film._id);
  console.log("patchDelete ids=", ids);

  const results = await deleteFilms(ids);
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
  router.push("/film/0")
}

</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  background-color: white;
  border-radius: 5px;
}

.top,
.middle {
  margin-bottom: 5px;
}

.top {
  display: flex;
  justify-content: flex-end;
  .opBtn {
    width: 100px;
  }
}

.bottom {
  padding: 5px;
}
</style>
