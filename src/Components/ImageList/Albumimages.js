import React, { useEffect, useState } from "react";
import back from "../Assets/back.png";
import search from "../Assets/search.png";
import edit from "../Assets/edit.png";
import DeleteImage from "../Assets/trash-bin.png";
import styles from "../ImageList/imageliststyles.module.css";
import ImageForm from "../ImageForm/ImageForm";
import { db } from "../../fireebaseinit";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Carousel from "../Carousel/Carousel";
import { toast } from "react-toastify";

const Albumimages = ({ handleBack, albumId, title }) => {
  const [showForm, setShowForm] = useState(false);
  const [images, setImages] = useState([]);
  const [currentHoverIndex, setCurrentHoverIndex] = useState(null);
  const [imageToUpdate, setImageToUpdate] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openCarousel, setOpenCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true); // State for loading

  const handleShowForm = () => {
    setShowForm((prevForm) => !prevForm);
    setImageToUpdate(null);
  };

  const handleImageCreate = async (imagesDetails) => {
    try {
      if (imageToUpdate) {
        await updateDoc(doc(db, "images", imageToUpdate.id), imagesDetails);
        toast.success("Image updated successfully");
        setImageToUpdate(null);
      } else {
        await addDoc(collection(db, "images"), { albumId, ...imagesDetails });
        toast.success("Image added successfully");
      }
      setShowForm(false);
    } catch (err) {
      console.error("Error saving image:", err);
    }
  };

  const handleEdit = (image) => {
    setImageToUpdate(image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "images", id));
      toast.success("Image deleted successfully");
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  const getImageData = () => {
    const unsub = onSnapshot(collection(db, "images"), (querySnapshot) => {
      const imageData = querySnapshot.docs
        .filter((doc) => doc.data().albumId === albumId)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setImages(imageData);
      setLoading(false); // Set loading to false after data is fetched
    });
    return unsub;
  };

  useEffect(() => {
    const unsub = getImageData();
    return () => unsub();
  }, [albumId]);

  const handleImageClick = (image) => {
    setSelectedImageIndex(image.id);
    setOpenCarousel(true);
    setSelectedImage(image);

    const idx = images.findIndex((img) => img.id === image.id);
    setCurrentIndex(idx);
  };

  const handleRightClick = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    const findImg = images[nextIndex];
    setSelectedImage(findImg);
  };

  const handleLeftClick = () => {
    const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
    const findImg = images[nextIndex];
    setSelectedImage(findImg);
  };

  const handleCloseCarousel = () => {
    setSelectedImageIndex(null);
  };

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(query)
  );

  const handleSearchChange = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

  return (
    <>
      {showForm && (
        <ImageForm
          handleImageCreate={handleImageCreate}
          albumTitle={title}
          imageToUpdate={imageToUpdate}
        />
      )}
      <div className={styles.imagelistTop}>
        <span>
          <img
            src={back}
            alt="back"
            className={styles.back}
            onClick={handleBack}
          />
        </span>
        <h3>Images in {title} albums</h3>
        <div className={styles.imagelistSearch}>
          <input type="text" value={query} onChange={handleSearchChange} />
          <img src={search} alt="search" />
        </div>
        <button
          onClick={handleShowForm}
          className={showForm ? styles.active : ""}
        >
          {showForm ? "Cancel" : "Add Image"}
        </button>
      </div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <span className={styles.loader}></span>
        </div>
      ) : (
        <div className={styles.imageList}>
          {filteredImages.length > 0 ? (
            filteredImages.map((image, index) => (
              <div
                className={styles.imageListImage}
                key={image.id}
                onMouseOver={() => setCurrentHoverIndex(index)}
                onMouseLeave={() => setCurrentHoverIndex(null)}
              >
                <div
                  className={`${styles.update} ${
                    currentHoverIndex === index && styles.active
                  }`}
                  onClick={() => handleEdit(image)}
                >
                  <img src={edit} alt="Edit" />
                </div>
                <div
                  className={`${styles.delete} ${
                    currentHoverIndex === index && styles.active
                  }`}
                  onClick={() => handleDelete(image.id)}
                >
                  <img src={DeleteImage} alt="Delete" />
                </div>
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  onClick={() => handleImageClick(image)}
                />
                <span>{image.title}</span>
              </div>
            ))
          ) : (
            <p>No images match your search.</p>
          )}
        </div>
      )}
      <div>
        {selectedImageIndex !== null && (
          <Carousel
            openCarousel={openCarousel}
            selectedImage={selectedImage}
            handleLeftClick={handleLeftClick}
            handleRightClick={handleRightClick}
            handleCloseCarousel={handleCloseCarousel}
          />
        )}
      </div>
    </>
  );
};

export default Albumimages;
