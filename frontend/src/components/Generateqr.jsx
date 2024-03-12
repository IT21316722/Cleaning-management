import React, { useState } from 'react';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import QRCode from 'qrcode';

function Generateqr() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Typography.Title level={2} style={{ background: '#3f51b5', color: '#fff', padding: 20 }}>
        Generate and download QR code
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xl={8} lg={8} md={12} sm={24} xs={24}>
          <Input placeholder="Enter text here" onChange={(e) => setText(e.target.value)} />
          <Button style={{ marginTop: 10, marginBottom: 20 }} onClick={generateQrCode}>Generate</Button>
          {imageUrl ? (
            <a href={imageUrl} download>
              <img src={imageUrl} alt="QR code" />
            </a>
          ) : null}
        </Col>
      </Row>
    </Card>
  );
}

export default Generateqr;
