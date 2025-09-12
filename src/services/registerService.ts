// src/services/gatewayService.ts
export interface Gateway {
  marca?: string;        
  referencia?: string;  // Required
  serial?: string;      // Optional
  os?: string;         // Additional frontend-only field
  ssid?: string;       // Additional frontend-only field
  macWifi?: string;    // Additional frontend-only field
  macEthernet?: string;// Additional frontend-only field
}

export interface Lugar {
  municipio?: string;        
  sede?: string;  // Required
  edificio?: string;      // Optional
  piso?: string;         // Additional frontend-only field
  area?: string;       // Additional frontend-only field
}

export async function registrarGateway(gateway: Gateway) {
  try {
    // Validación de campos requeridos
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

  export async function registrarLugar(lugar: Lugar) {
  try {
    // Validación de campos requeridos
    if (!lugar.municipio) {
      throw new Error("El campo municipio es requerido");
    }
    if (!lugar.sede) {
      throw new Error("El campo lugar es requerido");
    }

    // Crear el objeto de datos, omitiendo campos undefined o null
    const lugarData = {
      municipio: lugar.municipio,
      sede: lugar.sede,
      ...(lugar.edificio && { edificio: lugar.edificio }),
      ...(lugar.piso && { piso: lugar.piso }),
      ...(lugar.area && { area: lugar.area }),
    };

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

    return await res.json(); // aquí recibes el resultado del backend
  } catch (error) {
    console.error("Error en registrarGateway:", error);
    throw error;
  }
}
