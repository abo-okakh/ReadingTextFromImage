const axios = require('axios');
const fs = require('fs');
const stream = require('stream');
function tts(text,voiceid,filename,key){
    const XI_API_KEY = key;
    const VOICE_ID = voiceid;
    const TEXT_TO_SPEAK = text;
    const OUTPUT_PATH = filename;
    
    const tts_url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`;
    
    const headers = {
        "Accept": "application/json",
        "xi-api-key": XI_API_KEY,
        "Content-Type": "application/json"
    };
    
    const data = {
        "text": TEXT_TO_SPEAK,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.8,
            "style": 0.0,
            "use_speaker_boost": true
        }
    };
    
    axios.post(tts_url, data, { headers: headers, responseType: 'stream' }).then(response => {
        const file = fs.createWriteStream(OUTPUT_PATH);
        const pipeline = stream.pipeline;
        pipeline(response.data, file, err => {
            if (err) {
                console.error('Something went wrong:', err);
            }
        });
    }).catch(error => {
        console.error(`#! An error occurred: Code :${error.code} ,  Url-connection: ${error.response.connection} , Url-res-status ${error.response.status} `);
    });
}

module.exports = tts;
