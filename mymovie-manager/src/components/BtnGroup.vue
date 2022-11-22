<template>
  <div class="card top">
    <el-button
      v-for="{ name, type, slot, action } in btns"
      class="opBtn"
      :type="type"
      @click="emit(`groupBtnClick`, `${action}`)"
    >
      <slot :name="slot"></slot>
      &nbsp; {{ name }}&nbsp;
    </el-button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const { btns } = defineProps({
  btns: Array,
});

const emit = defineEmits(["groupBtnClick"]);
</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  background-color: white;
  border-radius: 5px;
}

.top {
  margin-bottom: 5px;
}

.top {
  display: flex;
  justify-content: flex-end;
  .opBtn {
    width: 100px;
  }
}
</style>
