<template>
    <div>
        <el-menu :router="true" active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            :default-active="$route.params.id ? '/film/nowPlaying' : $route.fullPath" text-color="#fff" @open=""
            @close="">

            <template v-for="(menuItem, index) in menuJson">
                <el-menu-item v-if="!menuItem.submenu" :index="menuItem.path">
                    <el-icon ref="elIcon" v-if="menuItem.iconName">
                        <rederIcon :iconName="ElementPlusIconsVue[menuItem.iconName]"></rederIcon>
                    </el-icon>

                    <span>{{ menuItem.name }}</span>
                </el-menu-item>

                <el-sub-menu v-else :index="`subMenu${index}`">
                    <template #title>
                        <el-icon v-if="menuItem.iconName">
                            <rederIcon :iconName="ElementPlusIconsVue[menuItem.iconName]"></rederIcon>
                        </el-icon>
                        <span>{{ menuItem.name }}</span>
                    </template>
                    <myMenu :menuJson="menuItem.submenu" />
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import rederIcon from './renderIcon.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const { menuJson } = defineProps(['menuJson']);


</script>

<style scoped>
.el-sub-menu .el-menu-item {
    justify-content: center;
}
</style>