import ListItemText from "@mui/material/ListItemText";

export function ImportProductResultsListItem({ product }) {
  if (Object.hasOwn(product, "codeId")) {
    return <ListItemText primary={product.codeId} secondary={product.url} />;
  }
  return <ListItemText primary={product} />;
}
