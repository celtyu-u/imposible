//React
import { useState, useEffect, useRef } from "react";

//Prime
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";

import "./TableData.css";
import {
  messageGeneral,
  messageTableData,
} from "../../models/const/messageSystem.js";

function TableData({
  arrayObjects = [],
  columns = [],
  openNewDialog,
  openEditDialog,
  openDeleteDialog,
  downloadFile,
  isMobile = 0,
  msgNew = "",
  executionManual,
}) {
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          severity="success"
          icon={messageGeneral.iconModified}
          className="p-button-rounded p-button-text"
          tooltip={messageTableData.msgToolModified}
          tooltipOptions={{ position: "bottom" }}
          onClick={() => openEditDialog(rowData)}
        />
        <Button
          severity="info"
          icon={messageGeneral.iconDeleted}
          className="p-button-rounded p-button-text"
          tooltip={messageTableData.msgToolDeleted}
          tooltipOptions={{ position: "bottom" }}
          onClick={() => openDeleteDialog(rowData)}
        />

        {/* <Tooltip
        target="#deleteButton"
        content={messageTableData.msgToolDeleted}
        // position="left"
      /> */}
        {downloadFile && (
          <Button
            severity="success"
            icon={messageGeneral.iconDownload}
            className="p-button-rounded p-button-text"
            tooltip={messageTableData.msgToolDownload}
            tooltipOptions={{ position: "bottom" }}
            onClick={() => downloadFile(rowData)}
          />
        )}
        {executionManual && (
          <Button
            severity="success"
            icon={messageGeneral.iconExecution}
            className="p-button-rounded p-button-text"
            tooltip={messageTableData.msgToolExecution}
            tooltipOptions={{ position: "bottom" }}
            onClick={() => executionManual(rowData)}
          />
        )}
      </>
    );
  };

  return (
    <div className="grid">
      <div className="col-12 flex justify-content-end">
        <div>
          
        </div>
        <Button
          severity="success"
          label={msgNew}
          icon={messageGeneral.iconNew}
          iconPos="right"
          className="button-primary"
          onClick={() => openNewDialog()}
        />
      </div>
      <div className="col-12">
        <DataTable
          value={arrayObjects}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage={messageTableData.msgEmptyMessage}
        >
          {columns.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              header={col.header}
              sortable
              body={(rowData) => (
                <>
                  {" "}
                  <b className="second-title">{col.header + ":"}</b>{" "}
                  {rowData[col.field]}
                </>
              )}
            />
          ))}

          <Column
            header={messageTableData.msgHeaderActions}
            body={actionBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default TableData;
