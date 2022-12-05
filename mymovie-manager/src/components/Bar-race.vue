<template>
    <div style="height: 40vh; border-radius: 8px; background-color: rgba(254, 254, 254, 1);">
        <h3 style="position: absolute; top: 10px; left: 30px;">实时票房排行</h3>
        <div ref="divBox" style="height: 100%;"></div>
    </div>

</template>

<script setup>
import * as echarts from 'echarts';
import { computed, onMounted, ref, onUnmounted } from 'vue';

const { data1 } = defineProps(['data1']);

const divBox = ref(null);
let myChart;
let timer;
onMounted(() => {
    myChart = echarts.init(divBox.value);

    setTimeout(function () {
        run();
    }, 0);
    timer = setInterval(function () {
        run();
    }, 3000);

    option && myChart.setOption(option);
});
onUnmounted(() => {
    timer && clearInterval(timer);
});
let option;

const data = [];
// const colorArr = [];
for (let i = 0; i < data1.length; ++i) {
    data.push(Math.round(Math.random() * 200));
    // colorArr.push(`rgb(${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)})`);
}
// console.log(colorArr);



option = {
    xAxis: {
        max: 'dataMax' //取数据在该轴上的最大值作为最大刻度
    },
    yAxis: {
        type: 'category',
        data: data1, //数据内容数组
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 9 // only the largest 3 bars will be displayed
    },
    series: [
        {
            realtimeSort: true, //开启实时排序
            type: 'bar',
            data: data,
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            },
            itemStyle: {
                color: function (param) {
                    return `rgb(${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)}, ${parseInt(Math.random() * 256)})`;
                }
            }
        }
    ],
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    grid: {
        top: 70,
        bottom: 30,
        left: 150,
        right: 70
    },
};
function run() {
    for (var i = 0; i < data.length; i++) {
        if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 2000);
        } else {
            // if (i == data1.indexOf('航海王：红发歌姬') *1 ) {
            //     data[i] += Math.round(Math.random() * 2000);
            // } 
            data[i] += Math.round(Math.random() * 200);
        }
    }
    myChart.setOption({
        series: [
            {
                type: 'bar',
                data
            }
        ]
    });
}



</script>

<style lang="scss">

</style>