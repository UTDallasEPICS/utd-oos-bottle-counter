'use client';
import React from 'react';
import './download-styles.css';

export default function DownloadPage() {
    const handleDownload = async () => {
        const response = await fetch('/api/download');
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'arduino.ino'); // any other attributes you want to add to the link
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link);
      }
    };

    return (
        <div className="download-container-center">
            <div className='download-container'>

                <p className="download-title">Download File</p>
                <p className='download-info'>Download the code used on the Arduino Nano ESP32</p>
                
                <div className='download-button-center'>
                    <button onClick={handleDownload} className='download-button'>Download Now</button>
                </div>
                
            </div>
        </div>
    );
}
