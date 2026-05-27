import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

/**
 * Submenu panel rendered inside NavMenu when a category is selected.
 *
 * Props:
 *   item     – the selected navData entry { id, alias, main, sub[] }
 *   onBack   – called when the user taps the back / category-name row
 *   onSelect – called with (alias, filterId) when the user picks a filter
 *              filterId === 0 means "show all"
 */
export function NavMenuSubMenu({ item, onBack, onSelect }) {
  return (
    <Box sx={{ width: "100%" }}>
      {/* ── Back / header row ── */}
      <ListItemButton
        onClick={onBack}
        sx={{
          gap: 1,
          borderBottom: "2px solid #e0e0e0",
          bgcolor: "#f5f5f5",
        }}
      >
        <ArrowBackIosNewIcon fontSize="small" sx={{ color: "text.secondary" }} />
        <ListItemText
          primary={item.main}
          primaryTypographyProps={{ fontWeight: 600, fontSize: "0.95rem" }}
        />
      </ListItemButton>

      {/* ── "All" shortcut ── */}
      <ListItemButton
        onClick={() => onSelect(item.alias, 0)}
        sx={{ borderBottom: "1px solid #e0e0e0", "&:hover": { bgcolor: "#f5f5f5" } }}
      >
        <ListItemText
          primary="Всички"
          primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }}
        />
      </ListItemButton>

      {/* ── Filter groups — two columns ── */}
      <Grid container sx={{ borderTop: "1px solid #e0e0e0" }}>
        {item.sub.map((group) => (
          <Grid
            item
            xs={6}
            key={group.title}
            sx={{ borderRight: "1px solid #e0e0e0", "&:nth-of-type(even)": { borderRight: "none" } }}
          >
            {/* Group header */}
            <Typography
              variant="overline"
              sx={{
                px: 1.5,
                pt: 1,
                display: "block",
                color: "text.secondary",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                lineHeight: 2,
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {group.title}
            </Typography>

            {/* Group items */}
            <List disablePadding>
              {group.items.map((filter) => (
                <ListItem
                  key={filter.id}
                  disablePadding
                  sx={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <ListItemButton
                    onClick={() => onSelect(item.alias, filter.id)}
                    sx={{ px: 1.5, py: 0.75, "&:hover": { bgcolor: "#f5f5f5" } }}
                  >
                    <ListItemText
                      primary={filter.name}
                      primaryTypographyProps={{ fontSize: "0.8rem" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
