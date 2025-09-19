"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "@/app/authentication/auth/AuthLogin";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  return (
    <PageContainer title="Admin Login" description="Admin login page">
      <Box sx={{ position: "relative", "&:before": { content: '""', background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)", backgroundSize: "400% 400%", animation: "gradient 15s ease infinite", position: "absolute", height: "100%", width: "100%", opacity: "0.3" } }}>
        <Grid container spacing={0} justifyContent="center" sx={{ height: "100vh" }}>
          <Grid display="flex" justifyContent="center" alignItems="center" size={{ xs: 12, sm: 12, lg: 4, xl: 3 }}>
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin
                title="Admin Sign In"
                subtext={<Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>Administrator access for analytics and management</Typography>}
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">New admin?</Typography>
                    <Typography component={Link} href="/admin/register" fontWeight="500" sx={{ textDecoration: "none", color: "primary.main" }}>Create admin account</Typography>
                  </Stack>
                }
                onSubmit={() => router.push('/insights')}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}


