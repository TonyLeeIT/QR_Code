import React, { useState, useRef } from "react";
import axios from "axios";
import "./qrform.scss";
import * as yup from "yup";
import { useFormik } from "formik";
import { FormFeedback } from "reactstrap";
import Select from "react-select";
import { QR } from "../../../constant/QRCode";
import NumberFormat from "react-number-format";
import { Server } from "../../../constant/Server";

const validationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("You must specify a number")
    .min(50000, "Amount required minimum is 50 000 VND")
    .max(500000000, "Amount required maximum is 500 000 000 VND")
    .required("Please enter the required field"),
  contentTransfer: yup
    .string()
    .required("Please enter the required field")
    .max(50, "You can't exceed 50 characters")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

const optionField = [
  { value: QR.CardNumber, label: QR.CardNumber, type: "Card Number" },
  { value: QR.AccountNumber, label: QR.AccountNumber, type: "Account Number" },
];

export const QRForm = (props) => {
  const { type, qrCodeCallback, inputValue } = props;
  const [selectValue, setSelectValue] = useState();
  const formRef = useRef();
  const selectRef = useRef();

  let optionType = [];
  for (const option of optionField) {
    if (type === "Card Number" && option.type === type) {
      optionType.push(option);
    }
    if (type === "Account Number" && option.type === type) {
      optionType.push(option);
    }
  }

  const formik = useFormik({
    initialValues: {
      amount: 0,
      contentTransfer: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      const fetchData = async () => {
        try {
          let data = {
            amount: value.amount,
            contentTransfer: value.contentTransfer,
          };
          if (type === "Card Number") {
            data = {
              ...data,
              binCode: inputValue,
            };
          }
          if (type === "Account Number") {
            data = {
              ...data,
              accountNumber: inputValue,
            };
          }

          const res = await axios({
            method: "put",
            url: `http://${Server.HOST}:${Server.PORT}/qr/generate`,
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
            console.log(res.data);
            const data = {
              data: res.data,
              amount: value.amount,
              contentTransfer: value.contentTransfer,
              isHidden: false,
            };
            qrCodeCallback(data);
          }
        } catch (error) {
          alert("Failed to fetch data " + error.message);
        }
      };
      fetchData();

      // formRef.current.reset();
      selectRef.current.clearValue();
    },
  });

  const { handleSubmit, handleChange, handleBlur, touched, errors } = formik;

  return (
    <form ref={formRef} className="input__group" onSubmit={handleSubmit}>
      {/* <Select
        ref={selectRef}
        styles={{
          control: (provided, state) => ({
            ...provided,
            fontFamily: "Roboto",
            fontSize: "0.9rem",
            boxShadow: "none",
            borderLeft: "0",
            borderTop: "0",
            borderRight: "0",
            borderBottom: "1px solid #999",
            background: "transparent",
            border: state.isFocused && "none",
          }),
          menu: (provided, state) => ({
            ...provided,
            fontFamily: "Roboto",
            fontSize: "0.9rem",
            border: "none",
            boxShadow: "var(--box-shadow)",
          }),
          option: (provided, state) => ({
            ...provided,
            fontFamily: "Roboto",
            fontSize: "0.9rem",
            backgroundColor: state.isFocused && "var(--main-color)",
            color: state.isFocused && "white",
          }),
        }}
        options={optionType}
        onChange={setSelectValue}
        isSearchable
        placeholder={type || "Card Number"}
      /> */}

      <div className="wrapper">
        <input
          type="text"
          className={errors.amount ? "input__field error" : "input__field"}
          name="amount"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          invalid={touched.amount && errors.amount}
        />
      </div>

      <div className="wrapper">
        <NumberFormat
          className={errors.amount ? "input__field error" : "input__field"}
          name="amount"
          placeholder="Amount Required Transfer"
          onChange={handleChange}
          onBlur={handleBlur}
          invalid={touched.amount && errors.amount}
          thousandSeparator={" "}
        />
        {errors.amount ? (
          <div className="required">!</div>
        ) : (
          <div className="measure">VND</div>
        )}
      </div>
      <FormFeedback className="feedback">{errors.amount}</FormFeedback>

      <div className="wrapper">
        <input
          type="text"
          className={
            errors.contentTransfer ? "input__field error" : "input__field"
          }
          name="contentTransfer"
          placeholder="Content Transfer"
          onChange={handleChange}
          onBlur={handleBlur}
          invalid={touched.contentTransfer && errors.contentTransfer}
        />
        {errors.contentTransfer && <div className="required">!</div>}
      </div>
      <FormFeedback className="feedback">{errors.contentTransfer}</FormFeedback>

      <button
        type="submit"
        className={
          errors.amount || errors.contentTransfer
            ? "submit__btn error"
            : "submit__btn"
        }
      >
        Generate QR
      </button>
    </form>
  );
};
