import { useLocation } from "react-router-dom";
import "../css/Submit.css";

function Submit() {
  const location = useLocation();
  const image = location.state?.image; // gambar dari Main page

  return (
    <div>
      <h1>Submit Page</h1>
      {image ? (
        <img src={image} alt="captured" />
      ) : (
        <p>No image found. Please go back and take a photo.</p>
      )}
    </div>
  );
}

export default Submit;
