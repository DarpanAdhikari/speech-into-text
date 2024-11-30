# SpeechToText NPM Package  

**SpeechToText** is a lightweight, multi-language voice-to-text conversion package designed for seamless integration into web applications. It supports customization, works with both `<textarea>` and `<div>`, and can be used via NPM or CDN. [Demo](https://intotext.darpanadhikari.com.np)

## Features  

- **Multi-Language Support**: Recognizes languages like English, Nepali, Spanish, French, and more.  
- **Customizable Controls**: Flexible options to start, stop, clear, and copy text.  
- **HTML Compatibility**: Works with both `<textarea>` and `<div>` elements for output.  
- **Lightweight & Flexible**: Easy to set up and adapt to your project needs.  
- **language Preserve**: Selected language will still selected on reload.  
- **Clicky Buttons**: CSS is integrated with button to make them clicky.  

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
  <textarea id="outPut" placeholder="Start speaking..." rows="5"></textarea>
  <!-- works with div or any html tag -->
  <!-- <div id="outPut"></div> -->

  <!-- Language Selector -->
  <select id="langSelection"></select>  

  <!-- Control Buttons -->
  <button id="startBtn">Start</button>
  <!-- ----Optional Buttons----- -->
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
speechToText('outPut', 'clearBtn', 'startBtn', 'copyBtn', 'langSelection'); 
```
#### Minimal Setup 
```javascript
import { speechToText } from 'https://unpkg.com/speech-into-text@latest/index.js';
speechToText('outPut', '', 'startBtn', '', 'langSelection');
```

### Using NPM Package

Initialize the `speechToText` function with the IDs of your HTML elements:  

#### Full Setup  
```javascript  
import { speechToText } from 'speech-into-text';
speechToText('outPut', 'clearBtn', 'startBtn', 'copyBtn', 'langSelection');

```  

#### Minimal Setup  
```javascript  
import { speechToText } from 'speech-into-text';
speechToText('outPut', '', 'startBtn', '', 'langSelection'); 
```  

### Required Elements  

The following elements are **mandatory** for proper functionality:  

1. **Output Holder**: (`outPut`) – A `<textarea>` or `<div>` where transcribed text will appear.  
2. **Start Button**: (`startBtn`) – A button to control voice recognition.  
3. **Language Selector**: (`langSelection`) – A dropdown to select the desired recognition language.  

If any of these are missing, an error will be logged:  
```plaintext  
Incomplete HTML format: Missing output holder or start button or language selector.  
```  

---

## Supported Languages  

The package supports a variety of languages, including:  

- **English (US)**  
- **English (UK)**  
- **Nepali**  
- **Hindi**  
- **Spanish**  
- **French**  
- **German**  
- **Japanese**  
- **Chinese**  
- **Russian**  

---

## Example Usage  

Here’s an example workflow:  

1. Select the desired language from the dropdown.  
2. Click the "Start" button to begin speech recognition.  
3. Speak, and the transcribed text will appear in the `outPut` field.  
4. Use the "Clear" button to reset the output.  
5. Optionally, copy the output using the "Copy" button.  

---

## Browser Compatibility  

This package relies on the **SpeechRecognition API**, which is supported in:  

- **Google Chrome**  
- **Microsoft Edge**  
- Other Chromium-based browsers  

**Note**: Ensure HTTPS is enabled, as the API requires a secure context. 

Developed with ❤️ by [Darpan Adhikari](https://www.darpanadhikari.com.np). 
---

## License  

This project is licensed under the [Apache-2.0 License](https://opensource.org/licenses/Apache-2.0).  

---

Elevate your web applications with seamless voice-to-text integration! 🚀