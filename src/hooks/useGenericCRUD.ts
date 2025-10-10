// hooks/useGenericCRUD.ts
import { useState } from 'react';
import { GenericCRUDService, ApiResponse } from '../services/GenericCRUDService';

export const useGenericCRUD = <T>(entity: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (data: T): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await GenericCRUDService.create<T>(entity, data);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || `Error al crear ${entity}`;
      setError(err.message);
      return {
        ok: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const update = async (data: T & { ID: number }): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await GenericCRUDService.update<T>(entity, data);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || `Error al crear ${entity}`;
      setError(err.message);
      return {
        ok: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await GenericCRUDService.delete(entity, id);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || `Error al eliminar ${entity}`;
      setError(err.message);
      return {
        ok: false,
        message: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    update,
    remove,
    loading,
    error,
  };
};