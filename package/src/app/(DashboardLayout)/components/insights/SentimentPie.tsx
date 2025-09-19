'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any

interface Props {
  positive: number
  negative: number
  neutral: number
}

export default function SentimentPie({ positive, negative, neutral }: Props) {
  const series = [positive, negative, neutral]
  const options: any = {
    labels: ['Positive', 'Negative', 'Neutral'],
    colors: ['#2e7d32', '#d32f2f', '#ed6c02'],
    legend: { position: 'bottom' },
    chart: { type: 'pie' }
  }
  return <Chart options={options} series={series} type="pie" height={320} />
}


