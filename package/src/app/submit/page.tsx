'use client'
import { useState } from 'react'
import { Box, Button, Card, CardContent, Stack, TextField, Typography, Alert, Link as MuiLink } from '@mui/material'
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer'
import NextLink from 'next/link'

export default function SubmitPage() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const res = await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setResult(data)
      setText('')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title="Submit Feedback" description="Submit stakeholder comment">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>Submit Your Feedback</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your feedback will help us improve draft legislations.
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Enter your comment here…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                minRows={4}
                multiline
                fullWidth
                required
              />
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? 'Submitting…' : 'Submit Comment'}
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
              {result && (
                <Alert severity="success">
                  Submitted! Sentiment: <b>{result.sentiment}</b>.{' '}
                  <MuiLink component={NextLink} href="/insights" underline="hover">View Dashboard</MuiLink>
                </Alert>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  )
}


