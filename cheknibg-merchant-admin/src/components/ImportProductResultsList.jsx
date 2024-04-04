import { Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import { ImportProductResultsListItem } from "./ImportProductResultsListItem";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

export function ImportProductResultsList({ name, color, products, tooltip }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={color} variant="h5">
          <label>{name}</label>&nbsp;
          <Tooltip title={tooltip}>
            <InfoIcon />
          </Tooltip>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {products &&
            products.map((product, index) => {
              return (
                <ImportProductResultsListItem key={index} product={product} />
              );
            })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
