// src/services/gatewayService.ts
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

export async function actualizarGateway(gateway: Gateway) {
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
    const res = await fetch("http://4.150.10.133:8090/api/v1/gateway/update", {
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
    console.log(gatewayData);
    const res = await fetch("http://4.150.10.133:8090/api/v1/gateway/update", {
      method: "POST",
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
