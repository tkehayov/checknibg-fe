import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect, useState } from "react";
import { API_URLS, PRODUCTS_IMAGES_URL } from "../../config";
import styles from "./style.module.css";

export function ProductGallery({ images }) {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    function fetchImages() {
      if (images.length !== 0) {
        const currentImages = [];
        images.forEach((image) => {
          let imageUrl = image.filename.includes("cdn")
            ? "?url=" + image.filename
            : "/" + image.filename;
          const galleryImage = {
            original: API_URLS.products + PRODUCTS_IMAGES_URL + imageUrl,
            thumbnail: API_URLS.products + PRODUCTS_IMAGES_URL + imageUrl,
          };
          currentImages.push(galleryImage);
        });
        setGalleryImages(currentImages);
      }
    }

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
