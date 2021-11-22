import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPenSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import {    Modal,
            ModalBody,
            ModalFooter,
            ModalHeader } from "reactstrap";

// Libreria para mascara de campo
import Cleave from "cleave.js/react";

// Exportar departamento para renderizar en la App
export const User = () => {

    // URL del servicio
    const baseUrl = "https://localhost:5001/user";

    // useState para guardar los datos en cada formulario
    const [data, setData] = useState([]);

    // guardar datos de departamentos
    const [deps, setDeps] = useState([]);

    // useStates para controlar las ventanas modales
    const[modalCreate, setModalCreate] = useState(false);
    const[modalRead, setModalRead] = useState(false);
    const[modalUpdate, setModalUpdate] = useState(false);

    // En caso posible
    // const[modalDelete, setModalDelete] = useState(false);


    // Plantilla modelo de nuestros formularios
    const [selectedUser, setSelectedUser] = useState({
        nombres:"",
        apellidos:"",
        cedula:"",
        fechaNacimiento:"",
        departamento:null,
        departamentoId:0,
        cargo:"",
        supervisorInmediato:"",
    });

    // Metodo que genera los cambios en las casillas luego de confirmar cambios
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({
            ...selectedUser,
            [name]: value,
        });
    };

    // Modales que manejaran abrir - cerrar formularios
    const openCloseCreate = () => {
        setModalCreate(!modalCreate);
    };

    const openCloseRead = () => {
        setModalRead(!modalRead);
    };

    const openCloseUpdate = () => {
        setModalUpdate(!modalUpdate);
    };

    // const openCloseDelete = () => {
    //     setModalDelete(!modalDelete);
    // };

    // Recorrer departamentos para (Select/Dropdownlist)
    const getRequestDep = async () => {
        await axios.get("https://localhost:5001/department")
        .then((response) => {
            setDeps(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

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
        // Convertimos string a int para buscar entre los departamentos el que aparece en usuario
        selectedUser.departamentoId = parseInt(selectedUser.departamentoId);

        await axios.post(baseUrl, selectedUser)
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
        
        // Eliminamos el que pone la BD automaticamente para acceder con el que aparece en el User Form
        // Ayuda a que podamos mostrar el departamento correctamente por cada usuario
        delete selectedUser.departamento;
        selectedUser.departamentoId = parseInt(selectedUser.departamentoId);

        await axios.put(baseUrl + "/" +selectedUser.id, selectedUser)
        .then((response) => {
            var respuesta = response.data;
            var dataNew = data;
            dataNew.map((user) => {
                if(user.id === selectedUser.id){
                    user.nombres = respuesta.nombres;
                    user.apellidos = respuesta.apellidos;
                    user.cedula = respuesta.cedula;
                    user.fechaNacimiento = respuesta.fechaNacimiento;
                    user.departamentoId = respuesta.departamentoId;
                    user.cargo = respuesta.cargo;
                    user.supervisorInmediato = respuesta.supervisorInmediato;
                }
            });
            openCloseUpdate();
        })
        .catch((error) =>{
            console.log(error);
        });
    };

    // useState para controlar el Update
    const toSelectUser = (user) => {
        setSelectedUser(user);
        openCloseUpdate();
    };

    // Informacion detallada de los departamentos de Usuarios
    const toSelectInfo = (user) => {
        user.departamentoId = deps.filter(dep => (dep.id == parseInt(user.departamentoId)))[0].nombre;
        setSelectedUser(user);
        openCloseRead();
    }

    // Carga la BD
    useEffect(() => {
        getRequest();
    }, []);

    // Carga Departamentos
    useEffect(() => {
        getRequestDep();
    }, []);

    return(
        // Creamos maqueta del Table
        <div className="User">
            <div className="row">
                <div className="col-md-7">
                    <h1>Usuarios</h1>
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
                        <th>Cédula</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Cargo</th>
                        <th>Supervisor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {/* Mostramos los datos en nuestra BD (GET) */}
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.cedula}</td>
                            <td>{user.nombres}</td>
                            <td>{user.apellidos}</td>
                            <td>{user.fechaNacimiento}</td>
                            <td>{user.cargo}</td>
                            <td>{user.supervisorInmediato}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => toSelectUser(user)}>
                                    <FontAwesomeIcon icon={faPenSquare} size="lg" />
                                </button>{" "}
                                <button className="btn btn-info" onClick={() => toSelectInfo(user)}>
                                    <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                                </button>{" "}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Creamos modal que se abrira cuando presionemos el boton + (crear) */}
            <Modal isOpen={modalCreate}>
                <ModalHeader>Agregar Usuarios</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Cédula: </label>
                        <br />
                        <Cleave
                        placeholder="___-_______-_"
                        name="cedula"
                        options={{
                            numericOnly: true,
                            delimiter: "-",
                            blocks: [3, 7, 1],
                        }}
                        onChange={handleChange}
                        className="form-control" />
                        <br />
                        <label>Nombres: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="nombres"
                        onChange={handleChange} />
                        <br />
                        <label>Apellidos: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="apellidos"
                        onChange={handleChange} />
                        <br />
                        <label>Fecha de Nacimiento: </label>
                        <br />
                        <input placeholder="AAAA-MM-DD"
                        className="form-control"
                        name="fechaNacimiento"
                        options={{
                            numericOnly: true,
                            delimiter: "-", // 402-
                            blocks: [4, 2, 2],
                          }}
                        onChange={handleChange} />
                        <br />
                        <label>Departamento: </label>
                        <br />
                        <select className="form-control"
                        name="departamentoId"
                        onChange={handleChange} >
                            <option value="" />
                            {deps.map((dep) => (
                                <option key={dep.id} value={dep.id} >
                                    {dep.nombre}{" "}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label>Cargo: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="cargo"
                        onChange={handleChange} />
                        <br />
                        <label>Supervisor: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="supervisorInmediato"
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
                <ModalHeader>Editar Usuarios</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                    <label>ID: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="id"
                        readOnly
                        value={selectedUser && selectedUser.id} />
                        <br />
                    <label>Cédula: </label>
                        <br />
                        <Cleave
                        placeholder="___-_______-_"
                        name="cedula"
                        value={selectedUser && selectedUser.cedula}
                        options={{
                            numericOnly: true,
                            delimiter: "-",
                            blocks: [3, 7, 1],
                        }}
                        onChange={handleChange}
                        className="form-control" />
                        <br />
                        <label>Nombres: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="nombres"
                        onChange={handleChange}
                        value={selectedUser && selectedUser.nombres} />
                        <br />
                        <label>Apellidos: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="apellidos"
                        onChange={handleChange}
                        value={selectedUser && selectedUser.apellidos} />
                        <br />
                        <label>Fecha de Nacimiento: </label>
                        <br />
                        <input placeholder="AAAA-MM-DD"
                        className="form-control"
                        name="fechaNacimiento"
                        value={selectedUser && selectedUser.fechaNacimiento}
                        options={{
                            numericOnly: true,
                            delimiter: "-",
                            blocks: [4, 2, 2],
                          }}
                        onChange={handleChange} />
                        <br />
                        <label>Departamento: </label>
                        <br />
                        <select className="form-control"
                        name="departamentoId"
                        onChange={handleChange} >
                            <option value="" />
                            {deps.map((dep) => (
                                <option key={dep.id} value={dep.id} >
                                    {dep.nombre}{" "}
                                </option>
                            ))}
                        </select>
                        <br />
                        <label>Cargo: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="cargo"
                        onChange={handleChange}
                        value={selectedUser && selectedUser.cargo} />
                        <br />
                        <label>Supervisor: </label>
                        <br />
                        <input type="text"
                        className="form-control"
                        name="supervisorInmediato"
                        onChange={handleChange}
                        value={selectedUser && selectedUser.supervisorInmediato} />
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
            <Modal isOpen={modalRead}>
        <ModalHeader>Detalle Usuarios</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="id"
              value={selectedUser && selectedUser.id}
              readOnly
            />
            <br />
            <label>DNI: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="cedula"
              value={selectedUser && selectedUser.cedula}
              readOnly
            />
            <br />
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombres"
              value={selectedUser && selectedUser.nombres}
              readOnly
            />
            <br />
            <label>Apellidos: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="apellidos"
              value={selectedUser && selectedUser.apellidos}
              readOnly
            />
            <br />
            <label>Fecha de Nacimiento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="fechaNacimiento"
              value={selectedUser && selectedUser.fechaNacimiento}
              readOnly
            />
            <br />
            <label>Departamento: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="departamentoId"
              value={selectedUser && selectedUser.departamentoId }
              readOnly
            ></input>
            <br />
            <label>Cargo: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="cargo"
              value={selectedUser && selectedUser.cargo}
              readOnly
            />
            <br />
            <label>Supervisor: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="supervisorInmediato"
              value={selectedUser && selectedUser.supervisorInmediato}
              readOnly
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-danger"
            onClick={() => openCloseRead()} >
            Salir
          </button>
        </ModalFooter>
      </Modal>
        </div>
    )
} 