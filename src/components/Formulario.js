import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./style.css";

function Formulario() {
  const [nombre, setnombre] = useState("");
  const [edad, setedad] = useState("");
  const [nombreList, setnombreList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/list").then((response) => {
      setnombreList(response.data);
    });
  }, []);

  const submitregis = () => {
    Axios.post("http://localhost:3001/api/save", {
      nombre: nombre,
      edad: edad,
    });

    setnombreList([...nombreList, { nombre: nombre, edad: edad }]);
  };

  const deleteRegis = (nombre) => {
    Axios.delete(`http://localhost:3001/api/delete/${nombre}`);
  };

  return (
    <div className="bodycomponent">
      <div className="formcl">
        <form>
          <h1 style={{ textAlign: "center", color: "white" }}>Registros</h1>
          <div class="form-group ">
            <label for="nombre">Nombre</label>
            <input
              type="text"
              class="form-control "
              id="nombre"
              aria-describedby="nombre"
              onChange={(e) => {
                setnombre(e.target.value);
              }}
            ></input>
          </div>
          <div class="form-group ">
            <label for="edad" class=" ">
              Edad
            </label>
            <input
              type="text"
              class="form-control "
              id="edad"
              aria-describedby="edad"
              onChange={(e) => {
                setedad(e.target.value);
              }}
            ></input>

            <button
              type="submit"
              class="btn btn-primary m-3"
              onClick={submitregis}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="list">
        <h1 style={{ textAlign: "center", color: "whitesmoke" }}>
          Listar Registros
        </h1>

        {nombreList.map((val) => {
          return (
            <div class="card m-3 col-md-6 ">
              <div class="card-header bg-primary ">
                {" "}
                <p>Registro : {val.id}</p>
              </div>
              <div class="card-body">
                <h5 class="card-title">
                  {" "}
                  <p>Nombre : {val.nombre}</p>
                </h5>
                <p class="card-text">
                  {" "}
                  <p>Edad: {val.edad}</p>
                </p>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    deleteRegis(val.nombre);
                  }}
                >
                  Borrar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Formulario;
