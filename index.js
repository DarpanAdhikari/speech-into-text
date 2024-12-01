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

  if (!startBtnEl || !outputHolder || !langSelect) {
    if (!startBtnEl) {
      console.error("incomplete html format missing start button");
    } else if (!outputHolder) {
      console.error("incomplete html format missing output holder");
    } else {
      console.error("incomplete html format missing language select");
    }
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
    { code: "ne-NP", name: "Nepali (Nepal)" },
    { code: "en-GB", name: "English (United Kingdom)" },
    { code: "es-ES", name: "Spanish (Spain)" },
    { code: "fr-FR", name: "French (France)" },
    { code: "de-DE", name: "German (Germany)" },
    { code: "hi-IN", name: "Hindi (India)" },
    { code: "ja-JP", name: "Japanese (Japan)" },
    { code: "ko-KR", name: "Korean (Korea)" },
    { code: "zh-CN", name: "Chinese (China)" },
    { code: "pt-PT", name: "Portuguese (Portugal)" },
    { code: "ru-RU", name: "Russian (Russia)" },
    { code: "ar-SA", name: "Arabic (Saudi Arabia)" },
    { code: "it-IT", name: "Italian (Italy)" },
    { code: "tr-TR", name: "Turkish (Turkey)" },
    { code: "pl-PL", name: "Polish (Poland)" },
    { code: "nl-NL", name: "Dutch (Netherlands)" },
    { code: "sv-SE", name: "Swedish (Sweden)" },
    { code: "da-DK", name: "Danish (Denmark)" },
    { code: "cs-CZ", name: "Czech (Czech Republic)" },
    { code: "fi-FI", name: "Finnish (Finland)" },
    { code: "el-GR", name: "Greek (Greece)" },
    { code: "th-TH", name: "Thai (Thailand)" },
    { code: "hu-HU", name: "Hungarian (Hungary)" },
    { code: "ro-RO", name: "Romanian (Romania)" },
    { code: "sk-SK", name: "Slovak (Slovakia)" },
    { code: "hr-HR", name: "Croatian (Croatia)" },
    { code: "bg-BG", name: "Bulgarian (Bulgaria)" },
    { code: "sr-RS", name: "Serbian (Serbia)" },
    { code: "vi-VN", name: "Vietnamese (Vietnam)" },
    { code: "ms-MY", name: "Malay (Malaysia)" },
    { code: "id-ID", name: "Indonesian (Indonesia)" },
    { code: "ta-IN", name: "Tamil (India)" },
    { code: "ml-IN", name: "Malayalam (India)" },
];

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

  spRec.lang = langSelect.value;
  outputHolder.setAttribute(
    "placeholder",
    languagePlaceholders[langSelect.value] || "Start speaking..."
  );

  langSelect.addEventListener("change", () => {
    spRec.stop();
    spRec.lang = langSelect.value;
    outputHolder.setAttribute(
      "placeholder",
      languagePlaceholders[langSelect.value] || "Start speaking..."
    );
  });

  let btnStyle = `#${startBtn},#${clearBtn},#${copyBtn} {
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  #${startBtn}:hover,#${clearBtn}:hover,#${copyBtn}:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  #${startBtn}:active,#${clearBtn}:active,#${copyBtn}:active {
        transform: translateY(1px);
      }`;
  const css = document.createElement("style");
  css.innerHTML = btnStyle;
  document.head.appendChild(css);
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
        languagePlaceholders[langSelect.value] || "Start speaking..."
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
    document.querySelector('.indicator')?.classList.remove('listening');
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
    document.querySelector('.indicator')?.classList.add('listening');
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
