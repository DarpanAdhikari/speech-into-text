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
      if(firstAction && outputHolder.value.trim() !== ''){
        previousData = outputHolder.value.trim();
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
        outputHolder.innerText = previousData + " " + text;
      }
    }
  };

  spRec.onspeechend = () => {
    isSpeaking = false;
    if (!previousData.endsWith(text.trim())) {
      previousData = '';
      previousData = outputHolder.value.trim();
    }
  };
  outputHolder.addEventListener('blur', (e) => {
    if (
      outputHolder.tagName === "INPUT" ||
      outputHolder.tagName === "TEXTAREA"
    ) {
      previousData = outputHolder.value.trim();
    } else {
      previousData = outputHolder.innerText.trim();
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
      outputHolder.innerText = "";
    }
    previousData = "";
  });

  copyBtnEl?.addEventListener("click", () => {
    let buttonText = copyBtnEl.innerText.trim();
    if (outputHolder.value.trim() !== "") {
      navigator.clipboard.writeText(outputHolder.value);
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
