import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Test Practico</h1>
        <p>Debes desarrollar un formulario en el frontend para “Agregar Usuarios”.
          <br/><b>Consumir APIs desde ReactJS de los siguiente modelos con sus respectivas propiedades:</b>
          <br/><li>Usuarios: [Nombres, Apellidos, Género, Cédula, Fecha de nacimiento, Departamento(DropDownList), Cargo, Supervisor inmediato]</li>
          <li>Departamentos: [Nombre, Código].</li></p>
        <ul>
          <li>El campo de texto -Cédula- debe tener una máscara sencilla para la cédula Dominicana (###-#######-#).</li>
          <li>El campo de DropDown o Select -Departamentos- debe tener su propio modelo por igual y cargar las opciones en el DropDownlist dentro del formulario “Agregar Usuarios” desde la base de datos con los departamentos ya existentes.</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p><b>NOTA: Esta prueba vence a las 11pm, debes hacer pull request de lo logrado hasta ese momento.</b></p>
      </div>
    );
  }
}
