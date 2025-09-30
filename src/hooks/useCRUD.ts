// src/hooks/useRegister.ts
import { useState } from "react";
import { registrarGateway, actualizarGateway, eliminarGateway, Gateway, 
         registrarLugar, actualizarLugar, eliminarLugar, Lugar,
         registrarNodoIoT, actualizarNodoIoT, eliminarNodoIoT, NodoIoT,
         registrarSensor, actualizarSensor, eliminarSensor, Sensor,
         registrarTrabajador, actualizarTrabajador, eliminarTrabajador, Trabajador,
         registrarProvision_Fisiologicas, actualizarProvision_Fisiologicas, eliminarProvision_Fisiologicas, Provision_Fisiologicas,
         registrarRangoEdad, actualizarRangoEdad, eliminarRangoEdad, RangoEdad,
         getIDs, IDs} from "../services/CRUDService";

export function useCRUD() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultado, setResultado] = useState<any>(null);

  const get_ids = async (ids: IDs) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getIDs(ids);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
    
  }

  const registrar_rangoedad = async (rangoedad: RangoEdad) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarRangoEdad(rangoedad);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const actualizar_rangoedad = async (rangoedad: RangoEdad) => {
    setLoading(true);
    setError(null);
    try {
      const res = await actualizarRangoEdad(rangoedad);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminar_rangoedad = async (rangoedad: RangoEdad) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eliminarRangoEdad(rangoedad);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
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
  const actualizar_lugar = async (lugar: Lugar) => {
    setLoading(true);
    setError(null);
    try {
      const res = await actualizarLugar(lugar);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const eliminar_lugar = async (lugar: Lugar) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eliminarLugar(lugar);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const registrar_nodoiot = async (nodoIoT: NodoIoT) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarNodoIoT(nodoIoT);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizar_nodoiot = async (nodoIoT: NodoIoT) => {
    setLoading(true);
    setError(null);
    try {
      const res = await actualizarNodoIoT(nodoIoT);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminar_nodoiot = async (nodoIoT: NodoIoT) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eliminarNodoIoT(nodoIoT);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registrar_sensor = async (sensor: Sensor) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarSensor(sensor);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizar_sensor = async (sensor: Sensor) => {
    setLoading(true);
    setError(null);
    try {
      const res = await actualizarSensor(sensor);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminar_sensor = async (sensor: Sensor) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eliminarSensor(sensor);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registrar_trabajador = async (trabajador: Trabajador) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarTrabajador(trabajador);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizar_trabajador = async (trabajador: Trabajador) => {
    setLoading(true);
    setError(null);
    try {
      const res = await actualizarTrabajador(trabajador);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminar_trabajador = async (trabajador: Trabajador) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eliminarTrabajador(trabajador);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registrar_Provision_Fisiologicas = async (Provision_Fisiologicas: Provision_Fisiologicas) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registrarProvision_Fisiologicas(Provision_Fisiologicas);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizar_Provision_Fisiologicas = async (Provision_Fisiologicas: Provision_Fisiologicas) => {
    setLoading(true);
    setError(null);
    try {
      const res = await actualizarProvision_Fisiologicas(Provision_Fisiologicas);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminar_Provision_Fisiologicas = async (Provision_Fisiologicas: Provision_Fisiologicas) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eliminarProvision_Fisiologicas(Provision_Fisiologicas);
      setResultado(res);
      return res;
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    registrar_lugar, actualizar_lugar, eliminar_lugar,
    registrar_gateway, actualizar_gateway, eliminar_gateway,
    registrar_nodoiot, actualizar_nodoiot, eliminar_nodoiot,
    registrar_sensor, actualizar_sensor, eliminar_sensor,
    registrar_trabajador, actualizar_trabajador, eliminar_trabajador,
    registrar_rangoedad, actualizar_rangoedad, eliminar_rangoedad,
    registrar_Provision_Fisiologicas, actualizar_Provision_Fisiologicas, eliminar_Provision_Fisiologicas, get_ids,
    loading, error, resultado 
  };
}
