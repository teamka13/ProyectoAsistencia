"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart, BarSeriesOption } from "echarts/charts";
import {
  GridComponent,
  GridComponentOption,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

echarts.use([
  BarChart,
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  SVGRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  BarSeriesOption | GridComponentOption
>;

const MyChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current, "dark", { renderer: "svg" });

    const option: EChartsOption = {
      title: {
        text: "Rendimiento Semanal de Asistencias",

        left: "center",
        textStyle: { color: "#a3f7bf", fontWeight: "bold", fontSize: 18 },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["Asistencias", "Faltas"],
        top: "8%",
        textStyle: { color: "#a3f7bf" },
      },

      xAxis: {
        type: "category",
        data: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        axisLine: { lineStyle: { color: "#555" } },
        axisLabel: { color: "#ccc", fontWeight: "bold" },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        splitLine: { lineStyle: { color: "#333" } },
        axisLabel: { color: "#ccc" },
      },
      series: [
        {
          name: "Asistencias",
          type: "bar",
          data: [670, 692, 701, 734, 500, 430, 310],
          itemStyle: {
            color: "#4ade80", // verde
            borderRadius: [6, 6, 0, 0],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(0, 255, 100, 0.6)",
              shadowOffsetX: 0,
            },
          },
          barWidth: "40%",
        },
        {
          name: "Faltas",
          type: "bar",
          data: [150, 70, 165, 355, 290, 260, 480],
          itemStyle: {
            color: "#f87171", // rojo suave
            borderRadius: [6, 6, 0, 0],
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(255, 0, 0, 0.5)",
              shadowOffsetX: 0,
            },
          },
          barWidth: "40%",
        },
      ],
      backgroundColor: "#1e1e2f", // fondo general
      grid: {
        left: "8%",
        right: "6%",
        bottom: "12%",
        top: "20%",
        containLabel: true,
      },
      animation: true,
      animationDuration: 1000,
      animationDurationUpdate: 500,
      animationEasing: "cubicOut",
    };

    chart.setOption(option);

    const resizeObserver = new ResizeObserver(() => chart.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, []);

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", maxWidth: 700, height: 320, margin: "0 auto" }}
    />
  );
};

export default MyChart;
