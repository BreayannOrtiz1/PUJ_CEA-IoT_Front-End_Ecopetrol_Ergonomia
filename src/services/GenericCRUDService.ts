
const API_BASE_URL = 'http://4.150.10.133:8090/api/v1';

export interface ApiResponse<T = any> {
  ok: boolean;
  message?: string;
  data?: T;
}

export class GenericCRUDService {
  // Operación genérica CREATE
  static async create<T>(entity: string, data: T): Promise<ApiResponse> {
    try {
      if(entity === "Config_Provision_Fisiologicas") {
        entity = "provision";
      }

      console.log(JSON.stringify(data));
      const res = await fetch(`${API_BASE_URL}/${entity.toLowerCase()}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Error en el servidor: ${res.statusText}`);
      }

      return await res.json();
    } catch (error) {
      //console.error(`Error en crear ${entity}:`, error);
      throw error;
    }
  }

  // Operación genérica UPDATE
  static async update<T>(entity: string, data: T & { ID: number }): Promise<ApiResponse> {
    try {
      if(entity === "Config_Provision_Fisiologicas") {
        entity = "provision";
      }
      console.log(JSON.stringify(data));
      const res = await fetch(`${API_BASE_URL}/${entity.toLowerCase()}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Error en el servidor: ${res.statusText}`);
      }

      return await res.json();
    } catch (error) {
      console.error(`Error en actualizar ${entity}:`, error);
      throw error;
    }
  }

  // Operación genérica DELETE
  static async delete(entity: string, id: number): Promise<ApiResponse> {
    try {
      if(entity === "Config_Provision_Fisiologicas") {
        entity = "provision";
      }
      //console.log(JSON.stringify({ID: id}));
      const res = await fetch(`${API_BASE_URL}/${entity.toLowerCase()}/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ ID: id }),
      });

      if (!res.ok) {
        throw new Error(`Error en el servidor: ${res.statusText}`);
      }

      return await res.json();
    } catch (error) {
      console.error(`Error en eliminar ${entity}:`, error);
      throw error;
    }
  }

  // Operación genérica LIST
  static async listAll(entity: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/generic/?tableName=${entity}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener datos de ${entity}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error en list de ${entity}:`, error);
      throw error;
    }
  }
}