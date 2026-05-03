import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Main.css";
import axios from "axios";

function Main() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [data, setData] = useState([]);
  const [splash, setSplash] = useState(true);

  const stopCamera = useCallback(() => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      stopCamera();

      let stream;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: facingMode },
          },
          audio: false,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facingMode,
          },
          audio: false,
        });
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log(`Camera Error: ${error}`);
    }
  }, [facingMode, stopCamera]);

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

    navigate("/submit", { state: { image: photo } });
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://backend-wedding-app-three.vercel.app/getData",
        );
        if (res.data.status) {
          setData(res.data.value);
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showCamera) {
      startCamera();
    }
  }, [showCamera, startCamera, stopCamera]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="title-container">
          <h1>Fanisa</h1>
          <h2>Wedding Amir & Lia</h2>
        </div>

        <div className="btn-capture-container">
          <button onClick={() => setShowCamera(true)}>Take Photo</button>
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
              <button onClick={takePhoto}>Capture</button>
              <button onClick={switchCamera}>Switch Camera</button>
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

        <div className="contents-container">
          {data.map((item) => (
            <div className="content" key={item.id}>
              <div className="img">
                <img src={item.image_url} alt="image" />
              </div>
              <div className="text">
                <h2>{item.nama}</h2>
                <p>{item.ucapan}</p>
              </div>
            </div>
          ))}
          {/* <div className="content">
            <div className="img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSANqCIcE2sxuluyx3isRqFIZ_huuAxvtnSEA&s"
                alt="image"
              />
            </div>
            <div className="text">
              <h2>Ali</h2>
              <p>dandjasdn,anlakdnain</p>
            </div>
          </div> */}
        </div>
      </div>

      {splash && (
        <div className="welcoming-page">
          <h1>Welcome to wedding Amir dan Lia</h1>
        </div>
      )}
    </>
  );
}

export default Main;
