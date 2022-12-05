<template>
    <div style="height: 40vh; border-radius: 8px; background-color: rgba(254, 254, 254, 1);">
        <h3 style="z-index: 99; color: rgba(254, 254, 254, .85); position: absolute; top: 10px; left: 30px;">实时在线用户数
        </h3>
        <div class="divBox" ref="divBox" style="height: 100%"></div>

        <div class="swichBtn" v-authorization="true">
            <el-switch @change="switchToggle" v-model="value2" class="ml-2"
                style="position: absolute; top: 10px; right: 50px; --el-switch-on-color: #eee; --el-switch-off-color: #111" />
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, onUnmounted } from 'vue';

const divBox = ref(null);
const app = {};

const value2 = ref(true);

const dataX = (function () {
    let now = new Date();
    let res = [];
    let len = 10;
    while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
        now = new Date(+now - 2000);
    }
    return res;
})();

const data = (function () {
    let res = [];
    let len = 0;
    while (len < 10) {
        res.push(+(Math.random() * 20 + 10).toFixed(1));
        len++;
    }
    return res;
})();

const option = {
    xAxis: {
        type: 'category',
        data: dataX
    },
    yAxis: {
        type: 'value',
        min: 0,
    },
    series: [
        {
            type: 'line',
            data: data,
        }
    ]
};

const darkMode = ref('dark');

const switchToggle = () => {
    darkMode.value == 'dark' ? darkMode.value = 'light' : darkMode.value = 'dark';
    myChart.dispose();
    myChart = echarts.init(divBox.value, darkMode.value);
    myChart.setOption(option);
};

let timer, myChart;
onMounted(() => {
    myChart = echarts.init(divBox.value, darkMode.value);

    // app.count = 11;
    timer = setInterval(function () {
        let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
        data.shift();
        Math.random() > 0.5 ? data.push(data[data.length - 1] + parseFloat(Math.random() * 20 + 10)) : data.push(data[data.length - 1] - parseFloat(Math.random() * 10 + 5));
        dataX.shift();
        dataX.push(axisData);
        myChart.setOption({
            xAxis: [
                {
                    data: dataX
                }
            ],
            series: [
                {
                    data: data
                }
            ]
        });
    }, 2100);
    option && myChart.setOption(option);
});
onUnmounted(() => {
    timer && clearInterval(timer);
});


</script>

<style lang="scss" scoped>
.divBox {
    :deep(canvas) {
        border-radius: 8px;
    }
}
</style>