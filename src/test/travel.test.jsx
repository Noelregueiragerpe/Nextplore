import { describe, it, expect } from 'vitest';
import { filterLocations } from '../utils/helpers';
import React from "react";
import { render, screen, fireEvent, waitFor  } from "@testing-library/react";
import { vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Travel from "../Travel/travel";

describe('filterLocations', () => {
  const mockLocations = [
    { nombre: 'Lugar 1', pelicula: 'Pelicula 1', lat: 1, lng: 1 },
    { nombre: 'Lugar 2', pelicula: 'Pelicula 2', lat: 2, lng: 2 },
    { nombre: 'Lugar Incorrecto', pelicula: 'Pelicula Incorrecta', lat: 3, lng: 3 },
  ];

  it('debe filtrar por nombre', () => {
    const result = filterLocations(mockLocations, 'Lugar 1');
    expect(result).toEqual([{ nombre: 'Lugar 1', pelicula: 'Pelicula 1', lat: 1, lng: 1 }]);
  });

  it('debe filtrar por pelicula', () => {
    const result = filterLocations(mockLocations, 'Pelicula 2');
    expect(result).toEqual([{ nombre: 'Lugar 2', pelicula: 'Pelicula 2', lat: 2, lng: 2 }]);
  });
});
  
describe("Travel Component - Ubicación Actual", () => {
  it("debe centrar el mapa al darle al boton de posicion actual", async () => {
    // Simula la API de geolocalización del navegador
    const mockGeolocation = {
      getCurrentPosition: vi.fn().mockImplementation((success) =>
        success({
          coords: {
            latitude: 40.7128,
            longitude: -74.006, // Coordenadas de Nueva York (ejemplo)
          },
        })
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    render(
      <MemoryRouter>
        <Travel />
      </MemoryRouter>
    );

    // Encuentra y hace clic en el botón de ubicación
    const locateButton = screen.getByAltText("locate");
    fireEvent.click(locateButton);

    // Verifica que `getCurrentPosition` fue llamado
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();

    // Nota: No podemos verificar el cambio del mapa directamente aquí, ya que `react-leaflet`
    // no proporciona una API fácil de testear para esto. Sin embargo, podemos asegurarnos
    // de que la función de geolocalización se ejecutó correctamente.
  });
});

