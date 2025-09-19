'use client'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import NextLink from 'next/link'

export default function Landing() {
  return (
    <Container sx={{ py: 10, textAlign: 'center' }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h2">ClauseWise eConsultation Analyzer</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720 }}>
          Turning public feedback into insights with AI. Analyze sentiment, summarize long comments, and spot common keywords instantly.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button component={NextLink} href="/stakeholder/login" variant="contained" size="large" sx={{ backgroundColor: '#1e88e5' }}>Stakeholder</Button>
          <Button component={NextLink} href="/admin/login" variant="contained" size="large" sx={{ backgroundColor: '#8e24aa' }}>Admin</Button>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
          <Button component={NextLink} href="/stakeholder/register" variant="text">Create Stakeholder Account</Button>
          <Button component={NextLink} href="/admin/register" variant="text">Create Admin Account</Button>
        </Stack>
      </Stack>
    </Container>
  )
}


