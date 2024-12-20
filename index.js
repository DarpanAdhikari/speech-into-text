export async function speechToText(
  {outPut,
  clearBtn,
  startBtn,
  stopBtn,
  copyBtn,
  langSelection,
  recIndicator,
}) {
  let speachRec = window.webkitSpeechRecognition || window.SpeechRecognition;
  
    if (!speachRec) {
      alert("Speech Recognition API is not supported in this browser.");
      console.error("Speech Recognition API is unsupported.");
      return;
    }
    const outputHolder = document.querySelector(outPut),
      startBtnEl = document.querySelector(startBtn),
      stopBtnEl = stopBtn ? document.querySelector(stopBtn) : null,
      clearBtnEl = clearBtn ? document.querySelector(clearBtn):null,
      copyBtnEl = copyBtn ? document.querySelector(copyBtn) : null,
      indicatorEl = recIndicator ? document.querySelector(recIndicator) : null,
      langSelect = document.querySelector(langSelection);
      if (!startBtnEl || !outputHolder || !langSelection) {
        if (!startBtnEl) {
          console.error("incomplete html format missing start button");
        } else if (!outputHolder) {
          console.error("incomplete html format missing output holder");
        } else {
          console.error("incomplete html format missing language select");
        }
        alert("Button or Required field not available,check document once!");
        window.open("https://github.com/DarpanAdhikari/speech-into-text?tab=readme-ov-file#getting-started","_blank");
        return;
      }
    
      let sr = window.webkitSpeechRecognition || window.SpeechRecognition;
    
      if (!sr) {
        alert("Speech Recognition API is not supported in this browser.");
        return;
      }
    
      let spRec = new sr();
      spRec.continuous = true;
      spRec.interimResults = true;
    
      const languagePlaceholders = {
        "ne-NP": "बोल्न सुरु गर्नु होस्...",
        "hi-IN": "बोलना शुरू करें...",
        "zh-CN": "开始说话...",
        "fr-FR": "Commencez à parler...",
        "de-DE": "Fangen Sie an zu sprechen...",
        "ja-JP": "話し始めてください...",
        "ko-KR": "말을 시작하세요...",
        "pt-PT": "Comece a falar...",
        "es-ES": "Comienza a hablar...",
        "ru-RU": "Начните говорить...",
        "en-US": "Start speaking...",
        "ar-SA": "ابدأ التحدث...",
        "it-IT": "Inizia a parlare...",
        "tr-TR": "Konuşmaya başlayın...",
        "pl-PL": "Zacznij mówić...",
        "nl-NL": "Begin met praten...",
        "sv-SE": "Börja prata...",
        "da-DK": "Begynd at tale...",
        "cs-CZ": "Začněte mluvit...",
        "fi-FI": "Aloita puhuminen...",
        "el-GR": "Άρχισε να μιλάς...",
        "th-TH": "เริ่มพูด...",
        "hu-HU": "Kezdj el beszélni...",
        "ro-RO": "Începeți să vorbiți...",
        "sk-SK": "Začnite hovoriť...",
        "hr-HR": "Počnite govoriti...",
        "bg-BG": "Започнете да говорите...",
        "sr-RS": "Počnite da govorite...",
        "vi-VN": "Bắt đầu nói...",
        "ms-MY": "Mulakan bercakap...",
        "id-ID": "Mulai berbicara...",
        "ta-IN": "பேசத் தொடங்குங்கள்...",
        "ml-IN": "പറയാൻ ആരംഭിക്കൂ...",
    };
    
    const languages = [
      { code: "en-US", name: "English (United States)" },
      { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
      { code: "bg-BG", name: "Bulgarian (Bulgaria)" },
      { code: "zh-CN", name: "Chinese (China)" },
      { code: "hr-HR", name: "Croatian (Croatia)" },
      { code: "cs-CZ", name: "Czech (Czech Republic)" },
      { code: "da-DK", name: "Danish (Denmark)" },
      { code: "nl-NL", name: "Dutch (Netherlands)" },
      { code: "en-GB", name: "English (United Kingdom)" },
      { code: "fi-FI", name: "Finnish (Finland)" },
      { code: "fr-FR", name: "French (France)" },
      { code: "de-DE", name: "German (Germany)" },
      { code: "el-GR", name: "Greek (Greece)" },
      { code: "hi-IN", name: "Hindi (India)" },
      { code: "ta-IN", name: "Tamil (India)" },
      { code: "ml-IN", name: "Malayalam (India)" },
      { code: "hu-HU", name: "Hungarian (Hungary)" },
      { code: "id-ID", name: "Indonesian (Indonesia)" },
      { code: "it-IT", name: "Italian (Italy)" },
      { code: "ja-JP", name: "Japanese (Japan)" },
      { code: "ko-KR", name: "Korean (Korea)" },
      { code: "ms-MY", name: "Malay (Malaysia)" },
      { code: "ne-NP", name: "Nepali (Nepal)" },
      { code: "pl-PL", name: "Polish (Poland)" },
      { code: "pt-PT", name: "Portuguese (Portugal)" },
      { code: "ro-RO", name: "Romanian (Romania)" },
      { code: "ru-RU", name: "Russian (Russia)" },
      { code: "sr-RS", name: "Serbian (Serbia)" },
      { code: "sk-SK", name: "Slovak (Slovakia)" },
      { code: "es-ES", name: "Spanish (Spain)" },
      { code: "sv-SE", name: "Swedish (Sweden)" },
      { code: "th-TH", name: "Thai (Thailand)" },
      { code: "tr-TR", name: "Turkish (Turkey)" },
      { code: "vi-VN", name: "Vietnamese (Vietnam)" },
  ];    
    let selectedLanguage = null;
    const LangExists = languages.some(
      (language) => language.code === langSelection
    );
    if (langSelect && langSelect.tagName === "SELECT") {
      langSelect.innerHTML = "";
      languages.forEach((lang) => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = lang.name;
        langSelect.appendChild(option);
      });
      const langStored = sessionStorage.getItem("language");
      const langOptions = langSelect.querySelectorAll("option");
      if (langSelect && langSelect !== "" && langOptions.length > 0) {
        langSelect.querySelectorAll("option").forEach((opt) => {
          if (opt.value == langStored) {
            opt.selected = true;
          }
        });
      }
      selectedLanguage = langSelect.value;
      langSelect.addEventListener("change", () => {
        spRec.stop();
        selectedLanguage = langSelect.value;
        spRec.lang = langSelect.value;
        outputHolder.setAttribute(
          "placeholder",
          languagePlaceholders[selectedLanguage] || "Start speaking..."
        );
      });
    }else if(LangExists){
      selectedLanguage = langSelection;
    }else{
      alert("Unsupportive language");
      window.open("https://github.com/DarpanAdhikari/speech-into-text?tab=readme-ov-file#supported-languages","_blank");
      return;
    }
    
    spRec.lang = selectedLanguage;
    
      outputHolder.setAttribute(
        "placeholder",
        languagePlaceholders[selectedLanguage] || "Start speaking..."
      );
    
      let isSpeaking = false;
      let firstAction = true;
      let previousData = "";
      startBtnEl.addEventListener("click", () => {
        if (!isSpeaking) {
          spRec.start();
          isSpeaking = true;
          let outVal = '';
          if (
            outputHolder.tagName === "INPUT" ||
            outputHolder.tagName === "TEXTAREA"
          ) {
            outVal = outputHolder.value.trim();
          }else{
            outVal = outputHolder.innerHTML.trim();
          }
          if(firstAction && outVal !== ''){
            previousData = outVal;
            firstAction = false;
          }
          outputHolder.setAttribute(
            "placeholder",
            languagePlaceholders[selectedLanguage] || "Start speaking..."
          );
        } else {
          spRec.stop();
          isSpeaking = false;
        }
      });
      let text = '';
      spRec.onresult = (res) => {
        text = Array.from(res.results)
          .map((r) => r[0])
          .map((txt) => txt.transcript)
          .join("");
    
        if (
          outputHolder.tagName === "INPUT" ||
          outputHolder.tagName === "TEXTAREA"
        ) {
          if (!previousData.endsWith(text.trim())) {
            outputHolder.value = previousData + " " + text;
          }
        } else {
          if (!previousData.endsWith(text.trim())) {
            outputHolder.innerHTML = previousData + " " + text;
          }
        }
      };
    
      spRec.onspeechend = () => {
        isSpeaking = false;
        indicatorEl?.classList.remove('listening');
        if (!previousData.endsWith(text.trim())) {
          previousData = '';
          if (
            outputHolder.tagName === "INPUT" ||
            outputHolder.tagName === "TEXTAREA"
          ){
            previousData = outputHolder.value.trim();
          }else{
            previousData = outputHolder.innerHTML.trim();
          }
        }
      };
      spRec.onspeechstart = () => {
        indicatorEl?.classList.add('listening');
    };
      outputHolder.addEventListener('blur', (e) => {
        if (
          outputHolder.tagName === "INPUT" ||
          outputHolder.tagName === "TEXTAREA"
        ) {
          previousData = outputHolder.value.trim();
        } else {
          previousData = outputHolder.innerHTML.trim();
        }
      });
      spRec.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };
      stopBtnEl?.addEventListener("click",()=>{
        if(isSpeaking){
          spRec.stop();
          isSpeaking = false;
        }
      })
      clearBtnEl?.addEventListener("click", () => {
        if (
          outputHolder.tagName === "INPUT" ||
          outputHolder.tagName === "TEXTAREA"
        ) {
          outputHolder.value = "";
        } else {
          outputHolder.innerHTML = "";
        }
        previousData = "";
      });
    
      copyBtnEl?.addEventListener("click", () => {
        let buttonText = copyBtnEl.innerHTML.trim();
        let outVal = '';
        if (
          outputHolder.tagName === "INPUT" ||
          outputHolder.tagName === "TEXTAREA"
        ){
          outVal = outputHolder.value.trim();
        }else{
          outVal = outputHolder.innerHTML.trim();
        }
        if (outVal !== "") {
          navigator.clipboard.writeText(outVal);
          copyBtnEl.textContent = "Copied!";
          setTimeout(() => {
            copyBtnEl.textContent = buttonText;
          }, 2000);
        }
      });
      window.addEventListener("beforeunload", (event) => {
        sessionStorage.setItem("language", langSelect.value);
      });
}
