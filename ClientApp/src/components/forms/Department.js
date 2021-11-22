import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {    Modal,
            ModalBody,
            ModalFooter,
            ModalHeader } from "reactstrap";

// Exportar departamento para renderizar en la App
export const Department = () => {

    // URL del servicio
    const baseUrl = "https://localhost:5001/department";

    // useState para guardar los datos en cada formulario
    const [data, setData] = useState([]);

    // useStates para controlar las ventanas modales
    const[modalCreate, setModalCreate] = useState(false);
    // const[modalRead, setModalRead] = useState(false);
    const[modalUpdate, setModalUpdate] = useState(false);

    // En caso posible
    // const[modalDelete, setModalDelete] = useState(false);


    // Plantilla modelo de nuestros formularios
    const [selectedDepartment, setSelectedDepartment] = useState({
        codigo:"",
        nombre:"",
    });

    // Metodo que genera los cambios en las casillas luego de confirmar cambios
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedDepartment({
            ...selectedDepartment,
            [name]: value,
        });
    };

    // Modales que manejaran abrir - cerrar formularios
    const openCloseCreate = () => {
        setModalCreate(!modalCreate);
    };

    // const openCloseRead = () => {
    //     setModalRead(!modalRead);
    // };

    const openCloseUpdate = () => {
        setModalUpdate(!modalUpdate);
    };

    // const openCloseDelete = () => {
    //     setModalDelete(!modalDelete);
    // };

    // Enlistar
    const getRequest = async () => {
        await axios.get(baseUrl)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    // Crear
    const postRequest = async () => {
        await axios.post(baseUrl, selectedDepartment)
        .then((response) => {
            setData(data.concat(response.data));
            openCloseCreate();
        })
        .catch((error) => {
            console.log(error);
        });
    };

    // Actualizar
    const putRequest = async () => {
        await axios.put(baseUrl + "/" +selectedDepartment.id, selectedDepartment)
        .then((response) => {
            var respuesta = response.data;
            var dataNew = data;
            dataNew.map((department) => {
                if(department.id === selectedDepartment.id){
                    department.nombre = respuesta.nombre;
                    department.codigo = respuesta.codigo;
                }
            });
            openCloseUpdate();
        })
        .catch((error) =>{
            console.log(error);
        });
    };

    // useState para controlar el Update
    const toSelectDepartment = (department) => {
        setSelectedDepartment(department);
        openCloseUpdate();
    };

    // Carga la BD
    useEffect(() => {
        getRequest();
    }, []);

    return(
        // Creamos maqueta del Table
        <div className="Department">
            <div className="row">
                <div className="col-md-7">
                    <h1>Departamentos</h1>
                </div>
                <div className="col-md-5">
                    <button type="button" onClick={()=>openCloseCreate()} className="btn btn-primary">
                        <FontAwesomeIcon icon={faPlus} size="lg" />
                    </button>
                </div>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {/* Mostramos los datos en nuestra BD (GET) */}
                <tbody>
                    {data.map((department) => (
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.codigo}</td>
                            <td>{department.nombre}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => toSelectDepartment(department)}>
                                    <FontAwesomeIcon icon={faPenSquare} size="lg" />
                                </button>{" "}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Creamos modal que se abrira cuando presionemos el boton + (crear) */}
            <Modal isOpen={modalCreate}>
                <ModalHeader>Agregar Departamentos</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Código: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="codigo"
                        onChange={handleChange} />
                        <br />
                        <label>Nombre: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="nombre"
                        onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={() => postRequest()}>
                        Insertar
                    </button>
                    <button className="btn btn-danger" onClick={() => openCloseCreate()}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
            {/* Creamos modal que se abrira cuando presionemos el boton ✏️ (editar) */}
            <Modal isOpen={modalUpdate}>
                <ModalHeader>Editar Departamentos</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="id"
                        readOnly
                        value={selectedDepartment && selectedDepartment.id} />
                        <label>Código: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="codigo"
                        onChange={handleChange}
                        value={selectedDepartment && selectedDepartment.codigo}  />
                        <br />
                        <label>Nombre: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="nombre"
                        onChange={handleChange}
                        value={selectedDepartment && selectedDepartment.nombre} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => putRequest()}>
                        Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => openCloseUpdate()}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    )
} 