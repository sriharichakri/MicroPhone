const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
const cors = require('cors');

// Allow cross-origin requests from any origin
app.use(cors({
  exposedHeaders: ['Authorization']
}));

// Set up middleware to parse incoming request body as JSON
app.use(bodyParser.json());

// Define a route to handle POST requests to /upload-audio
app.post('/upload-audio', (req, res) => {
    // Get the audio data from the request body
    res.set('Access-Control-Allow-Origin', '*');
    const buffer = Buffer.from(req.body.audioBlob, 'base64');

    // Generate a unique file name for the audio file
    const fileName = `audio-${Date.now()}.mp3`;

    // Write the buffer to a file on the server
    fs.writeFile(fileName, buffer, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing audio file to server');
        } else {
            res.status(200).send('Audio file saved to server');
        }
    });
});
app.get('/audio-files', (req, res) => {
  // Get the list of audio files in the server's working directory
  fs.readdir('.', (err, files) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error reading audio files from server');
      } else {
          // Filter the list of files to only include audio files
          const audioFiles = files.filter(file => path.extname(file) === '.mp3');

          // Send the list of audio files in the response
          res.status(200).send(audioFiles);
      }
  });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
