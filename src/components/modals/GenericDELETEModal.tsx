// components/modals/GenericDELETEModal.tsx
import { useState, useEffect } from 'react';
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import { ApiResponse } from '../../types/common';

interface GenericDELETEModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => Promise<ApiResponse>;
  title?: string;
  description?: string;
  entityName: string;
  initialData?: any;
}

export const GenericDELETEModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  description,
  entityName,
  initialData = {}
}: GenericDELETEModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize formData
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      
      const data: Record<string, string> = {};
      
      // If we have initial data, use it
      if (initialData && Object.keys(initialData).length > 0 && initialData['ID']) {
        data['ID'] = initialData['ID'].toString();
      } else {
        data['ID'] = '';
      }
      
      setFormData(data);
    }
  }, [isOpen, initialData]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const validateForm = (): boolean => {
    // Ensure ID is provided
    if (!formData['ID']) {
      setError(`El ID del ${entityName} es obligatorio`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // For deletion, we only need the ID
      const processedData = { ID: Number(formData['ID']) };
      
      const result = await onSave(processedData);

      if (result.ok) {
        setSuccess(result.message || `${entityName} eliminado exitosamente`);
        setTimeout(() => {
          onClose();
          setSuccess(null);
        }, 500);
      } else {
        setError(result.message || `Error al eliminar ${entityName.toLowerCase()}`);
      }
    } catch (err: any) {
      setError(err.message || `Error al eliminar ${entityName.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = title || `Eliminar ${entityName}`;
  const modalDescription = description || 
    `¿Está seguro de que desea eliminar este ${entityName}? Esta acción no se puede deshacer.`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {modalTitle}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            {modalDescription}
          </p>
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div>
              <Label>ID del {entityName} <span className="text-red-500">*</span></Label>
              <TextArea
                value={formData['ID'] || ''}
                onChange={(val: string) => handleChange('ID', val)}
                rows={1}
                placeholder="Ingrese el ID"
              />
              <p className="mt-4 text-sm text-red-500">
                Esta acción no se puede deshacer.
              </p>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded bg-red-100 text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 p-3 rounded bg-green-100 text-green-700">
                {success}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? 'Procesando...' : 'Eliminar'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};