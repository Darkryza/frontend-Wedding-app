import { useLocation, useNavigate } from "react-router-dom";
import "../css/Submit.css";
import { useState } from "react";
import axios from "axios";

function Submit() {
  const location = useLocation();
  const image = location.state?.image;

  console.log(image);

  const [data, setData] = useState({
    name: "",
    ucapan: "",
  });

  const navigate = useNavigate();

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(value);
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const imageFile = dataURLtoFile(image, "photo.png");

    console.log(imageFile);

    formData.append("image", imageFile);
    formData.append("name", data.name);
    formData.append("ucapan", data.ucapan);

    try {
      const res = await axios.post("http://localhost:5211/addUcapan", formData);

      if (res.data.status) {
        alert(res.data.message);
        navigate("/");
      } else {
        alert("Error from server");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="submit-container">
      {image ? (
        <div className="img-container">
          <img src={image} alt="captured" />
          {/* <img
            src="https://comptonhouseoffashion.co.uk/content/uploads/2019/11/Picture1-1.png"
            alt="captured"
          /> */}
        </div>
      ) : (
        <p>No image found. Please go back and take a photo.</p>
      )}
      <div className="title">
        <h1>Berikan Ucapan buat pengantin</h1>
      </div>
      <form className="submit-form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tulis nama anda di sini"
          onChange={handleChange}
        />

        <textarea
          name="ucapan"
          id="ucapan"
          placeholder="Berikan ucapan anda di sini"
          onChange={handleChange}
        ></textarea>
        <button type="submit">Hantar</button>
      </form>
    </div>
  );
}

export default Submit;
