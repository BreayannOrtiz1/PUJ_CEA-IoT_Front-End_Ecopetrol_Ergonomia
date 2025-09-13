// src/hooks/useRegister.ts
import { useState } from "react";
import { registrarGateway, actualizarGateway, eliminarGateway, Gateway } from "../services/registerService";

export function useGateway() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<any>(null);

  const registrar_gateway = async (gateway: Gateway) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarGateway(gateway);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizar_gateway = async (gateway: Gateway) => {
    setLoading(true);
    setError(null);
    try {
      const res = await actualizarGateway(gateway);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminar_gateway = async (gateway: Gateway) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eliminarGateway(gateway);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { registrar_gateway, actualizar_gateway, eliminar_gateway, loading, error, resultado };
}
