// components/modals/GenericUPDATEModal.tsx
import { useState, useEffect } from 'react';
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import { FormField, ApiResponse } from '../../types/common';

interface GenericUPDATEModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => Promise<ApiResponse>;
  title?: string;
  description?: string;
  fields: readonly FormField[];
  entityName: string;
  initialData?: any;
}

export const GenericUPDATEModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  description,
  fields = [],
  entityName,
  initialData = {}
}: GenericUPDATEModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [showIdInput, setShowIdInput] = useState(true);
  const [entityLoaded, setEntityLoaded] = useState(false);

  // Initialize formData
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      setEntityLoaded(false);
      
      const data: Record<string, string> = {};
      
      // Only need ID field initially
      if (!initialData || Object.keys(initialData).length === 0) {
        setShowIdInput(true);
        data['ID'] = '';
      } else {
        // If we have initial data
        setShowIdInput(false);
        setEntityLoaded(true);
        fields.forEach(field => {
          data[field.name] = initialData[field.name]?.toString() || '';
        });
        // Ensure ID is included
        data['ID'] = initialData['ID']?.toString() || '';
      }
      
      setFormData(data);
    }
  }, [isOpen, fields, initialData]);

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

    // Skip other validations if we're still in ID input mode
    if (showIdInput && !entityLoaded) {
      return true;
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

  // Function to load entity data by ID
  const handleLoadEntity = async () => {
    if (!formData.ID) {
      setError(`El ID del ${entityName} es obligatorio`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real case, we would make an API call to fetch entity data here
      // For now, we'll just simulate that we've loaded the entity
      
      // Mock successful data loading
      setEntityLoaded(true);
      setShowIdInput(false);
      
      // In a real implementation, we would populate the form with data from the API
      // const entity = await fetchEntityById(formData.ID);
      // fields.forEach(field => {
      //   setFormData(prev => ({
      //     ...prev,
      //     [field.name]: entity[field.name]?.toString() || ''
      //   }));
      // });
      
    } catch (err: any) {
      setError(err.message || `Error al cargar ${entityName}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // If we're in ID input mode and haven't loaded the entity yet, try to load it
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

      // Convert types if needed
      fields.forEach(field => {
        if (field.type === 'date' && processedData[field.name]) {
          const date = new Date(processedData[field.name]);
          if (!isNaN(date.getTime())) {
            processedData[field.name] = date.toISOString().split('T')[0];
          }
        }
      });

      // Ensure ID is a number
      processedData.ID = Number(processedData.ID);

      const result = await onSave(processedData);

      if (result.ok) {
        setSuccess(result.message || `${entityName} actualizado exitosamente`);
        setTimeout(() => {
          onClose();
          setSuccess(null);
        }, 500);
      } else {
        setError(result.message || `Error al actualizar ${entityName.toLowerCase()}`);
      }
    } catch (err: any) {
      setError(err.message || `Error al actualizar ${entityName.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = title || `Actualizar ${entityName}`;
  const modalDescription = description || `Modifique los datos del ${entityName}.`;

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
            {/* Show ID input field when entity is not loaded yet */}
            {showIdInput ? (
              <div>
                <Label>ID del {entityName} <span className="text-red-500">*</span></Label>
                <TextArea
                  value={formData['ID'] || ''}
                  onChange={(val: string) => handleChange('ID', val)}
                  rows={1}
                  placeholder="Ingrese el ID"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                {/* Always show ID field first when entity is loaded */}
                <div key="ID">
                  <Label>
                    ID del {entityName} <span className="text-red-500">*</span>
                  </Label>
                  <TextArea
                    value={formData['ID'] || ''}
                    onChange={(val: string) => handleChange('ID', val)}
                    rows={1}
                    placeholder="Ingrese el ID"
                    disabled={entityLoaded}
                  />
                </div>
                
                {fields.map((field) => (
                  field.name !== 'ID' ? (
                    <div key={field.name}>
                      <Label>
                        <span dangerouslySetInnerHTML={{ __html: field.label }} />
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
                  ) : null
                ))}
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
               (showIdInput && !entityLoaded) ? 'Continuar' : 'Actualizar'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};