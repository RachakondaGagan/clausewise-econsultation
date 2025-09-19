'use client'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any

interface Point { x: number; y: number }
interface Props {
  timestamps: number[]
  labels: ('positive' | 'negative' | 'neutral')[]
}

export default function SentimentTrend({ timestamps, labels }: Props) {
  const buckets = useMemo(() => {
    // Group by day
    const dayMap: Record<string, { p: number; n: number; z: number }> = {}
    for (let i = 0; i < timestamps.length; i++) {
      const d = new Date(timestamps[i])
      const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
      dayMap[key] = dayMap[key] || { p: 0, n: 0, z: 0 }
      const s = labels[i]
      if (s === 'positive') dayMap[key].p++
      else if (s === 'negative') dayMap[key].n++
      else dayMap[key].z++
    }
    const keys = Object.keys(dayMap).sort((a,b)=> new Date(a).getTime()-new Date(b).getTime())
    return {
      categories: keys,
      p: keys.map(k => dayMap[k].p),
      n: keys.map(k => dayMap[k].n),
      z: keys.map(k => dayMap[k].z)
    }
  }, [timestamps, labels])

  const series = [
    { name: 'Positive', data: buckets.p },
    { name: 'Negative', data: buckets.n },
    { name: 'Neutral',  data: buckets.z }
  ]
  const options: any = {
    chart: { type: 'line' },
    xaxis: { categories: buckets.categories },
    colors: ['#2e7d32','#d32f2f','#ed6c02'],
    stroke: { width: 2 },
    legend: { position: 'bottom' }
  }
  return <Chart options={options} series={series} type="line" height={320} />
}


