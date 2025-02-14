import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

Chart.register(...registerables);

const UserReport = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [activos, setActivos] = useState(0);
  const [inactivos, setInactivos] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/api/usuario").then((response) => {
      setUsuarios(response.data);
      const activosCount = response.data.filter((u) => u.activo).length;
      setActivos(activosCount);
      setInactivos(response.data.length - activosCount);
    });
  }, []);

  const exportToPDF = () => {
    const input = document.getElementById("report");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("reporte_usuarios.pdf");
    });
  };

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

  return (
    <div>
      <h2>Reporte de Usuarios</h2>
      <div id="report">
        <Bar data={data} />
        <table border="1">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Fecha de Registro</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.correo}</td>
                <td>{new Date(usuario.fechaRegistro).toLocaleDateString()}</td>
                <td>{usuario.activo ? "Activo" : "Inactivo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={exportToPDF}>Exportar a PDF</button>
    </div>
  );
};

export default UserReport;
