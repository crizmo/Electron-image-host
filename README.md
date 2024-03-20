# Screenshot Image Host  [ WIP ]
Simple demonstration of a desktop application that captures a screenshot and uploads it to a server.

You can customize the server to your liking, as in instead of your own server you can use a third-party service like [imgur](https://imgur.com/) or [cloudinary](https://cloudinary.com/) or [imgbb](https://imgbb.com/).

It's a work in progress and I'm open to suggestions and contributions.

## Features

- Capture a screenshot of the entire screen or a specific area.
- Image is then converted to base64 and uploaded to the server.
- The URL of the uploaded image is then copied to the clipboard.

## Technologies Used

- **Electron**: A framework for building cross-platform desktop applications using web technologies.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Multer**: A middleware for handling `multipart/form-data`, which is primarily used for uploading files.

## Installation

1. Clone the repository.
2. cd into the project directory.
3. cd into the server and the screenhost [ client ] directories and run `npm install` to install the dependencies.
4. Run `npm start` in the server directory to start the server.
5. Run `npm start` in the screenhost [ client ] directory to start the application.

## Usage

1. Launch the application.
2. Capture a screenshot of the desired area or the entire screen. [ current shortcut: `Ctrl + 1` ]
3. The image is then uploaded to the server and the URL is copied to the clipboard.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.