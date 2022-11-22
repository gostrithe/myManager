<template>
  <div>
    <!-- 按钮区 -->
    <div class="tab-wrapper">
      <button class="tab" @click="useLine(false)">折线图</button>
      <button class="tab" @click="useLine(true)">平滑</button>
      <button class="tab" @click="useLine(true, {})">面积</button>
    </div>

    <div class="tab-wrapper">
      <button class="tab" @click="useBar">柱状图</button>
      <button class="tab" @click="useBar2">单根变色</button>
      <button class="tab" @click="useBar3">极坐标</button>
      <button class="tab" @click="usePie">饼图</button>
    </div>

    <div ref="refMain" class="echart-main"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const refMain = ref(null);

var myChart;
var option;

option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },

  yAxis: {
    type: "value",
  },

  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};

function resetMychartOptions(key, options) {
  Object.assign(key, options);
  option && myChart.setOption(option);
}

const resetMyChart = (sOptions) => {
  //   Object.assign(option.series[0], sOptions);
  //   option && myChart.setOption(option);
  resetMychartOptions(option.series[0], sOptions);
};

onMounted(() => {
  // var chartDom = document.getElementById("main");
  myChart = echarts.init(refMain.value);
  resetMyChart();
});

const useLine = (smooth = false, areaStyle = null) => {
  resetMyChart({
    type: "line",
    smooth,
    areaStyle,
  });
};

const useBar = () => {
  resetMychartOptions(option.series[0], {
    data: [120, 200, 150, 80, 70, 110, 130],
    type: "bar",
    showBackground: true,
    backgroundStyle: {
      color: "rgba(180, 180, 180, 0.2)",
    },
  });
};

const useBar2 = () => {
  resetMychartOptions(option.series[0], {
    data: [
      120,
      {
        value: 200,
        itemStyle: {
          color: "#a90000",
        },
      },
      150,
      80,
      70,
      110,
      130,
    ],
    type: "bar",
  });
};

/* 极坐标 */
const useBar3 = () => {
  resetMychartOptions(option, {
    title: [
      {
        text: "Tangential Polar Bar Label Position (middle)",
      },
    ],
    polar: {
      radius: [30, "80%"],
    },
    angleAxis: {
      max: 4,
      startAngle: 75,
    },
    radiusAxis: {
      type: "category",
      data: ["a", "b", "c", "d"],
    },
    tooltip: {},
    series: {
      type: "bar",
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: "polar",
      label: {
        show: true,
        position: "middle",
        formatter: "{b}: {c}",
      },
    },
  });
};

/* 饼图 */
const usePie = () => {
  resetMychartOptions(
    option,
    (option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    })
  );
};
</script>

<style lang="scss" scoped>
.echart-main {
  width: 100%;
  height: 700px;
}

</style>
