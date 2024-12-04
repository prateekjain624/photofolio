import React from "react";

import { Modal } from "@mui/material";
import styles from "../Carousel/Carousel.module.css";

const Carousel = ({
  openCarousel,
  selectedImage,
  handleLeftClick,
  handleRightClick,
  handleCloseCarousel,
}) => {
  return (
    <div>
      <Modal open={openCarousel}>
        <div id={styles.carousel}>
          <button id={styles.closeCarousel} onClick={handleCloseCarousel}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
          <div id={styles.carouselDiv}>
            <button
              className={`${styles.carouselBtn}`}
              onClick={handleLeftClick}
            >
              <i className="fa-solid fa-caret-left"></i>
            </button>
            <img
              src={selectedImage?.imageUrl}
              alt={selectedImage.title}
              width={"600px"}
              height={"400px"}
            />
            <button
              className={`${styles.carouselBtn}`}
              onClick={handleRightClick}
            >
              <i className="fa-solid fa-caret-right"></i>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Carousel;
