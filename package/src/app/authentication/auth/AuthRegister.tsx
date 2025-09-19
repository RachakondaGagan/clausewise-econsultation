import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

import ClauseField from '@/app/(DashboardLayout)/components/forms/ClauseField/ClauseField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: React.ReactNode;
    subtext?: React.ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1} textAlign="center">
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <ClauseField label='Name' name='name' required placeholder='Your full name' value={''} onChange={()=>{}} />
                <div style={{ height: 16 }} />
                <ClauseField label='Email Address' name='email' required placeholder='you@example.com' value={''} onChange={()=>{}} />
                <div style={{ height: 16 }} />
                <ClauseField label='Password' name='password' type='password' required placeholder='Create a password' value={''} onChange={()=>{}} />
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth component={Link} href="/authentication/login">
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
);

export default AuthRegister;
