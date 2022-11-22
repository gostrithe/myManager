<template>
  <div class="wrapper">
    <div>
      <!-- <p class="placeholder">MyContent</p> -->
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
            <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  padding: 0px;
}
</style>
