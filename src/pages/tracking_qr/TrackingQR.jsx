import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import queryString from "query-string";
import { Table } from "../../components/table/Table";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { PaginationAction } from "../../redux/actions/PaginationAction";
import "./trackinglog.scss";

const customerTableHead = [
  "Id",
  "Bank Code",
  "Brand Code",
  "QR String",
  "Service Code",
  "Error Code",
  "Create Date",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => {
  return (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.bankCd}</td>
      <td>{item.brCd}</td>
      <td>{item.qrString}</td>
      <td>{item.serviceCode}</td>
      <td>{item.errCd}</td>
      <td>{item.createdDt}</td>
    </tr>
  );
};
export const TrackingQR = () => {
  const paginationReducer = useSelector((state) => state.PaginationReducer);
  const [data, setData] = useState([]);
  const [page, setPage] = useState({});
  const [startDate, setStartDate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramString = queryString.stringify({
          searchKeyWord: paginationReducer.searchKeyWord,
        });

        const response = await axios({
          method: "put",
          url: `http://localhost:8080/qr/tracking-qr?${paramString}`,
          headers: {},
          data: {
            page: paginationReducer.page,
            size: paginationReducer.size,
          },
        });
        const responseJson = await response.data.content;

        const { size, totalPages, number } = await response.data;

        setPage({
          ...page,
          size,
          totalPages,
          number,
        });
        setData(responseJson);
      } catch (error) {
        alert("Failed to fetch data ", error.message);
      }
    };
    fetchData();
  }, [paginationReducer]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (startDate && startDate.value) {
      let parts = startDate.value.toString().split(" ");
      let months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      const result = parts[3] + "-" + months[parts[1]] + "-" + parts[2];
      dispatch(PaginationAction.searhPage(result));
      dispatch(PaginationAction.getPage(0));
    } else {
      dispatch(PaginationAction.searhPage(""));
      dispatch(PaginationAction.getPage(0));
    }
  };

  return (
    <div>
      <div className="page__header__wrapper">
        <h2 className="page__header">tracking QR code</h2>
        <form className="page__header__search__date" onSubmit={handleSearch}>
          <DatePickerComponent
            style={{ fontSize: "1rem" }}
            placeholder="Choose a date"
            onChange={setStartDate}
            format="yyyy-MM-dd"
            cssClass="e-custom-style"
          />
        </form>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={data}
                renderBody={(item, index) => renderBody(item, index)}
                page={page}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
