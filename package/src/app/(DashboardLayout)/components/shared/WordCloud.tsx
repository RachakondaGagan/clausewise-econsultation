'use client'
import React from 'react'
import { Box } from '@mui/material'

export interface WordCloudWord {
  text: string
  count: number
}

interface Props {
  words: WordCloudWord[]
}

// Minimal word cloud: font size scales with sqrt(count)
export default function WordCloud({ words }: Props) {
  const max = Math.max(1, ...words.map(w => w.count))
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {words.map((w) => {
        const size = 12 + 18 * Math.sqrt(w.count / max)
        return (
          <Box key={w.text} component="span" sx={{ fontSize: `${size}px`, fontWeight: 600 }}>
            {w.text}
          </Box>
        )
      })}
    </Box>
  )
}


