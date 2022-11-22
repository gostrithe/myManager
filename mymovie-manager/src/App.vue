<template>
  <!-- 页头 -->
  <div class="epHeader" v-if="!$route.meta.hideFrame">
    <div class="left" @click="$router.back">
      <el-icon><ArrowLeftBold /></el-icon>
    </div>

    <div class="middle">欢迎光临卖座电影管理后台</div>

    <div class="right">
      <el-avatar
        :size="30"
        class="mr-3"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <span class="content-elem"
        >欢迎回来: <span class="pointer username" v-change="{color:'cyan'}">{{ username }}</span></span
      >
      <el-icon size="24" class="content-elem pointer" v-change="{color:'cyan'}"><SwitchButton /></el-icon>
    </div>
  </div>

  <!-- 内容 -->
  <div class="root">
    <div class="left" v-if="!$route.meta.hideFrame">
      <MyMenu :activeIndex="currentMenuIndex" @menu-index-change="onMenuIndexChange"></MyMenu>
    </div>

    <div class="right" scroll="no">
      <MyContent></MyContent>
    </div>
  </div>
</template>

<script setup>
import { computed,ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useStore } from "vuex";
import MyContent from "@views/MyContent.vue";
import MyMenu from "@views/MyMenu.vue";
import { ArrowLeftBold, SwitchButton } from "@element-plus/icons-vue";

const store = useStore();
const username = computed(() => store.state.userInfo.user.username);

const currentMenuIndex = ref("2-2")
const onMenuIndexChange = idx => currentMenuIndex.value = idx
</script>

<style lang="scss" scoped>
@import "@assets/variable.scss";
@import "@assets/mixin.scss";

.epHeader {
  height: 60px;
  background-color: rgb(50, 68, 129);
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;

  .left {
    background-color: rgba($color: #fff, $alpha: 0.1);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    @include centeredFlexBox;
    color: white;
    cursor: pointer;
  }

  .middle {
    margin-left: 10px;
    font-size: 18px;
    // color: rgb(146, 251, 255);
    font-style: italic;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;

    .content-elem {
      margin-left: 10px;
      color: white;
    }

    .username {
      color: $myYellow;
    }
  }
}

.root {
  display: flex;
  margin-top: 10px;
  background-color: $graye;
  height: calc(100% - 55px);

  .left {
    // width: 200px;
    padding-right: 1px;
    border-right: 1px solid $grayd;
    margin-right: -1px;
  }

  .right {
    flex-grow: 1;
    overflow: scroll;
    padding: 15px;
  }
}
</style>
