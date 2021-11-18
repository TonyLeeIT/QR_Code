import React from "react";
import "./table.scss";
import { Pagination } from "./Pagination";

export const Table = (props) => {
  return (
    <div>
      <div className="table-wrapper">
        <table>
          {props.headData && props.renderHead ? (
            <thead>
              <tr>
                {props.headData.map((item, index) =>
                  props.renderHead(item, index)
                )}
              </tr>
            </thead>
          ) : null}
          {props.bodyData && props.renderBody ? (
            <tbody>
              {props.bodyData.map((item, index) =>
                props.renderBody(item, index)
              )}
            </tbody>
          ) : null}
        </table>
      </div>

      <div className="table__pagination">
        <Pagination page={props.page} />
      </div>
    </div>
  );
};
