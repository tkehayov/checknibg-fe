import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

export function BreadCrumbs({ breadcrumbs }) {
  return (
    <Stack spacing={0}>
      {breadcrumbs && (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb) => {
            if (breadcrumb.href) {
              return (
                <Link
                  underline="hover"
                  key={breadcrumb.key}
                  color="inherit"
                  href={breadcrumb.href}
                >
                  {breadcrumb.name}
                </Link>
              );
            } else {
              return (
                <Typography key={breadcrumb.key} color="text.primary">
                  {breadcrumb.name}
                </Typography>
              );
            }
          })}
        </Breadcrumbs>
      )}
    </Stack>
  );
}
