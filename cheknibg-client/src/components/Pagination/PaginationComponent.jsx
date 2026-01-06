import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

export function PaginationComponent({ elements, handlePageChange, pages }) {
  const [currentPage, setCurrentPage] = useState(pages);

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
      />
    </Stack>
  );
}
