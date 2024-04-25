import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Define the path to the file
    const filePath = path.resolve('./app', 'arduino.ino');

    // Set the correct headers to tell the browser to download the file
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="arduino.ino"');

    // Create a read stream and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
}
