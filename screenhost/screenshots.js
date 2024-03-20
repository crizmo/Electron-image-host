const { desktopCapturer, screen, shell, nativeImage, clipboard } = require('electron');
const EventEmitter = require('events');
const axios = require('axios');

class Screenshots extends EventEmitter {
  constructor() {
    super();
    this.bounds = null;
  }

  startCapture() {
    this.bounds = screen.getPrimaryDisplay().bounds;
    this.captureScreen(this.bounds);
  }

  captureArea(x, y, width, height) {
    this.bounds = { x, y, width, height };
    this.captureScreen(screen.getPrimaryDisplay().bounds);
  }

  captureScreen(fullBounds) {
    desktopCapturer.getSources({ types: ['screen'], thumbnailSize: fullBounds }).then(async sources => {
      for (const source of sources) {
        if (source.name === 'Entire screen' || source.name === 'Screen 1') {
          const fullScreenshot = source.thumbnail;
          const croppedImage = nativeImage.createFromBuffer(fullScreenshot.toPNG()).crop(this.bounds);
          const base64Image = croppedImage.toPNG().toString('base64');

          // Send the base64 image to the server
          const response = await axios.post('http://localhost:3000/upload', { image: base64Image });

          // The server's response contains the URL of the uploaded image
          const imageUrl = response.data.url;

          // copy the URL to the clipboard
          clipboard.writeText(imageUrl);

          this.emit('ok', croppedImage.toPNG(), this.bounds);
          this.emit('afterSave', croppedImage.toPNG(), this.bounds, true);
          shell.openExternal(imageUrl);
        }
      }
    });
  }
}

module.exports = Screenshots;