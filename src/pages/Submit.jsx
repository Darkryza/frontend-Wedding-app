import { useLocation } from "react-router-dom";
import "../css/Submit.css";

function Submit() {
  const location = useLocation();
  const image = location.state?.image; // gambar dari Main page

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
      <form className="submit-form-container">
        <input type="text" name="name" placeholder="Name" />
        <label htmlFor="ucapan">Ucapan</label>
        <textarea
          name="ucapan"
          id="ucapan"
          placeholder="Berikan ucapan anda di sini"
        ></textarea>
      </form>
    </div>
  );
}

export default Submit;
