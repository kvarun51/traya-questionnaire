'use client';

import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from 'antd';
import { setQuestionProgress } from '@/lib/session'; // adjust path if needed

type FileUploadCaptureProps = {
  questionId: string;
  onNext?: () => void;
};

export default function FileUploadCapture({ questionId, onNext }: FileUploadCaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const videoConstraints = {
    facingMode: 'environment',
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      setQuestionProgress(questionId, imageSrc);
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
