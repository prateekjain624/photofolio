import { useState, useEffect } from "react";
import styles from "../ImageForm/ImageForm.module.css";

const ImageForm = ({ handleImageCreate, albumTitle, imageToUpdate }) => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // Populate form fields when `imageToUpdate` changes
  useEffect(() => {
    if (imageToUpdate) {
      setTitle(imageToUpdate.title || ""); // Prefill title
      setImageUrl(imageToUpdate.imageUrl || ""); // Prefill image URL
    }
  }, [imageToUpdate]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const imagesDetails = {
      title: title,
      imageUrl: imageUrl,
    };
    console.log("imge", imagesDetails);
    handleImageCreate(imagesDetails);
    clearInput();
  };

  const clearInput = () => {
    setTitle("");
    setImageUrl("");
  };

  return (
    <div className={styles.ImageForm}>
      <span>
        {imageToUpdate
          ? `Edit Image in ${albumTitle}`
          : `Add Image to ${albumTitle}`}
      </span>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="Image url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div className={styles.actions}>
          <button type="button" onClick={clearInput}>
            Clear
          </button>
          {/* <button>Add</button> */}
          <button type="submit">{imageToUpdate ? "Update" : "Add"}</button>
        </div>
      </form>
    </div>
  );
};

export default ImageForm;
