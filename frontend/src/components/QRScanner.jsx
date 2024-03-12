import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import QRCode from 'qrcode';
import jsQR from 'jsqr';

function QRScanner() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState(''); {/*< store qr data>*/}
  const videoRef = useRef(null); {/*<capture the live scence>*/}
  const canvasRef = useRef(null); {/*<capture the video frame , extract qr code mean detected >*/}

  useEffect(() => {
    const constraints = { video: { facingMode: 'environment' } };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      setScanResultWebCam(code.data);
      setTimeout(() => {
        window.location.reload();
      }, 5000); // Refresh the page after 5 seconds
    } else {
      requestAnimationFrame(handleScanWebCam);
    }
  };

  useEffect(() => {
    const constraints = { video: { facingMode: 'environment' } };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <Card>
        <Row gutter={[16, 16]}>
        

          <Col xl={8} lg={8} md={12} sm={24} xs={24}></Col>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <h3>Scan your QR code here</h3>
            <video style={{ width: '100%' }} ref={videoRef} autoPlay playsInline muted onCanPlay={() => handleScanWebCam()} /> {/*< on can play video is start>*/} {/*< capture the video frame>*/}
            <canvas style={{ display: 'none' }} ref={canvasRef} width={640} height={480} />
            <br></br>
            <h3>Attendance details:<h1 className='text-2xl'> {scanResultWebCam} </h1></h3> {/*<store the qr data*/} {/*<details display>*/}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default QRScanner;



