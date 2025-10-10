// components/modals/GenericCRUDModal.tsx
import { useState, useEffect } from 'react';
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import { FormField, ApiResponse } from '../../types/common';

type CRUDAction = 'create' | 'update' | 'delete';

interface GenericCRUDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => Promise<ApiResponse>;
  action: CRUDAction;
  title?: string;
  description?: string;
  fields?: readonly FormField[];  // No required for delete
  entityName: string;
  initialData?: any;     // For update and delete
}

export const GenericCRUDModal = ({
  isOpen,
  onClose,
  onSave,
  action,
  title,
  description,
  fields = [],
  entityName,
  initialData = {}
}: GenericCRUDModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showIdInput, setShowIdInput] = useState(false);
  const [entityLoaded, setEntityLoaded] = useState(false);

  // Inicializar formData
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      setEntityLoaded(false);
      
      const data: Record<string, string> = {};
      
      if ((action === 'update' || action === 'delete') && !initialData) {
        // Solo necesitamos el campo ID inicialmente
        setShowIdInput(true);
        data['ID'] = '';
      } else if (action === 'update' && initialData) {
        // Si ya tenemos datos iniciales (poco probable en este caso)
        setShowIdInput(false);
        setEntityLoaded(true);
        fields.forEach(field => {
          data[field.name] = initialData[field.name]?.toString() || '';
        });
      } else if (action === 'delete' && initialData) {
        setShowIdInput(true);
        data['ID'] = initialData['ID']?.toString() || '';
      } else {
        // Caso para crear
        fields.forEach(field => {
          data[field.name] = '';
        });
      }
      setFormData(data);
    }
  }, [isOpen, action, fields, initialData]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const validateForm = (): boolean => {
    if (action === 'delete') {
      return !!formData['ID'];
    }

    const requiredFields = fields.filter(f => f.required);
    for (const field of requiredFields) {
      const value = formData[field.name];
      if (!value || value.trim() === '') {
        setError(`El campo ${field.label} es obligatorio`);
        return false;
      }

      if (field.type === 'date') {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          setError(`El campo ${field.label} debe tener el formato YYYY-MM-DD`);
          return false;
        }
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          setError(`La fecha ingresada en ${field.label} no es válida`);
          return false;
        }
      }
    }
    return true;
  };

  // Función para cargar los datos de la entidad por ID
  const handleLoadEntity = async () => {
    if (!formData.ID) {
      setError(`El ID del ${entityName} es obligatorio`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Solo hacemos la llamada para cargar datos en el caso de update
      // Para delete, simplemente aceptamos el ID
      if (action === 'update') {
        // En un caso real, aquí haría una llamada para obtener los datos de la entidad
        // Por ahora simulamos que ya tenemos los datos para continuar
        setEntityLoaded(true);
        setShowIdInput(false);
      } else if (action === 'delete') {
        // Para delete, simplemente continuamos con el ID proporcionado
        setEntityLoaded(true);
      }
    } catch (err: any) {
      setError(err.message || `Error al cargar ${entityName}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Si estamos en modo ID input para update o delete, primero cargamos la entidad
    if (showIdInput && !entityLoaded) {
      handleLoadEntity();
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let processedData: any = { ...formData };

      // Convertir tipos si es necesario
      if (action !== 'delete') {
        fields.forEach(field => {
          if (field.type === 'date' && processedData[field.name]) {
            const date = new Date(processedData[field.name]);
            if (!isNaN(date.getTime())) {
              processedData[field.name] = date.toISOString().split('T')[0];
            }
          }
        });
      }

      const result = await onSave(processedData);

      if (result.ok) {
        setSuccess(result.message || `${entityName} ${action === 'create' ? 'creado' : action === 'update' ? 'actualizado' : 'eliminado'} exitosamente`);
        setTimeout(() => {
          onClose();
          setSuccess(null);
        }, 1500);
      } else {
        setError(result.message || `Error al ${action} ${entityName.toLowerCase()}`);
      }
    } catch (err: any) {
      setError(err.message || `Error al ${action} ${entityName.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultTitle = () => {
    switch (action) {
      case 'create': return `Crear ${entityName}`;
      case 'update': return `Actualizar ${entityName}`;
      case 'delete': return `Eliminar ${entityName}`;
      default: return '';
    }
  };

  const getDefaultDescription = () => {
    switch (action) {
      case 'create': return `Ingrese los datos para crear un nuevo ${entityName}.`;
      case 'update': return `Modifique los datos del ${entityName}.`;
      case 'delete': return `¿Está seguro de que desea eliminar este ${entityName}? Esta acción no se puede deshacer.`;
      default: return '';
    }
  };

  const modalTitle = title || getDefaultTitle();
  const modalDescription = description || getDefaultDescription();

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
            {/* Muestra el campo de ID para update y delete cuando no se ha ingresado el ID */}
            {((action === 'update' || action === 'delete') && showIdInput) ? (
              <div>
                <Label>ID del {entityName} <span className="text-red-500">*</span></Label>
                <TextArea
                  value={formData['ID'] || ''}
                  onChange={(val: string) => handleChange('ID', val)}
                  rows={1}
                  placeholder="Ingrese el ID"
                />
                {action === 'delete' && (
                  <p className="mt-4 text-sm text-red-500">
                    Esta acción no se puede deshacer.
                  </p>
                )}
              </div>
            ) : action !== 'delete' ? (
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.name}>
                    <Label>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {field.type === 'date' ? (
                      <input
                        type="date"
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder={field.placeholder}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="">Seleccione una opción</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <TextArea
                        value={formData[field.name] || ''}
                        onChange={(val: string) => handleChange(field.name, val)}
                        rows={field.rows || 1}
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
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
            )}

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
            >
              {loading ? 'Procesando...' :
               (showIdInput && !entityLoaded) ? 'Continuar' :
               action === 'delete' ? 'Eliminar' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};