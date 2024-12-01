import React from "react";
import back from "../Assets/back.png";
import search from "../Assets/search.png";
import edit from "../Assets/edit.png";
import DeleteImage from "../Assets/trash-bin.png";
import styles from "../ImageList/imageliststyles.module.css";
const Albumimages = ({ handleBack, title }) => {
  return (
    <>
      <div className={styles.imagelistTop}>
        <span>
          <img
            src={back}
            alt="back"
            className={styles.back}
            onClick={handleBack}
          />
        </span>
        <h3>images in {title} albums</h3>
        <div className={styles.imagelistSearch}>
          <input type="text" />
          <img src={search} alt="search" />
        </div>
        <button>Add image</button>
      </div>

      <div className={styles.imageList}>
        <div className={styles.imageListImage}>
          <div className={styles.update}>
            <img src={edit} alt="" />
          </div>
          <div className={styles.delete}>
            <img src={DeleteImage} alt="" />
          </div>
          <img src={back} alt="" />
          <span>title</span>
        </div>
        <div className={styles.imageListImage}>
          <div className={styles.update}>
            <img src={edit} alt="" />
          </div>
          <div className={styles.delete}>
            <img src={DeleteImage} alt="" />
          </div>
          <img src={back} alt="" />
          <span>title</span>
        </div>
      </div>
    </>
  );
};

export default Albumimages;
