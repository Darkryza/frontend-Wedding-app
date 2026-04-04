import { useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);
  const [image, setImage] = useState(null);

  // buka camera
  const startCamera = async () => {
    setShowCamera(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user", // guna camera belakang
      },
      audio: false,
    });

    videoRef.current.srcObject = stream;
  };

  // tangkap gambar
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const photo = canvas.toDataURL("image/png");
    setImage(photo);

    stopCamera();
    setShowCamera(false);
  };

  // stop camera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
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

        {/* CAMERA VIEW */}
        {showCamera && (
          <div className="camera-container">
            <video ref={videoRef} autoPlay playsInline />
            <button onClick={takePhoto}>📸 Capture</button>
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
    </>
  );
}

export default App;

// import "./App.css";

// function App() {
//   return (
//     <>
//       <div className="container">
//         <div className="title-container">
//           <h1>Fanisa</h1>
//           <h2>Wedding Amir & Lia</h2>
//         </div>
//         <div className="btn-capture-container">
//           <button>Take Photo</button>
//         </div>
//         <div className="contents-container">
//           <div className="content">
//             <div className="img">
//               <img
//                 src="https://comptonhouseoffashion.co.uk/content/uploads/2019/11/Picture1-1.png"
//                 alt="image"
//               />
//             </div>
//             <div className="text">
//               <h2>title</h2>
//               <p>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Praesentium amet dolor odio consectetur quia rem temporibus,
//                 ipsam ipsum ex provident magni nihil eligendi nesciunt placeat
//                 consequuntur quasi neque, vero quibusdam.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
