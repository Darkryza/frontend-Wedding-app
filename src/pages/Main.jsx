import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Main.css";

function Main() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  const startCamera = async () => {
    setShowCamera(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
      },
      audio: false,
    });

    videoRef.current.srcObject = stream;
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    // mirror kalau camera depan
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);

    const photo = canvas.toDataURL("image/png");
    setImage(photo);

    stopCamera();
    setShowCamera(false);

    navigate("/submit", { state: { image: photo } });
  };

  // stop camera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  // switch camera depan/belakang
  const switchCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));

    setTimeout(() => {
      startCamera();
    }, 200);
  };

  return (
    <div className="main-container">
      <div className="title-container">
        <h1>Fanisa</h1>
        <h2>Wedding Amir & Lia</h2>
      </div>

      <div className="btn-capture-container">
        <button onClick={startCamera}>Take Photo</button>
      </div>

      {/* CAMERA VIEW */}
      {showCamera && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline />
          <div className="camera-buttons">
            <button onClick={takePhoto}>Capture</button>
            <button onClick={switchCamera}>Switch Camera</button>
          </div>
        </div>
      )}

      {/* PREVIEW IMAGE */}
      {image && (
        <div className="preview">
          <h3>Preview:</h3>
          <div className="img-container">
            <img src={image} alt="captured" />
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="contents-container">
        <div className="content">
          <div className="img">
            <img
              src="https://comptonhouseoffashion.co.uk/content/uploads/2019/11/Picture1-1.png"
              alt="image"
            />
          </div>
          <div className="text">
            <h2>title</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
