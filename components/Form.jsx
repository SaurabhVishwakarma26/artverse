import "@styles/Form.scss";

import { categories } from "@data";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

function Form({ title, work, setWork, handleSubmit }) {
  const handleUploadImage = (e) => {
    const newPhotos = e.target.files;
    setWork((prevWork) => {
      return { ...prevWork, photos: [...prevWork.photos, ...newPhotos] };
    });
  };

  const handleRemovePhoto = (indexToRemove) => {
    setWork((prevWork) => {
      return {
        ...prevWork,
        photos: prevWork.photos.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  const handleChange = (e) => {
    setWork((prevWork) => {
      return {
        ...prevWork,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="form">
      <h1>{title} Your Work</h1>
      <form onSubmit={handleSubmit}>
        <h3>Which of these category best describe your work?</h3>
        <div className="category-list">
          {categories.map((item, index) => (
            <p
              key={index}
              className={`${work.category === item ? "selected" : ""}`}
              onClick={() => {
                setWork({ ...work, category: item });
              }}
            >
              {item}
            </p>
          ))}
        </div>

        <h3>Add Some Photos of your work</h3>
        {work.photos.length < 1 && (
          <div className="photos">
            <input
              id="image"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadImage}
              multiple
            ></input>
            <label htmlFor="image" className="alone">
              <div className="icon">
                <IoIosImages />
              </div>
              <p>Upload from your Device</p>
            </label>
          </div>
        )}
        {work.photos.length > 0 && (
          <div className="photos">
            {work?.photos?.map((photo, index) => (
              <div key={index} className="photo">
                {photo instanceof Object ? (
                  <img src={URL.createObjectURL(photo)} alt="work" />
                ) : (
                  <img src={photo} alt="work" />
                )}
                <button type="button" onClick={() => handleRemovePhoto(index)}>
                  <BiTrash />
                </button>
              </div>
            ))}
            <input
              id="image"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadImage}
              multiple
            ></input>
            <label htmlFor="image" className="together">
              <div className="icon">
                <IoIosImages />
              </div>
              <p>Upload from your Device</p>
            </label>
          </div>
        )}
        <h3>What make your work attractive</h3>
        <div className="description">
          <p>Title</p>
          <input
            type="text"
            value={work.title}
            placeholder="Title"
            name="title"
            onChange={handleChange}
            required
          />
          <p>Description</p>
          <textarea
            type="text"
            value={work.description}
            placeholder="Description"
            name="description"
            onChange={handleChange}
            required
          />
          <p>Now Set your Price</p>
          <span>$</span>
          <input
            placeholder="Price"
            type="number"
            value={work.price}
            name="price"
            required
            onChange={handleChange}
            className="price"
          />
        </div>
        <button type="submit" className="submit_btn">
          Publish your work
        </button>
      </form>
    </div>
  );
}

export default Form;
