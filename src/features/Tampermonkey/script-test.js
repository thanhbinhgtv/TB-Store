// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2026-04-22
// @description  try to take over the world!
// @author       You
// @match        http://localhost:3000/tampermonkey*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function normalizeTab(rawTab) {
    const v = String(rawTab || "").trim().toLowerCase();

    if (!v) return null;

    if (v === "buyi") return "buy-tab";
    if (v === "sell") return "sell-tab";

    return null;
  }

  function selectTab(rawTab) {
    const tabId = normalizeTab(rawTab);
    if (!tabId) return false;

    const tabEl = document.getElementById(tabId);
    if (!tabEl) {
      alert("Khong tim thay tab: " + tabId);
      return false;
    }

    tabEl.click();
    return true;
  }

  // hàm mở dropdown Symbol nếu chưa mở
  function openSymbolDropdown() {
    const trigger = document.getElementById("odr-symbol");
    if (!trigger) return false;

    const panel = trigger.nextElementSibling;
    const expanded = panel && window.getComputedStyle(panel).display !== "none";
    if (!expanded) trigger.click();

    return true;
  }

  // hàm click radio trong dropdown Symbol dựa trên text hiển thị của option
  function clickSymbolRadioByText(SymbolText) {
    const text = String(SymbolText || "").trim();
    if (!text) return false;

    if (!openSymbolDropdown()) return false;

    // tìm tất cả label trong dropdown và tìm label có text chứa SymbolText
    const labels = Array.from(document.querySelectorAll("label"));
    const targetLabel = labels.find((label) =>
      (label.textContent || "").includes(text)
    );

    if (!targetLabel) {
      alert("Khong tim thay option: " + text);
      return false;
    }

    const radio = targetLabel.querySelector('input[type="radio"]');

    if (!radio) {
      alert("Khong tim thay radio trong option: " + text);
      return false;
    }

    radio.click();
    return true;
  }

  // hàm mở dropdown Payment Method nếu chưa mở
  function openPaymentMethodDropdown() {
    const trigger = document.getElementById("odr-sett-method");
    if (!trigger) return false;

    const panel = trigger.nextElementSibling;
    const expanded = panel && window.getComputedStyle(panel).display !== "none";
    if (!expanded) trigger.click();

    return true;
  }

  function normalizePaymentMethod(rawPaymentMethod) {
    const value = String(rawPaymentMethod || "").trim().toUpperCase();

    if (!value) return null;
    if (value === "GN") return "Thanh toán ngay";

    return value;
  }

  // hàm click radio trong dropdown Payment Method dựa trên text hiển thị của option
  function clickPaymentMethodByText(rawPaymentMethod) {
    const text = normalizePaymentMethod(rawPaymentMethod);
    if (!text) return false;

    if (!openPaymentMethodDropdown()) return false;

    const labels = Array.from(document.querySelectorAll("label"));
    const targetLabel = labels.find((label) =>
      (label.textContent || "").includes(text)
    );

    if (!targetLabel) {
      alert("Khong tim thay payment method: " + text);
      return false;
    }

    const radio = targetLabel.querySelector('input[type="radio"]');

    if (!radio) {
      alert("Khong tim thay radio trong payment method: " + text);
      return false;
    }

    radio.click();
    return true;
  }

  // hàm mở dropdown Contracust nếu chưa mở
  function openContracustDropdown() {
    const trigger = document.getElementById("odr-rev-party");
    if (!trigger) return false;

    const panel = trigger.nextElementSibling;
    const expanded = panel && window.getComputedStyle(panel).display !== "none";
    if (!expanded) trigger.click();

    return true;
  }

  // hàm click radio trong dropdown Contracust dựa trên value của input radio
  function clickContracustByValue(rawValue) {
    const val = String(rawValue || "").trim();
    if (!val) return false;

    if (!openContracustDropdown()) return false;

    const labels = Array.from(document.querySelectorAll("label"));
    const targetLabel = labels.find((label) => {
      const input = label.querySelector('input[type="radio"]');
      return input?.value === val;
    });

    if (!targetLabel) {
      alert("Khong tim thay contracust: " + val);
      return false;
    }

    const input = targetLabel.querySelector('input[type="radio"]');
    if (!input) {
      alert("Khong tim thay contracust radio: " + val);
      return false;
    }

    input.click();
    return true;
  }

  function setValueInput(el, value) {
    if (!el) return false;

    const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    const setter = desc && desc.set;

    el.focus();
    if (setter) setter.call(el, value);
    else el.value = value;

    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    el.blur();

    return true;
  }

  function parseKeyValueString(str) {
    try {
      return String(str)
        .split("&")
        .map((pair) => pair.split("="))
        .reduce((acc, [k, v]) => {
          if (!k) return acc;
          acc[k.trim().toLowerCase()] = v === undefined ? "" : decodeURIComponent(v.replace(/\+/g, " "));
          return acc;
        }, {});
    } catch {
      return {};
    }
  }

  function fillFromRaw(raw) {
    const cleaned = String(raw || "").replace(/\r?\n/g, "").trim();
    // Validate format: must contain =
    if (!cleaned.includes("=")) {
      alert("Định dạng không hợp lệ. Phải dùng: side=Chiều lệnh&code=Mã giaodịch&paymentmethod=Phương thức thanh toán&vol=Khối lượng &price=Giá&acctbuy=STK đăt lệnh&contracust=Thành viên đối ứng&contraacct=Số TK đối ứng");
      return;
    }

    let tab = "", SymbolText = "", odrOrderQtty = "", odrOrderPrice = "", paymentMethod = "", acctbuy = "", contracust = "", contraacct = "";

    const parsed = parseKeyValueString(cleaned);
    tab = parsed.side || "";
    SymbolText = parsed.code || "";
    paymentMethod = parsed.paymentmethod || "";
    odrOrderQtty = parsed.vol || "";
    odrOrderPrice = parsed.price || "";
    acctbuy = parsed.acctbuy || "";
    contracust = parsed.contracust || "";
    contraacct = parsed.contraacct || "";

    // Validate parsed values: must have at least side and code values
    if (!tab || !SymbolText || !paymentMethod || !odrOrderQtty || !odrOrderPrice || !acctbuy || !contracust) {
      alert("Định dạng không hợp lệ. Phải dùng: side=Chiều lệnh&code=Mã giaodịch&paymentmethod=Phương thức thanh toán&vol=Khối lượng &price=Giá&acctbuy=STK đăt lệnh&contracust=Thành viên đối ứng&contraacct=Số TK đối ứng");
      return;
    }

    const normalizedTab = String(tab || "").trim().toLowerCase();
    if (normalizedTab) selectTab(normalizedTab);

    if (SymbolText) {
      setTimeout(() => {
        clickSymbolRadioByText(SymbolText);
      }, 200);
    }

    if (paymentMethod) {
      setTimeout(() => {
        clickPaymentMethodByText(paymentMethod);
      }, 250);
    }

    if (contracust) {
      setTimeout(() => {
        clickContracustByValue(contracust);
      }, 300);
    }

    const qtty = document.getElementById("odr-order-qtty");
    const price = document.getElementById("odr-order-price");
    const acct = document.getElementById("odr-send-account");
    const revAcct = document.getElementById("odr-rev-account");

    if (!qtty || !price) {
      alert("Khong tim thay #odr-order-qtty hoặc #odr-order-price");
      return;
    }

    setValueInput(qtty, odrOrderQtty);
    setValueInput(price, odrOrderPrice);
    if (acct && acctbuy) {
      setValueInput(acct, acctbuy);
    }
    if (revAcct && contraacct) {
      setValueInput(revAcct, contraacct);
    }
  }

  function openPromptAndFill() {
    const raw = prompt("Trỏ chuột vào ô nhập liệu và quét QR", "");
    if (!raw) return;
    fillFromRaw(raw);
  }

  document.addEventListener("keydown", function (e) {
    if (e.altKey && e.key.toLowerCase() === "q") {
      e.preventDefault();
      openPromptAndFill();
    }
  });
})();