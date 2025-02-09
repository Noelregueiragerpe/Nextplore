import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, it, expect, describe } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/dashboard";
import place1 from "../places/place1.jpg";
import place2 from "../places/place2.jpg";
import place3 from "../places/place3.jpg";
import place4 from "../places/place4.jpg";

describe("Seleccion avatar Dashboard", () => {
  it("debe guardar el traje en localStorage al cerrar el menu", () => {
    // Limpiar localStorage antes de la prueba
    localStorage.clear();

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Abrir el modal de selección de traje
    const avatarButton = screen.getByAltText("clothes");
    fireEvent.click(avatarButton);

    // Seleccionar un traje haciendo clic en la flecha derecha
    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    // Confirmar la selección
    const selectButton = screen.getByText(/Seleccionar/i);
    fireEvent.click(selectButton);

    // Obtener el índice del traje guardado en localStorage
    const savedSuitIndex = localStorage.getItem("selectedSuitIndex");

    // Asegurar que el traje seleccionado se guardó correctamente
    expect(savedSuitIndex).not.toBeNull();
    expect(parseInt(savedSuitIndex, 10)).toBeGreaterThan(0);
  });

  describe("Carga de imágenes en recomendaciones del Dashboard", () => {
    it("debería mostrar la imagen por defecto y cambiar cuando se selecciona un lugar", () => {
      render(
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      );

      // Obtener la primera imagen con alt="Lugar recomendado"
      const images = screen.getAllByAltText("Lugar recomendado");
      const defaultImage = images[0];

      // Verificar que la imagen por defecto es la de Lugar 1
      expect(defaultImage?.getAttribute("src")).toContain(place1);

      // Seleccionar el PRIMER elemento "Lugar 2" (si hay duplicados)
      const place2Button = screen.getAllByText("Lugar 2")[0];
      fireEvent.click(place2Button);
      expect(defaultImage?.getAttribute("src")).toContain(place2);

      // Seleccionar el PRIMER elemento "Lugar 3"
      const place3Button = screen.getAllByText("Lugar 3")[0];
      fireEvent.click(place3Button);
      expect(defaultImage?.getAttribute("src")).toContain(place3);

      // Seleccionar el PRIMER elemento "Lugar 4"
      const place4Button = screen.getAllByText("Lugar 4")[0];
      fireEvent.click(place4Button);
      expect(defaultImage?.getAttribute("src")).toContain(place4);
    });
  });
});
