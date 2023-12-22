require('dotenv').config();
let Marcus_authoritative_and_deep = 'KvgnJ4GfGOIqafMqcSlO';
const key = process.env.KEY;
// let pathtext = 'text/text.txt'
const tts = require('./tts11labs.js')
const pdf2img = require('pdf-img-convert')
const fs = require('fs')
const {createWorker} = require('tesseract.js')
const path = require('path')
async function ReadImage(path,lang){
    const worker = await createWorker(lang)
    const img = await worker.recognize(path)
    let Text = img.data.text
    // console.log(Text)
    await worker.terminate
    return Text
}
// ReadImage('img/output0.png','ara')


async function ReadPdf(path) {
    console.log('Reading... PDF?');
    let pathText = '';
    let pdfArray = await pdf2img.convert(path, { scale: 2.0 });

    for (let i = 0; i < pdfArray.length; i++) {
        fs.writeFile(`img/output${i}.png`, pdfArray[i], function (error) {
            if (error) {
                console.error("Error: " + error);
            }
        });
    }

    let Data = '';

    for (let i = 0; i < pdfArray.length; i++) {
        try {
            Data += await ReadImage(`img/output${i}.png`, 'ara');
            console.log(`Done : ${i}`);
        } catch (er) {
            console.log(er);
        }
    }

    await fs.promises.writeFile(`text/${path}.txt`, Data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        pathText = `text/${path}.txt`
    });
    await generateSpeech(pathText)
}
function CharCounter(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data.length;
    } catch (err) {
        console.error('Error reading file:', err.message);
        return null; // or throw an error, depending on your use case
    }
}
function splitTextFile(folder,inputFilePath, chunkSize) {
    // Read the content of the original text file
    const originalContent = fs.readFileSync(inputFilePath, 'utf8');
    // Calculate the number of chunks needed
    const totalChunks = Math.ceil(originalContent.length / chunkSize);
    // Split the content into chunks and write to files
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = (i + 1) * chunkSize;
      const chunkContent = originalContent.slice(start, end);
      // Write each chunk to a new text file
      const outputFilePath = `${folder}/name${i}.txt`;
      fs.writeFileSync(outputFilePath, chunkContent, 'utf8');
      console.log(`Created ${outputFilePath}`);
    }
  }
function generateSpeech(pathText) { /// max char should be 2500/2500
    let maxChar = 2500
    const outputPath = 'mp3/output.mp3';
    const readStream = fs.createReadStream(pathText, 'utf8');
    let text = ''; // Initialize an empty string to accumulate data
    readStream.on('data', (chunk) => {
        text += chunk;
        if(text.length == maxChar){
            tts(text, Marcus_authoritative_and_deep,outputPath, key);
        }else{
            console.log('something when wrong :(')
        }
    });

    readStream.on('end', () => {
        console.log(`Speech generated successfully. Saved to: ${outputPath} .. just wait a mint`);
    });

    readStream.on('error', (err) => {
        console.error('Error reading file:', err.message);
    });
}
// splitTextFile('text\\Split','text\\fake_zikola.pdf.txt',2500)
// generateSpeech('text\\Split\\name0.txt');
// tts('text\\fake.txt',Marcus_authoritative_and_deep,'output.mp3',key)

