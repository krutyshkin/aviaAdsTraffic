
(function() {
    const validCodes = ['NVo2MS1VQ1RP', 'OTdLNy1VNlBW', 'NkNVNi1WQk5D', 'TjM2NC1BQ0pJ', 'TjlKVi1HV05P', 'QVVSTC1FVU9J', 'VVpUWC1UREZD', 'NTJROS1FVU5G', 'UEFLMC1RWlNP', 'Q0VXNS1QMDFF', 'Q1kxVy1ZTkQw', 'UkVETi1UUlFI', 'ME1LUi1PMUxN', 'OVJGMS1aVTNY', 'VEU4UC1BUEpZ'];
    const now = Date.now();
    const saved = JSON.parse(localStorage.getItem("aviacode_cloud") || "null");

    if (saved && validCodes.includes(saved.code) && now < saved.expires) {
        console.log("✅ Код активен, загружаем UI...");
        start();
        return;
    }

    const code = prompt("🔐 Введите код доступа:");
    if (!validCodes.includes(btoa(code))) {
        alert("❌ Неверный код");
        return;
    }

    const expires = now + 30 * 24 * 60 * 60 * 1000;
    localStorage.setItem("aviacode_cloud", JSON.stringify({ code: btoa(code), expires }));
    console.log("✅ Код принят, активировано на 30 дней");
    start();

    function start() {
        
(function() {
// ==UserScript==
// @name         Aviamasters UI Enhancer Clean (with UI)
// @namespace    http://tampermonkey.net/
// @version      1.19
// @description  Настройки для Aviamasters — ставка, валюта, язык + красивый UI, формат без округлений и дробей, с анимациями и поддержкой KWD, BHD, OMR, BTC. Исправлено: убрано X из множителя
// @match        *://demo.bgaming-network.com/games/Aviamasters/*
// @grant        none
// ==/UserScript==

(() => {
  let baseBet = parseFloat(localStorage.getItem('baseBet')) || 100000;
  let currency = localStorage.getItem('currency') || 'IRT';
  window.currentLang = localStorage.getItem('currentLang') || 'en';

  const currencies = ['RUB', 'USD', 'VND', 'IRT', 'ARS', 'EUR', 'IDR', 'MDL', 'KWD', 'BHD', 'OMR', 'BTC'];
  const languages = {
    en: { BALANCE: 'BALANCE', TOTAL_BET: 'TOTAL BET', MULTIPLIER: 'MULTIPLIER', ALTITUDE: 'ALTITUDE', DISTANCE: 'DISTANCE' },
    ru: { BALANCE: 'БАЛАНС', TOTAL_BET: 'СТАВКА', MULTIPLIER: 'МНОЖИТЕЛЬ', ALTITUDE: 'ВЫСОТА', DISTANCE: 'ДИСТАНЦИЯ' },
    es: { BALANCE: 'SALDO', TOTAL_BET: 'APUESTA', MULTIPLIER: 'MULTIPLICADOR', ALTITUDE: 'ALTURA', DISTANCE: 'DISTANCIA' }
  };

  const style = document.createElement('style');
  style.textContent = `
    canvas + div span {
      font-size: 13px !important;
      max-width: 90px !important;
      word-break: break-word !important;
      white-space: normal !important;
      line-height: 1.1;
    }
    
    #custom-settings-btn {
      position: fixed; 
      top: 50%; 
      right: 60px; 
      transform: translateY(-50%); 
      z-index: 9999;
      padding: 20px 35px; 
      font-size: 22px; 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      border-radius: 18px; 
      border: 3px solid rgba(255,255,255,0.2); 
      background: linear-gradient(145deg, #667eea 0%, #764ba2 100%);
      color: #fff; 
      font-weight: 700; 
      cursor: pointer;
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4), 
                  inset 0 2px 0 rgba(255,255,255,0.3),
                  inset 0 -2px 0 rgba(0,0,0,0.2);
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
      letter-spacing: 0.5px;
    }
    
    #custom-settings-btn:hover {
      background: linear-gradient(145deg, #5a67d8 0%, #6b46c1 100%);
      border-color: rgba(255,255,255,0.4);
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.6), 
                  inset 0 2px 0 rgba(255,255,255,0.4),
                  inset 0 -2px 0 rgba(0,0,0,0.3);
    }
    
    #custom-settings-btn:active {
      background: linear-gradient(145deg, #4c51bf 0%, #553c9a 100%);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3), 
                  inset 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      z-index: 9998;
      backdrop-filter: blur(5px);
    }
    
    .settings-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      padding: 35px;
      border-radius: 20px;
      z-index: 10000;
      color: white;
      text-align: center;
      box-shadow: 0 25px 50px rgba(0,0,0,0.7),
                  0 0 0 1px rgba(255,255,255,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.2);
      min-width: 380px;
      max-width: 450px;
      border: 2px solid rgba(255,255,255,0.1);
    }
    
    .settings-modal h2 {
      margin: 0 0 15px;
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: none;
      letter-spacing: 1px;
    }
    
    .settings-modal .by-borov {
      font-size: 14px;
      color: #a0a0a0;
      margin-bottom: 25px;
      font-style: italic;
      opacity: 0.8;
    }
    
    .settings-section {
      margin: 25px 0;
      padding: 20px;
      background: rgba(255,255,255,0.05);
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    
    .settings-section label {
      display: block;
      font-size: 16px;
      font-weight: 600;
      color: #e0e0e0;
      margin-bottom: 10px;
      text-align: left;
      letter-spacing: 0.5px;
    }
    
    .settings-modal input, .settings-modal select {
      padding: 15px 20px;
      margin-top: 8px;
      width: 100%;
      border-radius: 12px;
      border: 2px solid rgba(255,255,255,0.2);
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      background: rgba(30,30,46,0.8);
      color: white;
      box-sizing: border-box;
      outline: none;
    }
    
    .settings-modal input:focus, .settings-modal select:focus {
      border-color: #667eea;
      background: rgba(30,30,46,0.95);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    }
    
    .flag-select {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 10px;
    }
    
    .flag-select img {
      width: 40px; 
      height: 28px; 
      cursor: pointer; 
      border-radius: 8px;
      border: 3px solid rgba(255,255,255,0.2);
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    }
    
    .flag-select img:hover {
      border-color: rgba(102, 126, 234, 0.8);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }
    
    .flag-select img.active {
      border-color: #00d4aa;
      box-shadow: 0 8px 25px rgba(0, 212, 170, 0.6);
    }
    
    .button-group {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;
    }
    
    .settings-modal button {
      padding: 15px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 700;
      font-size: 16px;
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3),
                  inset 0 1px 0 rgba(255,255,255,0.2);
      letter-spacing: 0.5px;
      min-width: 120px;
    }
    
    .settings-modal button:hover {
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
      box-shadow: 0 12px 30px rgba(102, 126, 234, 0.5),
                  inset 0 1px 0 rgba(255,255,255,0.3);
    }
    
    .settings-modal button:active {
      background: linear-gradient(135deg, #4c51bf 0%, #553c9a 100%);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2),
                  inset 0 2px 5px rgba(0,0,0,0.2);
    }
    
    .settings-modal button.close-btn {
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      box-shadow: 0 8px 20px rgba(231, 76, 60, 0.3),
                  inset 0 1px 0 rgba(255,255,255,0.2);
    }
    
    .settings-modal button.close-btn:hover {
      background: linear-gradient(135deg, #d63031 0%, #a94442 100%);
      box-shadow: 0 12px 30px rgba(231, 76, 60, 0.5),
                  inset 0 1px 0 rgba(255,255,255,0.3);
    }
    
    .settings-modal select option {
      background: #1a1a2e;
      color: white;
      padding: 10px;
    }
    
    .settings-modal button.close-btn:active {
      background: linear-gradient(135deg, #c0392b 0%, #922b21 100%);
      box-shadow: 0 5px 15px rgba(231, 76, 60, 0.2),
                  inset 0 2px 5px rgba(0,0,0,0.2);
    }
  `;
  document.head.appendChild(style);

  const originalFillText = CanvasRenderingContext2D.prototype.fillText;
  CanvasRenderingContext2D.prototype.fillText = function (text, x, y, ...args) {
    try {
      if (typeof text === 'string') {
        // Исключаем математические операторы кнопок от обработки
        const isSpecialSymbol = /^[+×/÷-]\s?\d{1,3}$/i.test(text.trim());
        if (isSpecialSymbol) {
          return originalFillText.call(this, text, x, y, ...args);
        }

        // Проверяем позицию для множителя (обычно справа внизу)
        const isMultiplierArea = x > 500 && y > 400; // Примерная область множителя

        // Убираем символ умножения в области множителя
        if (isMultiplierArea && (text.trim() === 'x' || text.trim() === 'X' || text.trim() === '×')) {
          return; // Не показываем символ умножения в области множителя
        }

        // Убираем символ умножения перед числами везде
        if (/^[x×X]\d+(\.\d+)?$/i.test(text.trim())) {
          text = text.replace(/^[x×X]/i, '');
        }

        // Также убираем одиночные символы умножения, если они не в игровых элементах
        if ((text.trim() === 'x' || text.trim() === 'X' || text.trim() === '×') && y > 300) {
          return;
        }

        
    const fallbackLang = languages[window.currentLang] ? window.currentLang : 'en';
    for (const [key, val] of Object.entries(languages.en)) {
        const translation = languages[fallbackLang][key];
    
          const translation = languages[window.currentLang][key];
          const regex = new RegExp(val, 'gi');
          text = text.replace(regex, translation);
        }

        const raw = text.replace(/[^0-9.]/g, '');
        const num = parseFloat(raw);
        if (!isNaN(num)) {
          const currentBaseBet = parseFloat(localStorage.getItem('baseBet')) || 100000;
          const multiplier = num / 1000;
          const value = currentBaseBet * multiplier;
          const formatted = value.toLocaleString('de-DE', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
          text = text.replace(/([\d.,]+)/, formatted);
        }

        text = text.replace(/FUN/g, currency);

        let maxWidth = 260;
        while (this.measureText(text).width > maxWidth) {
          const currentSize = parseInt(this.font.match(/\d+/)[0]);
          if (currentSize <= 10) break;
          this.font = this.font.replace(/\d+px/, `${currentSize - 1}px`);
        }
      }
      return originalFillText.call(this, text, x, y, ...args);
    } catch (e) {
      return originalFillText.call(this, text, x, y, ...args);
    }
  };

  const createSettingsButton = () => {
    const btn = document.createElement('button');
    btn.id = 'custom-settings-btn';
    btn.textContent = '⚙ Настройки';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      // Создаем задний фон
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop';
      document.body.appendChild(backdrop);

      const modal = document.createElement('div');
      modal.className = 'settings-modal';
      modal.innerHTML = `
        <h2>⚙ Настройки</h2>
        <div class="by-borov">by borov • Elite Edition</div>
        
        <div class="settings-section">
          <label>💰 Валюта</label>
          <select id="currency-input">${currencies.map(c => `<option value="${c}" ${currency === c ? 'selected' : ''}>${c}</option>`)}</select>
        </div>
        
        <div class="settings-section">
          <label>🎯 Базовая ставка</label>
          <input id="bet-input" type="number" step="0.01" value="${baseBet}" placeholder="Введите сумму ставки" />
        </div>
        
        <div class="settings-section">
          <label>🌍 Язык интерфейса</label>
          <div class="flag-select">
            <img src="https://flagcdn.com/us.svg" data-lang="en" title="English">
            <img src="https://flagcdn.com/ru.svg" data-lang="ru" title="Русский">
            <img src="https://flagcdn.com/es.svg" data-lang="es" title="Español">
          </div>
        </div>
        
        <div class="button-group">
          <button id="apply-settings">✅ Применить</button>
          <button id="close-settings" class="close-btn">❌ Закрыть</button>
        </div>
      `;
      document.body.appendChild(modal);

      // Устанавливаем активный флаг
      modal.querySelectorAll('.flag-select img').forEach(img => {
        if (img.getAttribute('data-lang') === window.currentLang) {
          img.classList.add('active');
        }
      });

      // Закрытие по клику на задний фон
      backdrop.onclick = () => {
        modal.remove();
        backdrop.remove();
      };

      document.getElementById('apply-settings').onclick = () => {
        const newCurrency = document.getElementById('currency-input').value;
        const newBet = parseFloat(document.getElementById('bet-input').value);
        if (!isNaN(newBet)) localStorage.setItem('baseBet', newBet);
        localStorage.setItem('currency', newCurrency);
        localStorage.setItem('currentLang', window.currentLang);
        modal.remove();
        backdrop.remove();
        location.reload();
      };

      document.getElementById('close-settings').onclick = () => {
        modal.remove();
        backdrop.remove();
      };

      modal.querySelectorAll('.flag-select img').forEach(img => {
        img.onclick = () => {
          window.currentLang = img.getAttribute('data-lang');
          modal.querySelectorAll('.flag-select img').forEach(i => i.classList.remove('active'));
          img.classList.add('active');
        };
      });
    });
  };

  window.addEventListener('load', () => {
    if (!document.getElementById('custom-settings-btn')) {
      createSettingsButton();
    }
  });
})();
})();

    }
})();
