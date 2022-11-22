<template>
  <div class="card middle" v-if="tableData">
    <!-- <p>{{ dataKeys }}</p> -->
    
    <el-table
      :data="tableData"
      :default-sort="sortBy"
      @selection-change="(val) => emit(`etSelectionChange`, val)"
    >
      <el-table-column type="selection" />

      <el-table-column
        v-for="key in dataKeys"
        :key="key"
        :prop="key"
        :label="key"
        sortable
        :fixed="index === 1"
      />

      <!-- <el-table-column prop="username" label="用户名" sortable fixed />
      <el-table-column prop="password" label="密码" sortable />
      <el-table-column prop="admin" label="管理员" sortable /> -->

      <!-- <el-table-column
        prop="name"
        label="片名"
        sortable
        width="180"
        :formatter="formatters['name']"
      /> -->

      <!-- <el-table-column label="海报" width="60">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-image :src="scope.row.poster" />
          </div>
        </template>
      </el-table-column> -->

      <!-- <el-table-column
        prop="actors"
        label="主演"
        width="200"
        sortable
        :formatter="formatters['actors']"
      /> -->

      <!-- <el-table-column
        prop="grade"
        label="评分"
        width="80"
        sortable
        :formatter="formatters['grade']"
      /> -->

      <!-- <el-table-column
        prop="premiereAt"
        label="首映日期"
        width="150"
        sortable
        :formatter="formatters['premiereAt']"
      /> -->

      <!-- fix-right -->
      <el-table-column fixed="right" label="操作" align="center" width="120">
        <template #default="scope">
          <el-button
            type="primary"
            :icon="Edit"
            plain
            circle
            size="default"
            @click="$router.push(`/film/${scope.row._id}`)"
          />
          <el-button type="danger" :icon="Delete" plain circle size="default" />
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 分页器 -->
  <div class="card bottom">
    <el-pagination
      :page-size="pageSize"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="(e) => emit(`epCurrentChange`, e)"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { Delete, Edit } from "@element-plus/icons-vue";

const { tableData, dataKeys, formatters, sortBy, pageSize, total } =
  defineProps({
    tableData: Object,
    dataKeys: Array,
    formatters: Object,
    sortBy: Object,
    pageSize: Number,
    total: Number,
  });

const emit = defineEmits({
  etSelectionChange: null,
  epCurrentChange: null,
});
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
