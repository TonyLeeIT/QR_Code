import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./qrcode.scss";
import { QRForm } from "./form/QRForm";
import { QR } from "../../constant/QRCode.js";
import VietQR from "../../constant/VietQR.jpg";
import napas247 from "../../constant/napas247.jpg";
import kebhana from "../../constant/kebhana.jpg";

export const QrPage = () => {
  const [isActive, setIsActive] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [type, setType] = useState("Card Number");
  const [inputValue, setInputValue] = useState(QR.CardNumber);
  const [qrCode, setQrCode] = useState("");
  const [amount, setAmount] = useState();
  const [contentTransfer, setContentTransfer] = useState("");

  const handleToggleButton = () => {
    setIsActive(!isActive);
    isActive ? setType("Account Number") : setType("Card Number");
    if (type === "Card Number") {
      setInputValue(QR.AccountNumber);
    }
    if (type === "Account Number") {
      setInputValue(QR.CardNumber);
    }

    setIsHidden(true);
  };

  const handleGenerateQrCode = (res) => {
    if (res) {
      console.log("get data from child componnet success", res.data);
      setQrCode(res.data);
      setAmount(res.amount);
      setContentTransfer(res.contentTransfer);
      setIsHidden(res.isHidden);
    } else {
      alert("Generate QR String Failure");
    }
  };

  return (
    <div className="row">
      <div className="col-6">
        <div className="form__box">
          <div className="button__box">
            <div
              className={isActive ? "switch__toggle active" : "switch__toggle"}
            ></div>
            <button
              type="button"
              className="toggle__btn"
              onClick={handleToggleButton}
            >
              QR Account
            </button>
            <button
              type="button"
              className="toggle__btn"
              onClick={handleToggleButton}
            >
              QR Card
            </button>
          </div>
          <QRForm
            isActive={isActive}
            type={type}
            inputValue={inputValue}
            qrCodeCallback={handleGenerateQrCode}
          />
        </div>
      </div>
      {qrCode && !isHidden && (
        <div className="col-6">
          <div className="form__box">
            <div className="qr__form__header dynamic">
              <img src={VietQR} alt="VietQR logo" />
            </div>
            <QRCode value={qrCode} size={QR.QRSize} />
            <div className="qr__form__footer">
              <img className="napas" src={napas247} alt="Napas logo" />
              <img className="kebhana" src={kebhana} alt="han logo" />
            </div>
            <div className="qr__scan">
              <div>Amount : {amount}</div>
              <div>Content Transfer : {contentTransfer}</div>
              <div>Beneficiary Name : {QR.CardHolder}</div>
              {type === "Account Number" && (
                <div>Account Number : {QR.AccountNumber}</div>
              )}
              {type === "Card Number" && (
                <div>Card Number : {QR.CardNumber}</div>
              )}
              <div>Beneficiary Bank : {QR.BeneficialBank}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
