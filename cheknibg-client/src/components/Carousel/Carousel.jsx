import Carousel from "react-material-ui-carousel";
import { Button } from "@mui/material";

export function CarouselAd() {
  var items = [
    {
      name: "Random Name #1",
      img: "laptops.jpg",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      img: "slider2.jpg",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}
function Item(props) {
  return (
    <div>
      <h2>
        {props.item.name} {props.item.img}
      </h2>
      <img src={`/assets/slider/${props.item.img}`} alt={`${props.item.img}`} />
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </div>
  );
}
