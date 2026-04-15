import React, { useRef, useState } from "react";
import styles from "./CreateFood.module.css";
import axios from "axios";

const CreateFood = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleVideoChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setVideoFile(null);
      setPreviewUrl("");
      return;
    }

    const preview = URL.createObjectURL(file);
    setVideoFile(file);
    setPreviewUrl(preview);
    setStatus("");
  };

  const handleReset = () => {
    setName("");
    setDescription("");
    setVideoFile(null);
    setPreviewUrl("");
    setStatus("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);

    const response = await axios.post(
      "http://localhost:3000/api/food/upload",
      formData,
      {
        withCredentials: true,
      },
    );

    console.log(response.data);

    if (!name.trim() || !description.trim() || !videoFile) {
      setStatus("Please fill in all fields and select a video.");
      return;
    }

    setStatus("Food reel prepared for upload. Form has been reset.");
    handleReset();
  };

  return (
    <main className={styles["create-food-page"]}>
      <section className={styles["create-food__hero"]}>
        <div>
          <p className={styles["create-food__label"]}>Food Partner Upload</p>
          <h1 className={styles["create-food__title"]}>
            Add a new food video reel
          </h1>
          <p className={styles["create-food__subtitle"]}>
            Upload your food video, add a name and description, then preview
            before submission.
          </p>
        </div>
      </section>

      <section className={styles["create-food__content"]}>
        <form className={styles["create-food__form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="food-name">Food name</label>
            <input
              id="food-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex: Butter Chicken Wrap"
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="food-description">Description</label>
            <textarea
              id="food-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the food reel in one sentence"
              rows={4}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="food-video">Food video</label>
            <input
              id="food-video"
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
          </div>

          <div className={styles["form-actions"]}>
            <button
              type="submit"
              className={`${styles.btn} ${styles["btn-primary"]}`}
            >
              Upload food reel
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles["btn-secondary"]}`}
              onClick={handleReset}
            >
              Reset form
            </button>
          </div>

          {status && <div className={styles["form-status"]}>{status}</div>}
        </form>

        <aside className={styles["create-food__preview-card"]}>
          <div className={styles["preview-card__header"]}>
            <h2>Live video preview</h2>
            <p>See the clip before upload.</p>
          </div>

          <div className={styles["preview-card__preview"]}>
            {previewUrl ? (
              <video
                src={previewUrl}
                controls
                loop
                className={styles["preview-card__video"]}
              />
            ) : (
              <div className={styles["preview-card__empty"]}>
                Select a video to preview it here.
              </div>
            )}
          </div>

          <div className={styles["preview-card__meta"]}>
            <p>
              <strong>Name:</strong> {name || "—"}
            </p>
            <p>
              <strong>Description:</strong> {description || "—"}
            </p>
            <p>
              <strong>File:</strong> {videoFile?.name || "No file chosen"}
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default CreateFood;
