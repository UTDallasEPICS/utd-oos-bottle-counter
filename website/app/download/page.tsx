'use client';
import './download-styles.css';

export default function DownloadPage() {
    return (
        <div className="download-container-center">
            <div className='download-container'>

                <p className="download-title">Download File</p>
                <p className='download-info'>Download the code used on the Arduino Nano ESP32</p>
                
                <div className='download-button-center'>
                    <a 
                    href="arduino.ino"
                    download="arduino.ino"
                    className='download-button'
                    >
                    Get File
                    </a>
                </div>
                
            </div>
        </div>
    );
}
