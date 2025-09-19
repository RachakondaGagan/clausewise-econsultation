'use client'
import { useEffect, useMemo, useState } from 'react'
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard'
import WordCloud, { WordCloudWord } from '@/app/(DashboardLayout)/components/shared/WordCloud'
import SentimentPie from '@/app/(DashboardLayout)/components/insights/SentimentPie'
import SentimentTrend from '@/app/(DashboardLayout)/components/insights/SentimentTrend'
import KeywordBar from '@/app/(DashboardLayout)/components/insights/KeywordBar'

interface ApiComment {
  id: string
  text: string
  summary: string
  sentiment: 'positive' | 'negative' | 'neutral'
  keywords: string[]
  createdAt: number
}

export default function InsightsPage() {
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<ApiComment[]>([])
  const [stats, setStats] = useState<any>(null)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/comments', { cache: 'no-store' })
    const data = await res.json()
    setComments(data.comments || [])
    setStats(data.stats)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const wordCloud = useMemo<WordCloudWord[]>(() => {
    const freq: Record<string, number> = {}
    for (const c of comments) {
      for (const k of c.keywords) freq[k] = (freq[k] || 0) + 1
    }
    return Object.entries(freq)
      .sort((a,b)=>b[1]-a[1])
      .slice(0, 20)
      .map(([text, count]) => ({ text, count }))
  }, [comments])

  const keywordBarData = useMemo(() => wordCloud.map(w => ({ label: w.text, value: w.count })), [wordCloud])

  return (
    <PageContainer title="ClauseWise eConsultation Analyzer" description="Insights dashboard">
      <Stack spacing={3}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard title="Total Comments">
              <Typography variant="h4">{stats?.total ?? 0}</Typography>
            </DashboardCard>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard title="Positive">
              <Typography color="success.main" variant="h4">{stats?.positive ?? 0}</Typography>
            </DashboardCard>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard title="Negative">
              <Typography color="error.main" variant="h4">{stats?.negative ?? 0}</Typography>
            </DashboardCard>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <DashboardCard title="Neutral">
              <Typography color="warning.main" variant="h4">{stats?.neutral ?? 0}</Typography>
            </DashboardCard>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard title="Word Cloud">
              <WordCloud words={wordCloud} />
            </DashboardCard>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DashboardCard title="Sentiment Distribution">
              <SentimentPie positive={stats?.positive ?? 0} negative={stats?.negative ?? 0} neutral={stats?.neutral ?? 0} />
            </DashboardCard>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <DashboardCard title="Top Keywords">
              <KeywordBar data={keywordBarData} />
            </DashboardCard>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <DashboardCard title="Sentiment Trend (by day)">
              <SentimentTrend timestamps={comments.map(c => c.createdAt)} labels={comments.map(c => c.sentiment)} />
            </DashboardCard>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Comments</Typography>
              <Typography variant="body2" color="text.secondary">Latest first</Typography>
            </Stack>
            <Stack spacing={2}>
              {loading && <Typography>Loading…</Typography>}
              {!loading && comments.length === 0 && <Typography>No comments yet. Submit one from the Submit page.</Typography>}
              {!loading && comments.map((c) => (
                <Box key={c.id} sx={{ p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                  <Stack spacing={1}>
                    <Typography>{c.text}</Typography>
                    <Typography variant="body2" color="text.secondary">Summary: {c.summary}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip size="small" label={c.sentiment} color={c.sentiment === 'positive' ? 'success' : c.sentiment === 'negative' ? 'error' : 'warning'} />
                      {c.keywords.map((k) => <Chip key={k} size="small" label={k} variant="outlined" />)}
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </PageContainer>
  )
}


