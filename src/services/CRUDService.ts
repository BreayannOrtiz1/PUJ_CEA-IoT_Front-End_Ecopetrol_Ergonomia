// src/services/gatewayService.ts
export interface Sensor {
  ID_Sensor?: number;
  Marca?: string;
  Modelo?: string;
  Variable?: string;
  Unidad?: string;
  ValorMaximo?: number;
  ValorMinimo?: number;
  Resolucion?: number;
  MAC?: string;
  FechaUltimaCalibracion?: string;
}

export interface Gateway {
  ID_Gateway?: number;
  marca?: string;
  referencia?: string;  // Required
  serial?: string;      // Optional
  os?: string;         // Additional frontend-only field
  ssid?: string;       // Additional frontend-only field
  macWifi?: string;    // Additional frontend-only field
  macEthernet?: string;// Additional frontend-only field
}

export interface Trabajador {
  ID_Trabajador?: number;
  Sexo?: string;       // Required
  Rango_Edad?: string; // Required
  Cargo?: string;      // Required
}

export interface NodoIoT {
  ID_NodoIoT?: number;
  MAC_Ble?: string;    // Required
  MAC_Wifi?: string;   // Required
  Tipo?: string;       // Required
  OS?: string;         // Required
  Marca?: string;      // Required
  Referencia?: string; // Required
  Propiedad?: string;  // Required
}

export interface Lugar {
  ID_Lugar?: number;
  municipio: string;  // Required
  sede: string;      // Required
  edificio: string;  // Required
  piso: string;      // Required
  area: string;      // Required
}

export interface RangoEdad {
  RangoEdad?: number;
  Minimo?: number;
  Maximo?: number;
}

export async function registrarGateway(gateway: Gateway) {
  try {
    // Validación de campos requeridos
    // Estaria de mas, ya que realizo validacion d campos en el modal
    if (!gateway.referencia) {
      throw new Error("El campo referencia es requerido");
    }
    if (!gateway.serial) {
      throw new Error("El campo serial es requerido");
    }

    // Crear el objeto de datos, omitiendo campos undefined o null
    const gatewayData = {
      referencia: gateway.referencia,
      serial: gateway.serial,
      ...(gateway.marca && { marca: gateway.marca }),
      ...(gateway.os && { os: gateway.os }),
      ...(gateway.ssid && { ssid: gateway.ssid }),
      ...(gateway.macWifi && { macWifi: gateway.macWifi }),
      ...(gateway.macEthernet && { macEthernet: gateway.macEthernet }),
    };
    console.log(gatewayData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/gateway/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(gatewayData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json(); // aquí recibes el resultado del backend
  } catch (error) {
    console.error("Error en registrarGateway:", error);
    throw error;
  }
}

export async function actualizarGateway(gateway: Gateway) {
  try {
    // Validación de campos requeridos
    if( !gateway.ID_Gateway) {
      throw new Error("El campo ID es requerido");
    }
    if (!gateway.referencia) {
      throw new Error("El campo referencia es requerido");
    }
    
    // Crear el objeto de datos, omitiendo campos undefined o null
    const gatewayData = {
      ID: gateway.ID_Gateway,
      referencia: gateway.referencia,
      ...(gateway.serial && { serial: gateway.serial }),
      ...(gateway.marca && { marca: gateway.marca }),
      ...(gateway.os && { os: gateway.os }),
      ...(gateway.ssid && { ssid: gateway.ssid }),
      ...(gateway.macWifi && { macWifi: gateway.macWifi }),
      ...(gateway.macEthernet && { macEthernet: gateway.macEthernet }),
    };
    console.log(gatewayData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/gateway/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(gatewayData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en registrarGateway:", error);
    throw error;
  }
}

export async function eliminarGateway(gateway: Gateway) {
  try {
    // Validación de campos requeridos
    if (!gateway.ID_Gateway) {
      throw new Error("El campo ID es requerido");
    }


    // Crear el objeto de datos, omitiendo campos undefined o null
    const gatewayData = {
      ID: gateway.ID_Gateway,
      referencia: gateway.referencia,
    };
    //console.log("Datos enviados para eliminar:");
    //console.log(gatewayData);
    const res = await fetch(`http://4.150.10.133:8090/api/v1/gateway/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(gatewayData),    // Enviar solo ID y referencia para eliminar de la base de datos
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json(); // aquí el resultado del backend
  } catch (error) {
    console.error("Error en registrarGateway:", error);
    throw error;
  }
}

export async function registrarLugar(lugar: Lugar) {
  try {
    // Validación de campos requeridos
    if (!lugar.municipio) {
      throw new Error("El campo municipio es requerido");
    }
    if (!lugar.sede) {
      throw new Error("El campo sede es requerido");
    }

    // Crear el objeto de datos, omitiendo campos undefined o null
    const lugarData = {
      municipio: lugar.municipio,
      sede: lugar.sede,
      ...(lugar.edificio && { edificio: lugar.edificio }),
      ...(lugar.piso && { piso: lugar.piso }),
      ...(lugar.area && { area: lugar.area })
      
    };
    console.log(lugarData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/lugar/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(lugarData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en registrarLugar:", error);
    throw error;
  }
}

export async function actualizarLugar(lugar: Lugar) {
  try {
    // Validación de campos requeridos
    if (!lugar.ID_Lugar) {
      throw new Error("El campo ID es Obligatorio");
    }
    if (!lugar.sede) {
      throw new Error("El campo sede es requerido");
    }

    // Crear el objeto de datos, omitiendo campos undefined o null
    const lugarData = {
      ID: lugar.ID_Lugar,
      municipio: lugar.municipio,
      sede: lugar.sede,
      ...(lugar.edificio && { edificio: lugar.edificio }),
      ...(lugar.piso && { piso: lugar.piso }),
      ...(lugar.area && { area: lugar.area })
      
    };
    console.log(lugarData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/lugar/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(lugarData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en actualizarLugar:", error);
    throw error;
  }
}

export async function eliminarLugar(lugar: Lugar) {
  try {
    // Validación de campos requeridos
    if (!lugar.ID_Lugar) {
      throw new Error("El campo ID es requerido");
    }

    // Crear el objeto de datos, omitiendo campos undefined o null
    const lugarData = {
      ID: lugar.ID_Lugar
    };
    console.log(lugarData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/lugar/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(lugarData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en eliminarLugar:", error);
    throw error;
  }
}

export async function registrarNodoIoT(nodoIoT: NodoIoT) {
  try {
    // Validación de campos requeridos
    if (!nodoIoT.MAC_Ble || !nodoIoT.MAC_Wifi || !nodoIoT.Tipo || !nodoIoT.OS || 
        !nodoIoT.Marca || !nodoIoT.Referencia || !nodoIoT.Propiedad) {
      throw new Error("Todos los campos son requeridos");
    }

    // Crear el objeto de datos
    const nodoIoTData = {
      MAC_Ble: nodoIoT.MAC_Ble,
      MAC_Wifi: nodoIoT.MAC_Wifi,
      Tipo: nodoIoT.Tipo,
      OS: nodoIoT.OS,
      Marca: nodoIoT.Marca,
      Referencia: nodoIoT.Referencia,
      Propiedad: nodoIoT.Propiedad
    };

    console.log(nodoIoTData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/nodoiot/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(nodoIoTData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en registrarNodoIoT:", error);
    throw error;
  }
}

export async function actualizarNodoIoT(nodoIoT: NodoIoT) {
  try {
    // Validación de campos requeridos
    if (!nodoIoT.ID_NodoIoT) {
      throw new Error("El ID del NodoIoT es requerido");
    }

    // Crear el objeto de datos
    const nodoIoTData = {
      ID: nodoIoT.ID_NodoIoT,
      ...(nodoIoT.MAC_Ble && { MAC_Ble: nodoIoT.MAC_Ble }),
      ...(nodoIoT.MAC_Wifi && { MAC_Wifi: nodoIoT.MAC_Wifi }),
      ...(nodoIoT.Tipo && { Tipo: nodoIoT.Tipo }),
      ...(nodoIoT.OS && { OS: nodoIoT.OS }),
      ...(nodoIoT.Marca && { Marca: nodoIoT.Marca }),
      ...(nodoIoT.Referencia && { Referencia: nodoIoT.Referencia }),
      ...(nodoIoT.Propiedad && { Propiedad: nodoIoT.Propiedad })
    };

    console.log(nodoIoTData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/nodoiot/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(nodoIoTData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en actualizarNodoIoT:", error);
    throw error;
  }
}

export async function eliminarNodoIoT(nodoIoT: NodoIoT) {
  try {
    // Validación de campos requeridos
    if (!nodoIoT.ID_NodoIoT) {
      throw new Error("El ID del NodoIoT es requerido");
    }

    // Crear el objeto de datos
    const nodoIoTData = {
      ID: nodoIoT.ID_NodoIoT
    };

    console.log(nodoIoTData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/nodoiot/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(nodoIoTData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en eliminarNodoIoT:", error);
    throw error;
  }
}

export async function registrarTrabajador(trabajador: Trabajador) {
  try {
    // Validación de campos requeridos
    if (!trabajador.Sexo || !trabajador.Rango_Edad || !trabajador.Cargo) {
      throw new Error("Todos los campos son requeridos");
    }

    // Crear el objeto de datos
    const trabajadorData = {
      Sexo: trabajador.Sexo,
      Rango_Edad: trabajador.Rango_Edad,
      Cargo: trabajador.Cargo
    };

    console.log(trabajadorData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/trabajador/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(trabajadorData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en registrarTrabajador:", error);
    throw error;
  }
}

export async function actualizarTrabajador(trabajador: Trabajador) {
  try {
    // Validación de campos requeridos
    if (!trabajador.ID_Trabajador) {
      throw new Error("El ID del Trabajador es requerido");
    }

    // Crear el objeto de datos
    const trabajadorData = {
      ID: trabajador.ID_Trabajador,
      ...(trabajador.Sexo && { Sexo: trabajador.Sexo }),
      ...(trabajador.Rango_Edad && { Rango_Edad: trabajador.Rango_Edad }),
      ...(trabajador.Cargo && { Cargo: trabajador.Cargo })
    };

    console.log(trabajadorData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/trabajador/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(trabajadorData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en actualizarTrabajador:", error);
    throw error;
  }
}

export async function eliminarTrabajador(trabajador: Trabajador) {
  try {
    // Validación de campos requeridos
    if (!trabajador.ID_Trabajador) {
      throw new Error("El ID del Trabajador es requerido");
    }

    // Crear el objeto de datos
    const trabajadorData = {
      ID: trabajador.ID_Trabajador
    };

    console.log(trabajadorData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/trabajador/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(trabajadorData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en eliminarTrabajador:", error);
    throw error;
  }
}

export async function registrarSensor(sensor: Sensor) {
  try {
    // Validación de campos requeridos
    if (!sensor.Marca || !sensor.Modelo || !sensor.Variable || !sensor.Unidad || 
        !sensor.ValorMaximo || !sensor.ValorMinimo || !sensor.Resolucion || 
        !sensor.MAC || !sensor.FechaUltimaCalibracion) {
      throw new Error("Todos los campos son requeridos");
    }

    // Crear el objeto de datos
    const sensorData = {
      Marca: sensor.Marca,
      Modelo: sensor.Modelo,
      Variable: sensor.Variable,
      Unidad: sensor.Unidad,
      ValorMaximo: sensor.ValorMaximo,
      ValorMinimo: sensor.ValorMinimo,
      Resolucion: sensor.Resolucion,
      MAC: sensor.MAC,
      FechaUltimaCalibracion: sensor.FechaUltimaCalibracion
    };

    console.log(sensorData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/sensor/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(sensorData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en registrarSensor:", error);
    throw error;
  }
}

export async function actualizarSensor(sensor: Sensor) {
  try {
    // Validación de campos requeridos
    if (!sensor.ID_Sensor) {
      throw new Error("El ID del Sensor es requerido");
    }

    // Crear el objeto de datos
    const sensorData = {
      ID: sensor.ID_Sensor,
      ...(sensor.Marca && { Marca: sensor.Marca }),
      ...(sensor.Modelo && { Modelo: sensor.Modelo }),
      ...(sensor.Variable && { Variable: sensor.Variable }),
      ...(sensor.Unidad && { Unidad: sensor.Unidad }),
      ...(sensor.ValorMaximo && { ValorMaximo: sensor.ValorMaximo }),
      ...(sensor.ValorMinimo && { ValorMinimo: sensor.ValorMinimo }),
      ...(sensor.Resolucion && { Resolucion: sensor.Resolucion }),
      ...(sensor.MAC && { MAC: sensor.MAC }),
      ...(sensor.FechaUltimaCalibracion && { FechaUltimaCalibracion: sensor.FechaUltimaCalibracion })
    };

    console.log(sensorData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/sensor/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(sensorData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en actualizarSensor:", error);
    throw error;
  }
}

export async function eliminarSensor(sensor: Sensor) {
  try {
    // Validación de campos requeridos
    if (!sensor.ID_Sensor) {
      throw new Error("El ID del Sensor es requerido");
    }

    // Crear el objeto de datos
    const sensorData = {
      ID: sensor.ID_Sensor
    };

    console.log(sensorData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/sensor/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(sensorData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en eliminarSensor:", error);
    throw error;
  }
}

export async function registrarRangoEdad(rangoedad: RangoEdad) {
  try {
    // Validación de campos requeridos
    if (!rangoedad.Minimo || !rangoedad.Maximo || !rangoedad.RangoEdad) {
      throw new Error("Todos los campos son requeridos");
    }

    // Crear el objeto de datos
    const rangoEdadData = {
      RangoEdad: rangoedad.RangoEdad,
      Minimo: rangoedad.Minimo,
      Maximo: rangoedad.Maximo
    };

    console.log(rangoEdadData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/rangoedad/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(rangoEdadData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en registrarRangoEdad:", error);
    throw error;
  }
}

export async function actualizarRangoEdad(rangoedad: RangoEdad) {
  try {
    // Validación de campos requeridos
    if (!rangoedad.RangoEdad) {
      throw new Error("El ID del rango edad es requerido");
    }

    // Crear el objeto de datos
    const rangoEdadData = {
      RangoEdad: rangoedad.RangoEdad,
      ...(rangoedad.Minimo && { Minimo: rangoedad.Minimo }),
      ...(rangoedad.Maximo && { Maximo: rangoedad.Maximo })
    };

    console.log(rangoEdadData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/rangoedad/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(rangoEdadData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en actualizarRangoEdad:", error);
    throw error;
  }
}

export async function eliminarRangoEdad(rangoedad: RangoEdad) {
  try {
    // Validación de campos requeridos
    if (!rangoedad.RangoEdad) {
      throw new Error("El ID del Rango edad es requerido");
    }

    // Crear el objeto de datos
    const rangoEdadjadorData = {
      RangoEdad: rangoedad.RangoEdad
    };

    console.log(rangoEdadjadorData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/rangoedad/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(rangoEdadjadorData),
    });

    if (!res.ok) {
      throw new Error(`Error en el servidor: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error en eliminarRangoedad:", error);
    throw error;
  }
}
