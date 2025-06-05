"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const SemesterAttendanceChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current, "dark");

    const option: echarts.EChartsOption = {
      title: {
        text: "Asistencia Diaria por Semestre",
        subtext: "Datos simulados",
        left: "center",
        textStyle: {
          color: "#ffffff",
        },
        subtextStyle: {
          color: "#bbbbbb",
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "#333",
        textStyle: {
          color: "#fff",
        },
      },
      legend: {
        orient: "vertical",
        left: "left",
        textStyle: {
          color: "#ffffff",
        },
      },

      series: [
        {
          name: "Semestre",
          type: "pie",
          radius: "60%",
          center: ["50%", "55%"],
          data: [
            { value: 500, name: "Semestre 1" },
            { value: 460, name: "Semestre 2" },
            { value: 620, name: "Semestre 3" },
            { value: 310, name: "Semestre 4" },
            { value: 740, name: "Semestre 5" },
            { value: 652, name: "Semestre 6" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          itemStyle: {
            borderRadius: 10,
            borderColor: "#1e1e2f",
            borderWidth: 2,
          },
          label: {
            color: "#ddd",
          },
        },
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
        },
      },

      animation: true,
      animationDuration: 1000,
      animationDurationUpdate: 500,
      animationEasing: "cubicOut",
      backgroundColor: "#1e1e2f",
    };

    chartInstance.setOption(option);

    const resizeObserver = new ResizeObserver(() => chartInstance.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default SemesterAttendanceChart;
