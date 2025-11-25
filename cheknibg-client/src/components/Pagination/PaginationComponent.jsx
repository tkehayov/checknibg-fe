import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export function PaginationComponent({
  elements,
  handlePageChange,
  isPageCleared,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page"))
    ? parseInt(searchParams.get("page"))
    : 1;

  function handlePageChange_(event, page) {
    handlePageChange(page);
    setSearchParams({ page: page });
  }

  useEffect(() => {
    if (isPageCleared) {
      handlePageChange(1);
      setSearchParams({ page: 1 });
    }
  }, [isPageCleared]);

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
