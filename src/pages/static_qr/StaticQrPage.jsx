import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { QR } from "../../constant/QRCode";
import axios from "axios";
import VietQR from "../../constant/VietQR.jpg";
import napas247 from "../../constant/napas247.jpg";
import kebhana from "../../constant/kebhana.jpg";
import { Server } from "../../constant/Server";

export const StaticQrPage = () => {
  const [isActive, setIsActive] = useState(true);
  const [type, setType] = useState("Card Number");
  const [qrCode, setQrCode] = useState("");

  const handleToggleButton = () => {
    setIsActive(!isActive);
    isActive ? setType("Account Number") : setType("Card Number");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = {};

        if (type === "Card Number") {
          data = {
            ...data,
            binCode: QR.CardNumber,
          };
        }
        if (type === "Account Number") {
          data = {
            ...data,
            accountNumber: QR.AccountNumber,
          };
        }
        const res = await axios({
          method: "put",
          url: `http://localhost:${Server.PORT}/qr/generate`,
          headers: {},
          data: {
            header: {
              bankCd: QR.BankCd,
              brCd: QR.BrCd,
            },
            data: data,
          },
        });
        if (res) {
          setQrCode(res.data);
        }
      } catch (error) {
        alert("Failed to fetch data " + error.message);
      }
    };
    fetchData();
  }, [type]);

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
          <div className="qr__form__header static">
            <img src={VietQR} alt="VietQR logo" />
          </div>
          <QRCode value={qrCode} size={QR.QRSize} />
          <div className="qr__form__footer">
            <img className="napas" src={napas247} alt="Napas logo" />
            <img className="kebhana" src={kebhana} alt="han logo" />
          </div>
          <div className="qr__scan">
            <div>Beneficiary Name : {QR.CardHolder}</div>
            {type === "Account Number" && (
              <div>Account Number : {QR.AccountNumber}</div>
            )}
            {type === "Card Number" && <div>Card Number : {QR.CardNumber}</div>}
            <div>Beneficiary Bank : {QR.BeneficialBank}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
