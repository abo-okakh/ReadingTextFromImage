Certainly! Here's the full README file that you can copy and paste:

```markdown
# ReadTextFromImage

This script can read image PDFs and use 11labs TTS to convert them to an MP3 file. It also uses an algorithm that turns any .txt file longer than 2500 characters (max character limit for 11labs free tier users) into multiple .txt files, each with exactly 2500 characters.

## Introduction

Mainly for learning purposes and as a starting point for anyone interested in similar projects.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed ([Download and install Node.js](https://nodejs.org/))
- Other dependencies:
  - pdf2img: `npm install pdf-img-convert`
  - tesseract.js: `npm install tesseract.js`
  - Other dependencies, if any

## Getting Started

To get a local copy up and running, follow these detailed steps:

1. **Clone the repository to your local machine:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Install the necessary dependencies:**
   ```bash
   cd your-repo
   npm install
   ```

3. **Configure API Keys:**
   - Open `index.js` in your preferred code editor.
   - Update the values for `Marcus_authoritative_and_deep` and `key` variables with your specific API keys.
     ```javascript
     let Marcus_authoritative_and_deep = 'your_tts_api_key';
     let key = 'your_11labs_api_key';
     ```

## Usage

### Reading PDF and Generating Speech

#### Read an Image

**Run the command:**
   ```javascript
   ReadImage('img/output0.png','ara')
   ```
   This will perform OCR and generate text. The first prompt is for the file path, and the second one is for the language. You can find all supported languages in the [official documentation](https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016).

#### Read PDF

**Run The Commands:**
```javascript
ReadPdf(path)
```
   - `path`: Path to the PDF.

### Other Functionalities

#### Splitting Text Files

To split a text file into chunks, use the following command:

```javascript
splitTextFile(folder,inputFilePath, chunkSize)
```
   - `folder`: Choose a folder for all the .txt files (never leave it blank).
   - `inputFilePath`: The main .txt file.
   - `chunkSize`: Max amount of characters (put 2500 for 11labs free tier).

#### Generating Speech
 
 - Generating Speech

```javascript
generateSpeech('text\\Split\\name0.txt'); //1
// or 
tts('hello', Marcus_authoritative_and_deep, 'output.mp3', key); //2
```
1. For files (remember if you are using 11lab's free tier, list use 2500 characters).
2. For general text or trying out the voice.

## File Structure

- `index.js`: Main entry point for the application
- `tts11labs.js`: External module for text-to-speech functionality

## License

This project is licensed under the MIT - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- axios
- tesseract.js
- pdf-img-convert

## Note

The file `tts11labs.js` used in this project is from another personal project [11LabsVoice](https://github.com/abo-okakh/11LabsVoice.git).
```
