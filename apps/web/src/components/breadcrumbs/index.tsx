import React from 'react';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NextLink from 'next/link';


interface Props {
  current: string;
  list: Array<{ href: string, title: string }>;
}

export const Breadcrumbs: React.FC<Props> = ({ current, list }) => {
  return (
    <MuiBreadcrumbs sx={{ mb: 3 }}>
      {
        list.map(item => (
          <Link
            key={item.href}
            href={item.href}
            underline="hover"
            color="inherit"
            component={NextLink}
          >
            {item.title}
          </Link>
        ))
      }

      <Typography color="text.primary">{current}</Typography>
    </MuiBreadcrumbs>
  )
}
