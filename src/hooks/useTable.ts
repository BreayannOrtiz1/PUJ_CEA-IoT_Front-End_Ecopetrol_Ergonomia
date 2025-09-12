import { useState, useEffect } from 'react';
import { listAll, ApiResponse } from '../services/tableService';

interface UseTableResult {
    data: any[];           // Datos de la tabla
    columns: string[];     // Nombres de las columnas
    loading: boolean;      // Estado de carga
    error: string | null;  // Mensaje de error si existe
    refresh: () => void;   // Función para recargar los datos
}

/**
 * Hook personalizado para manejar los datos de una tabla
 * @param tableName - Nombre de la tabla a consultar
 * @returns Objeto con los datos y funciones necesarias
 */
export function useTable(tableName: string): UseTableResult {
    const [data, setData] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para extraer las columnas del primer registro
    const extractColumns = (data: any[]): string[] => {
        if (data.length === 0) return [];
        // Obtiene las claves del primer objeto
        return Object.keys(data[0]);
    };

    // Función para cargar los datos
    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await listAll(tableName);
            
            // Si la respuesta es exitosa
            if (response.ok) {
                setData(response.data);
                setColumns(extractColumns(response.data));
            } else {
                throw new Error(response.message || 'Error al cargar los datos');
            }
        } catch (err: any) {
            setError(err.message || 'Error al cargar los datos');
            setData([]);
            setColumns([]);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos al montar el componente o cuando cambie la tabla
    useEffect(() => {
        loadData();
    }, [tableName]);

    return {
        data,
        columns,
        loading,
        error,
        refresh: loadData
    };
}