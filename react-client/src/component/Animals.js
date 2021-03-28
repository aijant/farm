import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { loadAnimals } from "../store/animals/animalsActions";
import "./Animals.css";

const DataTableCrudDemo = () => {
  // const [animals, setAnimals] = useState([]);
  const animalsService = useSelector((store) => store.animals.data);
  console.log(animalsService);
  //  setAnimals(animalsService)
  const dispatch = useDispatch();
  const result = animalsService.map((item) => {
    let t = item.status.reduce((t, c) => (t += `/${c.name}`), 0);
    item.status = t;
    return item;
  });
  const columns = [
    { field: "id", header: "ID" },
    { field: "name", header: "Name" },
    { field: "date", header: "Date" },
    { field: "age", header: "Age" },
    { field: "price", header: "Price" },
     { field: "status", header: "Status" },
  ];

  useEffect(() => {
    dispatch(loadAnimals());
  }, []);

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        sortable={true}
        filter={true}
      />
    );
  });

  return (
    <div>
      <div className="card">
        <DataTable value={result}>{dynamicColumns}</DataTable>
      </div>
    </div>
  );
};

export default connect(null, { DataTableCrudDemo })(DataTableCrudDemo);
