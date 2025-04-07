'use client';

import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button } from 'antd';

export default function FileUploadCapture({ onNext }: { onNext?: () => void }) {
  const webcamRef = useRef<Webcam>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const videoConstraints = {
    facingMode: 'environment', // Use 'user' for front cam
  };

  useEffect(() => {
    // Load from localStorage if available
    const storedImage = localStorage.getItem('capturedImage');
    if (storedImage) {
      setPreview(storedImage);
    }
  }, []);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      localStorage.setItem('capturedImage', imageSrc);
    }
  };

  const handleSubmit = () => {
    if (onNext) onNext();
  };

  return (
    <div style={{ maxWidth: 400 }}>
      {!preview ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ width: '100%', borderRadius: 8, marginBottom: 12 }}
          />
          <Button onClick={capturePhoto} type="primary">
            Capture Photo
          </Button>
        </>
      ) : (
        <>
          <img
            src={preview}
            alt="Captured"
            style={{ width: '100%', borderRadius: 8, marginBottom: 12 }}
          />
          <Button onClick={() => setPreview(null)} style={{ marginRight: 8 }}>
            Retake
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      )}
    </div>
  );
}
