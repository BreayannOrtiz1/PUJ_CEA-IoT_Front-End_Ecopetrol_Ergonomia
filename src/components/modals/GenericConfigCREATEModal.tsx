// components/modals/GenericConfigCREATEModal.tsx
import { useState, useEffect } from 'react';
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";
import Label from "../form/Label";
import { FormField, ApiResponse } from '../../types/common';

interface GenericConfigCREATEModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: any) => Promise<ApiResponse>;
  title?: string;
  description?: string;
  fields: readonly FormField[];
  entityName: string;
}

// Define el tipo para las opciones del endpoint basado en tu respuesta
interface SelectOptionsResponse {
  NodoIoT: Array<{ id: string; display: string }>;
  Sensor: Array<{ id: string; display: string }>;
  Trabajador: Array<{ id: string; display: string }>;
  Config_Provision_Gateways: Array<{ id: string; display: string }>;
}

export const GenericConfigCREATEModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  description,
  fields = [],
  entityName,
}: GenericConfigCREATEModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectOptions, setSelectOptions] = useState<SelectOptionsResponse | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(false);

  // Cargar opciones cuando se abre el modal
  useEffect(() => {
    if (isOpen && entityName === "Provisionamiento de sensor de variables fisiologicas") {
      loadSelectOptions();
    }
  }, [isOpen, entityName]);

  const loadSelectOptions = async () => {
    setLoadingOptions(true);
    try {
      const response = await fetch('http://4.150.10.133:5173/api/v1/provision/listID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tables: [
            { name: "NodoIoT", idColumn: "ID_NodoIoT", displayColumn: "Referencia" },
            { name: "Sensor", idColumn: "ID_Sensor", displayColumn: "Modelo" },
            { name: "Trabajador", idColumn: "ID_Trabajador", displayColumn: "Cargo" },
            { name: "Config_Provision_Gateways", idColumn: "ID_Config_Provision_Gateways", displayColumn: "ID_Gateway" }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error('Error al cargar las opciones');
      }
      
      const result = await response.json();
      
      if (!result.ok) {
        throw new Error(result.message || 'Error en la respuesta del servidor');
      }

      setSelectOptions(result.data);
    } catch (error) {
      console.error('Error cargando opciones:', error);
      setError('Error al cargar las opciones disponibles');
    } finally {
      setLoadingOptions(false);
    }
  };

  // Obtener las opciones actualizadas para un campo específico
  const getFieldOptions = (fieldName: string) => {
    if (!selectOptions) {
      return [{ value: "", label: "Cargando opciones..." }];
    }

    // Mapeo entre los nombres de campos y las claves en la respuesta
    const fieldToTableMap: { [key: string]: string } = {
      ID_NodoIoT: "NodoIoT",
      ID_Sensor: "Sensor", 
      ID_Trabajador: "Trabajador",
      ID_Config_Provision_Gateways: "Config_Provision_Gateways"
    };

    const tableKey = fieldToTableMap[fieldName];
    
    if (!tableKey || !selectOptions[tableKey as keyof SelectOptionsResponse]) {
      return [{ value: "", label: "No hay opciones disponibles" }];
    }

    const tableData = selectOptions[tableKey as keyof SelectOptionsResponse] as Array<{ id: string; display: string }>;
    
    return tableData.map(item => ({
      value: item.id,
      label: `${item.display.trim()} (ID: ${item.id})`
    }));
  };

  // Initialize formData
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      setSelectOptions(null);
      
      const data: Record<string, string> = {};
      fields.forEach(field => {
        data[field.name] = '';
      });
      
      setFormData(data);
    }
  }, [isOpen, fields]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const validateForm = (): boolean => {
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

  const handleSubmit = async () => {
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

      const result = await onSave(processedData);

      if (result.ok) {
        setSuccess(result.message || `${entityName} creado exitosamente`);
        setTimeout(() => {
          onClose();
          setSuccess(null);
        }, 500);
      } else {
        setError(result.message || `Error al crear ${entityName.toLowerCase()}`);
      }
    } catch (err: any) {
      setError(err.message || `Error al crear ${entityName.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const modalTitle = title || `Crear ${entityName}`;
  const modalDescription = description || `Ingrese los datos para crear un nuevo ${entityName}.`;

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
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name}>
                  <Label >
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
                      disabled={loadingOptions}
                    >
                      <option value="">
                        {loadingOptions ? "Cargando opciones..." : "Seleccione una opción"}
                      </option>
                      {getFieldOptions(field.name).map((option) => (
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
              disabled={loading || loadingOptions}
            >
              {loading ? 'Procesando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};