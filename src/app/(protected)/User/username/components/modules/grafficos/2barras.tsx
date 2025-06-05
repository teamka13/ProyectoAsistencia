"use client";
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const AttendanceChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  const generateMonthlyData = () => {
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];

    const asistenciaMensual: number[] = [];
    const faltasMensuales: number[] = [];

    months.forEach(() => {
      const diasHabiles = 20 + Math.floor(Math.random() * 3); // entre 20 y 22 días
      let totalFaltas = 0;

      for (let i = 0; i < diasHabiles; i++) {
        const diaSemana = i % 5; // 0: lunes, 4: viernes
        let faltas = 0;

        if (diaSemana === 0 || diaSemana === 4) {
          faltas = 250 + Math.floor(Math.random() * 151); // 250–400
        } else {
          faltas = 150 + Math.floor(Math.random() * 101); // 150–250
        }

        totalFaltas += faltas;
      }

      const totalAsistencias = diasHabiles * 800 - totalFaltas;
      asistenciaMensual.push(totalAsistencias);
      faltasMensuales.push(totalFaltas);
    });

    return { months, asistenciaMensual, faltasMensuales };
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current, "dark");

    const { months, asistenciaMensual, faltasMensuales } =
      generateMonthlyData();

    const option: echarts.EChartsOption = {
      title: {
        text: "Rendimiento Mensual de Asistencia en Bachillerato",

        left: "center",
        textStyle: { color: "#a3f7bf", fontSize: 18 },
      },
      tooltip: { trigger: "axis" },
      legend: {
        top: "15%",
        data: ["Asistencias", "Faltas"],
        textStyle: { color: "#ccc" },
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        type: "category",
        data: months,
        axisLabel: { color: "#ccc", fontWeight: "bold" },
        axisLine: { lineStyle: { color: "#555" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#ccc" },
        splitLine: { lineStyle: { color: "#333" } },
      },
      series: [
        {
          name: "Asistencias",
          type: "bar",
          data: asistenciaMensual,
          itemStyle: {
            color: "#4ade80",
            borderRadius: [4, 4, 0, 0],
          },
          markLine: {
            data: [{ type: "average", name: "Promedio" }],
          },
        },
        {
          name: "Faltas",
          type: "bar",
          data: faltasMensuales,
          itemStyle: {
            color: "#f87171",
            borderRadius: [4, 4, 0, 0],
          },
          markLine: {
            data: [{ type: "average", name: "Promedio" }],
          },
        },
      ],
      backgroundColor: "#1e1e2f",
      grid: {
        left: "5%",
        right: "5%",
        bottom: "10%",
        top: "22%",
        containLabel: true,
      },
      animation: true,
      animationDuration: 1000,
      animationDurationUpdate: 500,
      animationEasing: "cubicOut",
    };

    chartInstance.setOption(option);

    const resizeObserver = new ResizeObserver(() => chartInstance.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "440px" }} />;
};

export default AttendanceChart;
