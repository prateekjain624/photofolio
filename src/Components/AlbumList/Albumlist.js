import React, { useEffect, useRef, useState } from "react";
import AlbumForm from "../Album/AlbumForm";
import Albumliststyles from "../AlbumList/Albumlist.module.css";
import album_images from "../Assets/album_images.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// firebase importing
import { db } from "../../fireebaseinit";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Albumimages from "../ImageList/Albumimages";

const Albumlist = () => {
  const [showForm, setShowForm] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const toastDisplayed = useRef(false);

  const fetchAlbums = async () => {
    const q = query(collection(db, "albums"), orderBy("createdAt", "desc"));

    setLoading(true);
    try {
      const querySnapshot = await getDocs(q);

      const albumsList = [];
      querySnapshot.forEach((doc) => {
        albumsList.push({ id: doc.id, ...doc.data() });
      });

      setAlbums(albumsList);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch albums");
    } finally {
      setLoading(false);
    }
  };

  //   reading the data from firestore
  useEffect(() => {
    fetchAlbums();
  }, []);

  //   this function handles displaying form and removing form
  const handleShowForm = () => {
    setShowForm((prevForm) => !prevForm);
  };

  //   this function create the new Albums
  const handleAlbumCreate = async (albumName) => {
    if (!albumName) {
      toast.error("Album name should not be empty.");
      return;
    }

    try {
      await addDoc(collection(db, "albums"), {
        title: albumName,
        createdAt: new Date(),
      });
      fetchAlbums();
      setShowForm(false);

      toast.success("Album created successfully");
    } catch (error) {
      console.log("Error in creating ALbums: ", error);
    }
  };

  //   this function delete the album
  const handleDeleteBtn = async (id) => {
    try {
      await deleteDoc(doc(db, "albums", id));
      toast.success("Album deleted successfully");
      fetchAlbums();
    } catch (error) {
      console.log("Error deleting album:", error);
      toast.error("Failed to delete album");
    }
  };

  const handleAlbumClick = (id, title) => {
    setSelectedAlbum({ albumId: id, albumTitle: title });
  };

  const handleBack = () => {
    setSelectedAlbum(null);
  };

  //   returning UI
  return (
    <>
      {showForm ? <AlbumForm handleAlbumCreate={handleAlbumCreate} /> : ""}
      {!selectedAlbum && (
        <div className={Albumliststyles.main}>
          <h2>Your Albums</h2>
          <button
            className={` ${showForm ? Albumliststyles.cancel : ""}`}
            onClick={handleShowForm}
          >
            {showForm ? "Cancel" : "Add Album"}
          </button>
        </div>
      )}

      {loading ? (
        <div className={Albumliststyles.loaderContainer}>
          <span className={Albumliststyles.loader}></span>
        </div>
      ) : albums.length === 0 ? (
        <p className={Albumliststyles.NoALbum}>No albums available</p>
      ) : selectedAlbum ? (
        <Albumimages handleBack={handleBack} title={selectedAlbum.albumTitle} />
      ) : (
        <div className={Albumliststyles.albumList}>
          {albums.map((album) => (
            <div
              className={Albumliststyles.album}
              key={album.id}
              onClick={() => handleAlbumClick(album.id, album.title)}
            >
              <div className={Albumliststyles.remove}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="lg"
                  color="red"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBtn(album.id);
                  }}
                />
              </div>

              <img src={album_images} alt="name" />
              <span>{album.title}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Albumlist;
