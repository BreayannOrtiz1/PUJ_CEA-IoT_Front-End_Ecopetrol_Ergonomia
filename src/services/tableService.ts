// Servicio genérico para consultar cualquier tabla
const API_BASE_URL = 'http://4.150.10.133:8090/api/v1';

// Tipo para la respuesta genérica del backend
export interface ApiResponse<T> {
    ok: boolean;
    message?: string;
    data: T[];
}

/**
 * Función genérica para obtener todos los registros de una tabla
 * @param tableName - Nombre de la tabla (gateway, lugar, etc)
 * @returns Promise con la respuesta del backend
 */
export async function listAll(tableName: string): Promise<ApiResponse<any>> {
    try {   //http://4.150.10.133:8090/api/v1/gateways
        //const tableNameJson = {tableName : tableName};
        //console.log(`Datos enviados a: ${API_BASE_URL}/${tableName}`);
        const response = await fetch(`${API_BASE_URL}/${tableName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            //body: JSON.stringify(tableNameJson),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`Error al obtener datos de ${tableName}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error en listAll de ${tableName}:`, error);
        throw error;
    }
}