import React, { useRef } from "react";
import AlbumStyles from "../Album/Album.module.css";
import { toast } from "react-toastify";

const AlbumForm = ({ handleAlbumCreate }) => {
  // const [albumName, setAlbumName] = useState("");
  const albumNameInput = useRef();

  // function to hndlecreateNewAlbum
  const handleCreateNewAlbum = (e) => {
    e.preventDefault();

    const albumName = albumNameInput.current.value;

    handleAlbumCreate(albumName);
    handleClearForm();
  };

  const handleClearForm = () => {
    albumNameInput.current.value = "";
  };

  return (
    <div className={AlbumStyles.albumContainer}>
      <span className={AlbumStyles.albumTitle}>Create an album</span>
      <form className={AlbumStyles.albumForm} onSubmit={handleCreateNewAlbum}>
        <input
          type="text"
          className={AlbumStyles.albumInput}
          name="albumName"
          ref={albumNameInput}
          placeholder="Album Name"
          autoFocus
        />
        <button
          type="button"
          className={`${AlbumStyles.albumBtn} ${AlbumStyles.albumClear}`}
          onClick={handleClearForm}
        >
          Clear
        </button>
        <button
          className={`${AlbumStyles.albumBtn} ${AlbumStyles.albumCreate}`}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AlbumForm;
