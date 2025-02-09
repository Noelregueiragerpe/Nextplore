import React from 'react'; 
import { render, screen, fireEvent,  } from "@testing-library/react";
import {vi, it, expect, describe, } from "vitest"; 
import { MemoryRouter,useNavigate } from "react-router-dom"; 
import Login from "../login/login"; 

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate, 
  };
});

describe("Login Component", () => {
  it("debe llamar a Navigate tras darle al boton", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });

    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});