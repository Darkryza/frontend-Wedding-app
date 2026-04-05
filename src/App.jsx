import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");

  // START CAMERA (first time only)
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });

      videoRef.current.srcObject = stream;
      setShowCamera(true); // ✅ only here
    } catch (err) {
      console.error(err);
    }
  };

  // RESTART CAMERA (NO setState)
  const restartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });

      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error(err);
    }
  };

  // STOP CAMERA
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // EFFECT untuk switch camera
  useEffect(() => {
    if (showCamera) {
      stopCamera();
      restartCamera();
    }
  }, [facingMode, showCamera]);

  // CAPTURE
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0);

    const photo = canvas.toDataURL("image/png");
    setImage(photo);

    stopCamera();
    setShowCamera(false);
  };

  // SWITCH CAMERA
  const switchCamera = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  return (
    <>
      <div className="container">
        <div className="title-container">
          <h1>Fanisa</h1>
          <h2>Wedding Amir & Lia</h2>
        </div>

        <div className="btn-capture-container">
          <button onClick={startCamera}>Take Photo</button>
        </div>

        {showCamera && (
          <div className="camera-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={facingMode === "user" ? "mirror" : ""}
            />

            <div className="camera-buttons">
              <button onClick={takePhoto}>📸 Capture</button>
              <button onClick={switchCamera}>🔄 Switch Camera</button>
            </div>
          </div>
        )}

        {image && (
          <div className="preview">
            <h3>Preview:</h3>
            <div className="img-container">
              <img src={image} alt="captured" />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </>
  );
}

export default App;
