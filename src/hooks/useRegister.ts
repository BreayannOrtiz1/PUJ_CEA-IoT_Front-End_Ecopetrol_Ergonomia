// src/hooks/useRegister.ts
import { useState } from "react";
import { registrarGateway, registrarLugar, Gateway, Lugar } from "../services/registerService";

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

  const registrar_lugar = async (lugar: Lugar) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarLugar(lugar);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { registrar_gateway, registrar_lugar, loading, error, resultado };
}
