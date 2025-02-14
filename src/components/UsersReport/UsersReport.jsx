import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./UsersReport.css";

Chart.register(...registerables);

const UserReport = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/api/usuario").then((response) => {
      setUsuarios(response.data);
    });
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    return (
      usuario.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      (filtroFecha === "" || new Date(usuario.fechaRegistro).toISOString().split('T')[0] === filtroFecha)
    );
  });

  const activos = usuariosFiltrados.filter((u) => u.activo).length;
  const inactivos = usuariosFiltrados.length - activos;

  const data = {
    labels: ["Activos", "Inactivos"],
    datasets: [
      {
        label: "Usuarios",
        data: [activos, inactivos],
        backgroundColor: ["#36a2eb", "#ff6384"],
      },
    ],
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Informe Usuarios", 90, 10);
    
    const chartCanvas = document.querySelector("canvas");
    const chartImage = chartCanvas.toDataURL("image/png");
  
    // Obtener las dimensiones del canvas
    const width = chartCanvas.width;
    const height = chartCanvas.height;
  
    // Añadir la imagen manteniendo la relación de aspecto
    pdf.addImage(chartImage, "PNG", 10, 20, 190, 190 * (height / width));
  
    pdf.autoTable({
      head: [["Nombre", "Correo", "Fecha de Registro", "Estado"]],
      body: usuariosFiltrados.map((usuario) => [
        usuario.nombre,
        usuario.correo,
        new Date(usuario.fechaRegistro).toLocaleDateString(),
        usuario.activo ? "Activo" : "Inactivo",
      ]),
      startY: 120,
    });
  
    pdf.save("reporte_usuarios.pdf");
  };
  

  return (
    <div className="report-content">
      <h2 className="report-title">Reporte de Usuarios</h2>
      <div className="report-filters">
        <input 
          type="text" 
          placeholder="Filtrar por nombre" 
          value={filtroNombre} 
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="report-input-text"
        />
        <input 
          type="date" 
          value={filtroFecha} 
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="report-input-date"
        />
      </div>
      <div id="report">
        <Bar data={data} />
        <table border="1" className="report-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Fecha de Registro</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>{new Date(usuario.fechaRegistro).toLocaleDateString()}</td>
                <td>{usuario.activo ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="active-count">
          <h4>Usuarios Activos: {activos}</h4>
        </div>
      </div>
      <button onClick={exportToPDF} className="report-export">EXPORTAR A PDF</button>
    </div>
  );
};

export default UserReport;
