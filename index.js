export async function speechToText(
    outPut,
    clearBtn,
    startBtn,
    copyBtn,
    langSelection
  ) {
    const outputHolder = document.getElementById(outPut),
      startBtnEl = document.getElementById(startBtn),
      clearBtnEl = document.getElementById(clearBtn),
      copyBtnEl = document.getElementById(copyBtn),
      langSelect = document.getElementById(langSelection);

      if(!startBtnEl || !outputHolder || !langSelect){
        if(!startBtnEl){
            console.error("incomplete html format missing start button");
        }else if(!outputHolder){
            console.error("incomplete html format missing output holder");
        }else{
            console.error("incomplete html format missing language select");
        }
        return;
      }
  
    let sr = window.webkitSpeechRecognition || window.SpeechRecognition;
  
    if (!sr) {
      alert('Speech Recognition API is not supported in this browser.');
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
    };
  
    const languages = [
      { code: "en-US", name: "English (United States)" },
      { code: "ne-NP", name: "Nepali" },
      { code: "en-GB", name: "English (United Kingdom)" },
      { code: "es-ES", name: "Spanish (Spain)" },
      { code: "fr-FR", name: "French (France)" },
      { code: "de-DE", name: "German (Germany)" },
      { code: "hi-IN", name: "Hindi (India)" },
      { code: "ja-JP", name: "Japanese" },
      { code: "ko-KR", name: "Korean" },
      { code: "zh-CN", name: "Chinese (Mandarin)" },
      { code: "pt-PT", name: "Portuguese (Portugal)" },
      { code: "ru-RU", name: "Russian" },
    ];
  
    langSelect.innerHTML = "";
    languages.forEach((lang) => {
      const option = document.createElement("option");
      option.value = lang.code;
      option.textContent = lang.name;
      langSelect.appendChild(option);
    });
  
    spRec.lang = langSelect.value;
    outputHolder.setAttribute("placeholder", languagePlaceholders[langSelect.value] || "Start speaking...");
  
    langSelect.addEventListener("change", () => {
      spRec.stop();
      spRec.lang = langSelect.value;
      outputHolder.setAttribute("placeholder", languagePlaceholders[langSelect.value] || "Start speaking...");
    });
  
    let isSpeaking = false;

    // -------style element is created
    let btnStyle = `#${startBtn} {
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      #${startBtn}:hover {
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
        transform: translateY(-2px);
      }
      
      #${startBtn}:active {
        transform: translateY(1px);
      }`;
      const css = document.createElement("style");
      css.innerHTML = btnStyle; 
      document.head.appendChild(css);
    startBtnEl.addEventListener("click", () => {
      if (!isSpeaking) {
        spRec.start();
        isSpeaking = true;
        outputHolder.setAttribute("placeholder", languagePlaceholders[langSelect.value] || "Start speaking...");
      }else{
        spRec.stop();
        isSpeaking = false;
      }
    });
  
    spRec.onresult = (event) => {
        let text = Array.from(event.results)
          .map((r) => r[0])
          .map((txt) => txt.transcript)
          .join("");
    
        if (outputHolder.tagName === "INPUT" || outputHolder.tagName === "TEXTAREA") {
          outputHolder.value = text;
        } else {
          outputHolder.innerText = text;
        }
      };
  
    spRec.onspeechend = () => {
      isSpeaking = false;
    };
  
    spRec.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    if(clearBtnEl){
        clearBtnEl.onclick = () => {
            outputHolder.value = "";
          };
    }
  
    if(copyBtnEl){
        copyBtnEl.onclick = () => {
            if (outputHolder.value.trim() !== "") {
              navigator.clipboard.writeText(outputHolder.value);
              copyBtnEl.textContent = "Copied!";
              copyBtnEl.classList.add("click");
              setTimeout(() => {
                copyBtnEl.classList.remove("click");
                copyBtnEl.textContent = "Copy";
              }, 3000);
            }
          };
    }
  }
  