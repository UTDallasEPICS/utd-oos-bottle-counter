'use client';
import React from 'react';

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
        <div>
            <h1>Download File</h1>
            <button onClick={handleDownload}>Download Now</button>
        </div>
    );
}
