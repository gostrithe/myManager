<template>
  <div style="padding-left: 20px">
    <el-switch
      v-model="isCollapse"
      inline-prompt
      active-text="展开"
      inactive-text="折叠"
    />
  </div>

  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @select="onSelect"
    background-color="#3a4149"
    text-color="#fff"
    active-text-color="#9fc9ff"
  >
    <el-menu-item index="1">
      <el-icon><PieChart /></el-icon>
      <template #title>
        <RouterLink to="/data">数据看板</RouterLink>
      </template>
    </el-menu-item>

    <!-- 影片管理 -->
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Film /></el-icon>
        <span>影片管理</span>
      </template>

      <el-menu-item index="2-1">
        <el-icon><VideoCamera /></el-icon>
        <RouterLink to="/film/nowPlaying">正在热映</RouterLink>
      </el-menu-item>

      <el-menu-item index="2-2">
        <el-icon><Loading /></el-icon>
        <RouterLink to="/film/comingSoon">即将上映</RouterLink>
      </el-menu-item>
    </el-sub-menu>

    <!-- 影院管理 -->
    <el-sub-menu index="3">
      <template #title>
        <el-icon><PictureFilled /></el-icon>
        <span>影院管理</span>
      </template>

      <!-- hot -->
      <el-sub-menu index="3-1">
        <template #title>
          <el-icon><Star /></el-icon>
          <span>热门城市</span>
        </template>
        <el-menu-item index="3-1-1">
          <RouterLink to="/cinema">北京</RouterLink>
        </el-menu-item>
        <el-menu-item index="3-1-2">
          <RouterLink to="/cinema">上海</RouterLink>
        </el-menu-item>
        <el-menu-item index="3-1-3">
          <RouterLink to="/cinema">广州</RouterLink>
        </el-menu-item>
        <el-menu-item index="3-1-4">
          <RouterLink to="/cinema">深圳</RouterLink>
        </el-menu-item>
      </el-sub-menu>

      <!-- special -->
      <!-- <el-sub-menu index="3-3">
        <template #title>
          <el-icon><location /></el-icon>
          <span>港澳台</span>
        </template>
        <el-menu-item index="3-3-1">香港</el-menu-item>
        <el-menu-item index="3-3-2">澳门</el-menu-item>
        <el-menu-item index="3-3-3">台北</el-menu-item>
      </el-sub-menu> -->

      <!-- mainland -->
      <el-menu-item index="3-2-1">
        <el-icon><Menu /></el-icon>
        <RouterLink to="/city">所有城市</RouterLink>
      </el-menu-item>
    </el-sub-menu>

    <!-- 用户管理 -->
    <el-menu-item index="4">
      <el-icon><User /></el-icon>
      <template #title>
        <RouterLink to="/user">用户管理</RouterLink>
      </template>
    </el-menu-item>

    <!-- 查看演示 -->
    <el-menu-item index="5">
      <el-icon><Grid /></el-icon>
      <template #title>
        <RouterLink to="/demos">案例管理</RouterLink>
      </template>
    </el-menu-item>

    <!-- 禁用示例 -->
    <!-- <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item> -->
  </el-menu>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from "vue";

import {
  Document,
  Menu,
  Location,
  User,
  Film,
  VideoCamera,
  Odometer,
  Loading,
  Star,
  PictureFilled,
  PieChart,
  Grid,
} from "@element-plus/icons-vue";

const { activeIndex } = defineProps({
  activeIndex: String,
});

const emit = defineEmits(["menuIndexChange"]);

const isCollapse = ref(false);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

// const notifyCurrentIndex = (idx) => {
//   console.log("notifyCurrentIndex", idx);
//   emit("menuIndexChange", idx);
// };

const onSelect = (idx) => {
  console.log("onSelect", idx);
  emit("menuIndexChange", idx);
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
