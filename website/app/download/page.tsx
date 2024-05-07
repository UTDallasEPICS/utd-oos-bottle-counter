'use client';
import './download-styles.css';

/*This page allows users to download the Arduino Nano ESP32 code, retrieves code from public folder.
This code does not use an API.*/

export default function DownloadPage() {
    return (
        <div className="download-container-center">
            <div className='download-container'>

                <p className="download-title">Download File</p>
                <p className='download-info'>Download the code used on the Arduino Nano ESP32</p>
                
                <div className='download-button-center'>
                    <a 
                    href="ArduinoFountain.ino"
                    download="ArduinoFountain.ino"
                    className='download-button'
                    >
                    Get File
                    </a>
                </div>
                
            </div>
        </div>
    );
}
