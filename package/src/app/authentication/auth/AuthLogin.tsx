import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import ClauseField from "@/app/(DashboardLayout)/components/forms/ClauseField/ClauseField";
import { useState } from "react";

interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
  onSubmit?: (username: string, password: string) => void;
}

const AuthLogin = ({ title, subtitle, subtext, onSubmit }: loginType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1} textAlign="center">
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>
      <Box>
        <ClauseField label="Username" name="username" required placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)} />
      </Box>
      <Box mt="25px">
        <ClauseField label="Password" name="password" type="password" required placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Forgot Password ?
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={() => onSubmit?.(username, password)}
        type="button"
      >
        Sign In
      </Button>
    </Box>
    {subtitle}
  </>
)};

export default AuthLogin;
