import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { SeoHead } from "src/components/seo/head";
import { urls } from "urls";

export default function Page404() {
  return (
    <div>
      <SeoHead
        subtitle="Page not found"
        description="The page you're looking for can't be found"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ mb: 5 }}>Oops! Looks like you&apos;re lost</Typography>
        <Link href={urls.home()} style={{ textDecoration: 'none' }}>
          <Button>Return home</Button>
        </Link>
      </Box>
    </div>
  )
}