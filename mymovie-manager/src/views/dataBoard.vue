<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <BarRace v-if="data1.length" :data1="data1" ></BarRace>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <LineChart></LineChart>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import BarRace from '../components/Bar-race.vue';
import LineChart from '../components/LineChart.vue';
import { getPlayings } from '../api/filmApi';

const data1 = ref([])
onMounted(() => {
    getPlayings().then((data) => {
        data1.value = data.map(item => item.name)
        console.log(data1);
    })
})

</script>

<style lang="scss">
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>