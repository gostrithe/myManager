<template>
  <div class="wholeBox">
    <el-container>
      <el-header v-if="route.path !== '/login'">
        <el-page-header :icon="ArrowLeft" title="返回" @back="$router.back">
          <template #content>
            <span class="text-large font-600 mr-3"> 欢迎光临盗版卖票电影管理后台 </span>
          </template>
          <template #extra>
            <div class="flex items-center right">
              <el-avatar :size="24" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span class="welcome">欢迎回来:&nbsp;</span>
              <span class="userName">{{ store.state.user?.username }}</span>
              <el-button @click="loginAgain" size="small" :icon="SwitchButton" circle />
            </div>
          </template>
        </el-page-header>
      </el-header>

      <el-container>
        <el-aside width="200px" v-if="route.path !== '/login'">
          <!-- <el-menu :router="true" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            :default-active="route.params.id ? '/film/nowPlaying' : route.fullPath" text-color="#fff" @open=""
            @close="">
            <el-menu-item index="/">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>数据看板</span>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>影片</span>
              </template>
              <el-menu-item index="/film/nowPlaying">正在热映</el-menu-item>
              <el-menu-item index="/film/comings">即将上映</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>影院管理</span>
              </template>
              <el-sub-menu index="3-1">
                <template #title>
                  <el-icon>
                    <location />
                  </el-icon>
                  <span>热门城市</span>
                </template>
                <el-menu-item index="3-1-1">北京</el-menu-item>
                <el-menu-item index="3-1-2">上海</el-menu-item>
                <el-menu-item index="3-1-3">广州</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="3-2">
                <el-icon>
                  <setting />
                </el-icon>
                <span>所有城市</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="4">
              <el-icon>
                <setting />
              </el-icon>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon>
                <setting />
              </el-icon>
              <span>抓取数据</span>
            </el-menu-item>
          </el-menu> -->
          <myMenu :menuJson="menuJson" ></myMenu>
        </el-aside>

        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="slide-fade" mode="out-in">
              <keep-alive>
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import myMenu from './components/myMenu.vue';
import menuJson from './components/menu.json';
import adminRoutes from "./router/routes/adminRoutes";

import { ArrowLeft } from '@element-plus/icons-vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import store from "@store/index";
import { ElMessage, ElMessageBox } from 'element-plus';

const route = useRoute();
const router = useRouter();

const loginAgain = () => {
  store.dispatch('quit');
  router.push('/login');
};

// const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }

</script>

<style lang="scss">
.el-header {
  background-color: rgb(48, 48, 117);
  color: #ddd;

  .el-page-header__content {
    color: #ddd;
  }
}

// 深度选择器 :deep()

.el-aside {
  border-right: 4px solid rgb(67, 74, 80);
  overflow: hidden !important;

  .el-menu {
    border-right: 0;
  }
}

.wholeBox {
  margin-top: 10px;
  background-color: #ccc;
}

.right {
  display: flex;
  align-items: center;

  .welcome {
    margin-left: 6px;
  }

  .userName {
    color: #ffd04b;
    margin-right: 6px;
  }
}
</style>