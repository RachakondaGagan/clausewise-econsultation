'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any

interface Props {
  data: { label: string; value: number }[]
}

export default function KeywordBar({ data }: Props) {
  const series = [
    {
      name: 'Frequency',
      data: data.map((d) => d.value)
    }
  ]
  const options: any = {
    chart: { type: 'bar' },
    xaxis: { categories: data.map((d) => d.label) },
    plotOptions: { bar: { horizontal: true } },
    colors: ['#2962ff']
  }
  return <Chart options={options} series={series} type="bar" height={360} />
}


