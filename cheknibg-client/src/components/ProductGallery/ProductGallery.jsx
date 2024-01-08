import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { BASE_URL, PRODUCTS_IMAGES_URL } from "../../config";
import styles from "./style.module.css";

export function ProductGallery({ images }) {
  const [galleryImages, setGalleryImages] = useState([]);

  function fetchImages() {
    if (images.length !== 0) {
      const currentImages = [];
      images.forEach((image) => {
        const galleryImage = {
          original: BASE_URL + PRODUCTS_IMAGES_URL + "/" + image.filename,
          thumbnail: BASE_URL + PRODUCTS_IMAGES_URL + "/" + image.filename,
        };
        currentImages.push(galleryImage);
      });
      setGalleryImages(currentImages);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <ImageGallery
      items={galleryImages}
      showNav={false}
      showFullscreenButton={true}
      showPlayButton={false}
      showBullets={false}
      thumbnailPosition="left"
      additionalClass={styles.image}
    />
  );
}
