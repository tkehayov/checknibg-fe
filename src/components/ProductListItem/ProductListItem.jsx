import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import { BASE_URL, IMAGES_URL } from "../../config";

export function ProductListItem({ currentProduct }) {
  return (
    <Grid item>
      <Card key={currentProduct.id} sx={{ width: 215, height: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              BASE_URL + IMAGES_URL + "/" + currentProduct.images[0].filename
            }
            alt="green iguana"
          />
          <CardContent sx={{ height: 80 }}>
            <Typography variant="body3">{currentProduct.name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button size="small" color="primary" variant="contained">
            Сравни цените
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
