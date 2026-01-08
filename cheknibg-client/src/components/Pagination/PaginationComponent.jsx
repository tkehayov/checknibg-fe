import { useTheme } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";

export function PaginationComponent({ elements, handlePageChange, pages }) {
  const [currentPage, setCurrentPage] = useState(pages);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function handlePageChange_(event, page) {
    handlePageChange(page);
  }

  useEffect(() => {
    if (pages) {
      setCurrentPage(pages);
    }
  }, [pages]);

  return (
    <Stack sx={{ marginTop: 2 }}>
      <Pagination
        count={elements.totalPages}
        shape="rounded"
        color="primary"
        onChange={handlePageChange_}
        page={currentPage}
        sx={{
          "& .MuiPaginationItem-root:not(.Mui-selected)": {
            color: "secondary.main",
            "&:hover": {
              border: (theme) => `1px solid ${theme.palette.secondary.main}`,
              backgroundColor: "white",
            },
          },
        }}
      />
    </Stack>
  );
}
