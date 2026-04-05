import { useLocation } from "react-router-dom";
import "../css/Submit.css";

function Submit() {
  const location = useLocation();
  const image = location.state?.image; // gambar dari Main page

  return (
    <div className="submit-container">
      <div className="img-container">
        {image ? (
          // <img src={image} alt="captured" />
          <img
            src="https://comptonhouseoffashion.co.uk/content/uploads/2019/11/Picture1-1.png"
            alt="captured"
          />
        ) : (
          <p>No image found. Please go back and take a photo.</p>
        )}
      </div>
    </div>
  );
}

export default Submit;
