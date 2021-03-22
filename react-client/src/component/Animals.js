import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AnimalsService from "../store/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./Animals.css";

const DataTableCrudDemo = () => {
  let emptyAnimals = {
    id: null,
    name: "",
    image: null,
    description: "",
    category: null,
    price: 0,
    inventoryStatus: "INSTOCK",
  };

  const [animals, setAnimals] = useState(null);
  const [animalDialog, setAnimalDialog] = useState(false);
  const [deleteAnimalDialog, setDeleteAnimalDialog] = useState(false);
  const [deleteAnimalsDialog, setDeleteAnimalsDialog] = useState(false);
  const [animal, setAnimal] = useState(emptyAnimals);
  const [selectedAnimals, setSelectedAnimals] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const animalsService = new AnimalsService();

  useEffect(() => {
    animalsService.getProducts().then((data) => setAnimals(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const openNew = () => {
    setAnimal(emptyAnimals);
    setSubmitted(false);
    setAnimalDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setAnimalDialog(false);
  };

  const hideDeleteAnimalDialog = () => {
    setDeleteAnimalDialog(false);
  };

  const hideDeleteAnimalsDialog = () => {
    setDeleteAnimalsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (animal.name.trim()) {
      let _animals = [...animals];
      let _animal = { ...animal };
      if (_animal.id) {
        const index = findIndexById(_animal.id);

        _animals[index] = animal;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Animal Updated",
          life: 3000,
        });
      } else {
        _animal.id = createId();
        _animal.image = "product-placeholder.svg";
        _animals.push(animal);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Animal Created",
          life: 3000,
        });
      }

      setAnimals(_animals);
      setAnimalDialog(false);
      setAnimal(emptyAnimals);
    }
  };
  const editAnimal = (animal) => {
    setAnimal({ ...animal });
    setAnimalDialog(true);
  };

  const confirmDeleteProduct = (animal) => {
    setAnimal(animal);
    setDeleteAnimalDialog(true);
  };

  const deleteProduct = () => {
    let _animals = animals.filter((val) => val.id !== animal.id);
    setAnimal(_animals);
    setDeleteAnimalDialog(false);
    setAnimal(emptyAnimals);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Animal Deleted",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < animals.length; i++) {
      if (animals[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteAnimalsDialog(true);
  };

  const deleteSelectedAnimals = () => {
    let currAnimals = animals.filter((val) => !selectedAnimals.includes(val));
    setAnimals(currAnimals);
    setDeleteAnimalsDialog(false);
    setSelectedAnimals(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Animals Deleted",
      life: 3000,
    });
  };

  const onCategoryChange = (e) => {
    let _animal = { ...animal };
    _animal["category"] = e.value;
    setAnimal(_animal);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _animal = { ...animal };
    _animal[`${name}`] = val;

    setAnimal(_animal);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _animal = { ...animal };
    _animal[`${name}`] = val;

    setAnimal(_animal);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedAnimals || !selectedAnimals.length}
        />
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="p-mr-2 p-d-inline-block"
        />
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`showcase/demo/images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  };

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editAnimal(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Animals</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const animalDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteAnimalDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAnimalDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const deleteAnimalsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAnimalsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedAnimals}
      />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="p-mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={animals}
          selection={selectedAnimals}
          onSelectionChange={(e) => setSelectedAnimals(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="code" header="Code" sortable></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column
            field="price"
            header="Price"
            body={priceBodyTemplate}
            sortable
          ></Column>
          <Column field="category" header="Category" sortable></Column>
          <Column
            field="inventoryStatus"
            header="Status"
            body={statusBodyTemplate}
            sortable
          ></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <Dialog
        visible={animalDialog}
        style={{ width: "450px" }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={animalDialogFooter}
        onHide={hideDialog}
      >
        {animal.image && (
          <img
            src={`showcase/demo/images/product/${animal.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={animal.image}
            className="product-image"
          />
        )}
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={animal.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !animal.name })}
          />
          {submitted && !animal.name && (
            <small className="p-error">Name is required.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={animal.description}
            onChange={(e) => onInputChange(e, "description")}
            required
            rows={3}
            cols={20}
          />
        </div>

        <div className="p-field">
          <label className="p-mb-3">Category</label>
          <div className="p-formgrid p-grid">
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                inputId="category1"
                name="category"
                value="Accessories"
                onChange={onCategoryChange}
                checked={animal.category === "Accessories"}
              />
              <label htmlFor="category1">Accessories</label>
            </div>
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                inputId="category2"
                name="category"
                value="Clothing"
                onChange={onCategoryChange}
                checked={animal.category === "Clothing"}
              />
              <label htmlFor="category2">Clothing</label>
            </div>
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                inputId="category3"
                name="category"
                value="Electronics"
                onChange={onCategoryChange}
                checked={animal.category === "Electronics"}
              />
              <label htmlFor="category3">Electronics</label>
            </div>
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                inputId="category4"
                name="category"
                value="Fitness"
                onChange={onCategoryChange}
                checked={animal.category === "Fitness"}
              />
              <label htmlFor="category4">Fitness</label>
            </div>
          </div>
        </div>

        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="price">Price</label>
            <InputNumber
              id="price"
              value={animal.price}
              onValueChange={(e) => onInputNumberChange(e, "price")}
              mode="currency"
              currency="USD"
              locale="en-US"
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={deleteAnimalDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteAnimalDialogFooter}
        onHide={hideDeleteAnimalDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {animal && (
            <span>
              Are you sure you want to delete <b>{animal.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={deleteAnimalsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteAnimalsDialogFooter}
        onHide={hideDeleteAnimalsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle p-mr-3"
            style={{ fontSize: "2rem" }}
          />
          {animal && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
export default DataTableCrudDemo;
