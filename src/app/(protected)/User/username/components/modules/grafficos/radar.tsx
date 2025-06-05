"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { RadarChart, RadarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption
>;

const RadarAsistencias = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current, "dark");

    const option: EChartsOption = {
      title: {
        text: "Comparativa Semanal de Asistencias por Departamento",
        subtext: "Datos simulados",
        left: "center",
        textStyle: {
          color: "#fff",
        },
      },
      legend: {
        data: ["Meta Asistencia", "Asistencia Real"],
        top: "bottom",
        textStyle: {
          color: "#ccc",
        },
      },
      radar: {
        indicator: [
          { name: "Bachillerato", max: 1000 },
          { name: "Universidad", max: 1000 },
          { name: "Administración", max: 1000 },
          { name: "Seguridad", max: 1000 },
          { name: "Intendencia", max: 1000 },
          { name: "Instructores", max: 1000 },
        ],
        shape: "polygon",
        radius: "65%",
        splitArea: {
          areaStyle: {
            color: ["#1e1e2f", "#2c2c3d"],
          },
        },
        axisLine: {
          lineStyle: {
            color: "#777",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#444",
          },
        },
      },
      series: [
        {
          name: "Meta vs Real",
          type: "radar",
          data: [
            {
              value: [900, 850, 780, 880, 750, 820],
              name: "Meta Asistencia",
              areaStyle: { opacity: 0.2 },
              emphasis: {
                lineStyle: {
                  width: 4,
                },
                areaStyle: {
                  opacity: 0.4,
                },
              },
            },
            {
              value: [860, 820, 700, 910, 700, 790],
              name: "Asistencia Real",
              areaStyle: { opacity: 0.4 },
              emphasis: {
                lineStyle: {
                  width: 4,
                },
                areaStyle: {
                  opacity: 0.6,
                },
              },
            },
          ],
          animationDuration: 800,
          animationEasing: "cubicInOut",
          lineStyle: {
            width: 2,
          },
          symbol: "circle",
          symbolSize: 6,
        },
      ],
      toolbox: {
        show: true,
        feature: {
          saveAsImage: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
        },
      },
      backgroundColor: "#1e1e2f",
      animation: true,
      animationDuration: 1000, // duración al cargar (ms)
      animationDurationUpdate: 500, // duración al actualizar
      animationEasing: "cubicOut", // efecto de suavidad
    };

    chartInstance.setOption(option);

    const resizeObserver = new ResizeObserver(() => chartInstance.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "450px" }} />;
};

export default RadarAsistencias;
