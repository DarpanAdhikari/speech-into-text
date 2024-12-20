# SpeechToText NPM Package  

**SpeechToText** is a lightweight, multi-language voice-to-text conversion package designed for seamless integration into web applications. It supports customization, works with both `<textarea>` and `<div>`, and can be used via NPM or CDN. [Demo](https://intotext.darpanadhikari.com.np)  

## Features  

- **Multi-Language Support**: Recognizes languages like English, Nepali, Spanish, French, and more.  
- **Customizable Controls**: Flexible options to start, stop, clear, and copy text.  
- **HTML Compatibility**: Works with both `<textarea>` and `<div>` elements for output.  
- **Lightweight & Flexible**: Easy to set up and adapt to your project needs.  
- **Language Preserve**: Selected language remains selected on reload.  
- **Versatile Button Selectors**: Pass selectors like `id`, `class`, or `tag` for buttons and dropdowns.  
- **Clicky Buttons**: CSS is integrated to make buttons visually appealing.  

---

## Installation  

### Using NPM  

Install the package via NPM:  
```bash  
npm install speech-into-text  
```  

---

## Getting Started  

### HTML Setup  

To use **SpeechToText**, ensure the following elements are in your HTML:  

```html  
<div>  
  <!-- Text Output Area -->
  <div class="indicator listening">
    <textarea id="outPut" placeholder="Start speaking..." rows="5"></textarea>
  </div>
  <!-- works with div or any html tag -->
  <!-- <div id="outPut"></div> -->
  
  <!-- Control Buttons -->
  <button id="startBtn">Start</button>
  <button id="stopBtn">Stop</button> <!-- Optional -->
  <!-- ----Optional Buttons----- -->
  <!-- Language Selector -->
  <select id="langSelection"></select>  
  <button id="clearBtn">Clear</button>
  <button id="copyBtn">Copy</button>
</div>  
```  

### Using CDN  

Include the package via a CDN if installation is not preferred:  
```html  
<script type="module" src="script.js"></script>  
```  

#### Full Setup  
```javascript  
import { speechToText } from 'https://unpkg.com/speech-into-text@latest/index.js';  
speechToText('outPut', 'clearBtn', 'startBtn', 'stopBtn', 'copyBtn', 'langSelection');  
```  

#### Minimal Setup  
```javascript  
import { speechToText } from 'https://unpkg.com/speech-into-text@latest/index.js';  
speechToText('outPut', '', 'startBtn', '', '', 'langSelection');  
//if there is no lang selection required 
// speechToText('outPut', '', 'startBtn', '', '', 'en-US'); 
```  

### Using NPM Package  

Initialize the `speechToText` function with the appropriate selectors:  

#### Full Setup  
```javascript  
import { speechToText } from 'speech-into-text';  
speechToText('outPut', 'clearBtn', 'startBtn', 'stopBtn', 'copyBtn', 'langSelection');  
//if there is no lang selection required 
// speechToText('outPut', 'clearBtn', 'startBtn', 'stopBtn', 'copyBtn', 'en-US'); 
```  

#### Minimal Setup  
```javascript  
import { speechToText } from 'speech-into-text';  
speechToText('outPut', '', 'startBtn', '', 'langSelection');  
//if there is no lang selection required 
// speechToText('outPut', '', 'startBtn', '', '', 'en-US'); 
```  

---

### Key Updates  

1. **Stop Button**: An optional `stopBtn` parameter to stop speech recognition.  
2. **Flexible Selectors**: Buttons and dropdowns can use selectors like `id`, `class`, `tag`, or a combination (e.g., `tag.class`, `tag#id`).  
3. **Language Selector**: Supports dropdown IDs, classes, or a predefined code list.  

---

## Supported Languages  

The package supports a wide variety of languages. You can pass the dropdown `id/class` or directly specify a language code.  

| **Code**  | **Language**               | **Region**      |  
|-----------|----------------------------|-----------------|  
| en-US     | English                    | United States   |  
| ne-NP     | Nepali                     | Nepal           |  
| en-GB     | English                    | United Kingdom  |  
| es-ES     | Spanish                    | Spain           |  
| fr-FR     | French                     | France          |  
| de-DE     | German                     | Germany         |  
| hi-IN     | Hindi                      | India           |  
| ja-JP     | Japanese                   | Japan           |  
| ko-KR     | Korean                     | Korea           |  
| zh-CN     | Chinese                    | China           |  
| pt-PT     | Portuguese                 | Portugal        |  
| ru-RU     | Russian                    | Russia          |  
| ar-SA     | Arabic                     | Saudi Arabia    |  
| it-IT     | Italian                    | Italy           |  
| tr-TR     | Turkish                    | Turkey          |  
| pl-PL     | Polish                     | Poland          |  
| nl-NL     | Dutch                      | Netherlands     |  
| sv-SE     | Swedish                    | Sweden          |  
| da-DK     | Danish                     | Denmark         |  
| cs-CZ     | Czech                      | Czech Republic  |  
| fi-FI     | Finnish                    | Finland         |  
| el-GR     | Greek                      | Greece          |  
| th-TH     | Thai                       | Thailand        |  
| hu-HU     | Hungarian                  | Hungary         |  
| ro-RO     | Romanian                   | Romania         |  
| sk-SK     | Slovak                     | Slovakia        |  
| hr-HR     | Croatian                   | Croatia         |  
| bg-BG     | Bulgarian                  | Bulgaria        |  
| sr-RS     | Serbian                    | Serbia          |  
| vi-VN     | Vietnamese                 | Vietnam         |  
| ms-MY     | Malay                      | Malaysia        |  
| id-ID     | Indonesian                 | Indonesia       |  
| ta-IN     | Tamil                      | India           |  
| ml-IN     | Malayalam                  | India           |  

---

## Example Usage  

1. Select a language via dropdown or predefined code.  
2. Click "Start" to initiate recognition.  
3. Speak, and transcription appears in `outPut`.  
4. Optionally use "Stop," "Clear," or "Copy" buttons.  

---

## Browser Compatibility  

This package relies on the **SpeechRecognition API**, supported in:  

- **Google Chrome**  
- **Microsoft Edge**  
- Other Chromium-based browsers  

**Note**: HTTPS is required for this API.  

Developed with ❤️ by [Darpan Adhikari](https://www.darpanadhikari.com.np).  

---  

## License  

This project is licensed under the [Apache-2.0 License](https://opensource.org/licenses/Apache-2.0).  

---  

Elevate your web applications with seamless voice-to-text integration! 🚀  