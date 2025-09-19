import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import { Typography } from "@mui/material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Typography component="span" sx={{ fontWeight: 800, fontSize: 28, lineHeight: '70px' }}>
        ClauseWise
      </Typography>
    </LinkStyled>
  );
};

export default Logo;
  