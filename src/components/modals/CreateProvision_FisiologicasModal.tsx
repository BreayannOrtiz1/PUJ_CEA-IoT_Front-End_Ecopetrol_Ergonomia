import { useState, useEffect } from "react";
import { ModalCreateRelationSQL } from "../common/ModalCreateRelationSQL";
import { SelectOption } from '../../types/common';

/**
 * Interfaz para el resultado de la operación
 */
interface OperationResult {
  ok: boolean;
  message: string;
  data?: any;
}

/**
 * Props del componente
 */
interface CreateProvision_FisiologicasModalProps {
  isOpen: boolean; // Controla la visibilidad del modal
  onClose: () => void; // Función para cerrar el modal
  onSave: (formData: any) => Promise<OperationResult>; // Callback para almacenar en la base de datos
}

/**
 * Componente modal específico para la creación de Provision_Fisiologicas s
 * Se encarga de:
 * 1. Cargar dinámicamente las opciones de los selects desde la BD
 * 2. Validar los datos antes de enviar
 * 3. Mostrar estados de carga mientras se obtienen las opciones
 */
export const CreateProvision_FisiologicasModal = ({ isOpen, onClose, onSave }: CreateProvision_FisiologicasModalProps) => {
  // Estado para almacenar las opciones de cada select
  // Cada propiedad contendrá un array de {value, label}
  const [selectOptions, setSelectOptions] = useState<{
    trabajadores: SelectOption[];
    nodos: SelectOption[];
    //lugares: SelectOption[];
    sensores: SelectOption[];
  }>({
    trabajadores: [],
    nodos: [],
    //lugares: [],
    sensores: []
  });

  // Estado para controlar si se están cargando las opciones
  const [loadingOptions, setLoadingOptions] = useState(false);

  // Estado para manejar errores al cargar opciones
  const [fetchError, setFetchError] = useState<string | null>(null);

  /**
   * Función que obtiene los IDs de todas las tablas relacionadas
   * Usa el nuevo endpoint unificado /provision/listID
   * Se ejecuta automáticamente cuando el modal se abre
   */
  const fetchTableIds = async () => {
    // Activar estado de carga
    setLoadingOptions(true);
    setFetchError(null);

    try {
      // Definir configuración de las tablas a consultar
      const tablesConfig = {
        tables: [
          {
            name: "NodoIoT",
            idColumn: "ID_NodoIoT",
            displayColumn: "Referencia"
          },
          {
            name: "Sensor",
            idColumn: "ID_Sensor",
            displayColumn: "Modelo"
          },
          // {
          //   name: "Lugar",
          //   idColumn: "ID_Lugar",
          //   displayColumn: "Nombre"
          // },
          {
            name: "Trabajador",
            idColumn: "ID_Trabajador",
            displayColumn: "Cargo"
          },
          {
            name: "Config_Provision_Gateways",
            idColumn: "ID_Config_Provision_Gateways",
            displayColumn: "ID_Gateway"
          }
        ]
      };

      // Hacer una sola petición al endpoint 
      const response = await fetch('http://4.150.10.133:8090/api/v1/provision/listID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(tablesConfig)
      });

      // Validar respuesta
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.statusText}`);
      }

      // Obtener datos del servidor
      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.message || 'Error al obtener los IDs');
      }

      // result.data contiene un objeto con las tablas como keys
      // Ejemplo: { Trabajador: [{id, display}], Sensor: [{id, display}] }
      const data = result.data;

      // Transformar los datos al formato {value, label} para los selects
      const nodoOptions = data.NodoIoT?.map((item: any) => ({
        value: item.id.toString(),
        label: `${item.id} - ${item.display}`
      })) || [];

      const sensorOptions = data.Sensor?.map((item: any) => ({
        value: item.id.toString(),
        label: `${item.id} - ${item.display}`
      })) || [];

      // const lugarOptions = data.Lugar?.map((item: any) => ({
      //   value: item.id.toString(),
      //   label: `${item.id} - ${item.display}`
      // })) || [];

      const trabajadorOptions = data.Trabajador?.map((item: any) => ({
        value: item.id.toString(),
        label: `${item.id} - ${item.display}`
      })) || [];


      // Actualizar el estado con las opciones obtenidas
      setSelectOptions({
        nodos: nodoOptions,
        sensores: sensorOptions,
        trabajadores: trabajadorOptions
        //lugares: lugarOptions,
        
      });

    } catch (error: any) {
      console.error('Error al obtener los IDs de las tablas:', error);
      setFetchError('No se pudieron cargar las opciones. Intente nuevamente.');
    } finally {
      // Desactivar estado de carga siempre, incluso si hay error
      setLoadingOptions(false);
    }
  };

  /**
   * useEffect que se ejecuta cada vez que cambia isOpen
   * Cuando el modal se abre (isOpen = true), carga las opciones
   */
  useEffect(() => {
    if (isOpen) {
      // El modal acaba de abrirse, cargar las opciones
      fetchTableIds();
    }
  }, [isOpen]); // Se ejecuta cada vez que isOpen cambia

  /**
   * Definición dinámica de los campos del formulario
   * Las opciones ahora vienen del estado selectOptions
   */
  const Provision_FisiologicasFields = [
    
    {
      name: "ID_NodoIoT",
      label: "Nodo IoT",
      required: true,
      type: 'select' as const,
      options: loadingOptions 
        ? [{ value: "", label: "Cargando opciones..." }] 
        : selectOptions.nodos
    },
    // {
    //   name: "ID_Lugar",
    //   label: "Lugar",
    //   required: true,
    //   type: 'select' as const,
    //   options: loadingOptions 
    //     ? [{ value: "", label: "Cargando opciones..." }] 
    //     : selectOptions.lugares
    // },
    {
      name: "ID_Sensor",
      label: "Sensor",
      required: true,
      type: 'select' as const,
      options: loadingOptions 
        ? [{ value: "", label: "Cargando opciones..." }] 
        : selectOptions.sensores
    },
    {
      name: "ID_Trabajador",
      label: "Trabajador",
      required: true,
      type: 'select' as const,
      // Si está cargando, mostrar mensaje. Si no, mostrar las opciones obtenidas
      options: loadingOptions 
        ? [{ value: "", label: "Cargando opciones..." }] 
        : selectOptions.trabajadores
    },
    // {
    //   name: "Fecha_Inicio",
    //   label: "Fecha de Inicio",
    //   required: true,
    //   type: 'date' as const
    // },
    // {
    //   name: "Fecha_Fin",
    //   label: "Fecha de Fin",
    //   required: true,
    //   type: 'date' as const
    // }
  ];

  /**
   * Función para manejar el guardado
   * Valida y envía los datos al servidor
   */
  const handleSave = async (formData: any): Promise<OperationResult> => {
    try {
      // Validar que todos los campos requeridos tienen valor
      const missingFields = Provision_FisiologicasFields
        .filter(field => field.required && !formData[field.name]?.toString().trim())
        .map(field => field.label);

      if (missingFields.length > 0) {
        return {
          ok: false,
          message: `Campos requeridos faltantes: ${missingFields.join(', ')}`,
          data: null
        };
      }

      // Enviar datos al servidor a través del callback onSave
      const result = await onSave(formData);
      return result;

    } catch (error: any) {
      return {
        ok: false,
        message: error.message || "Error al registrar Provision_Fisiologicas ",
        data: null
      };
    }
  };

  return (
    <ModalCreateRelationSQL
      isOpen={isOpen}
      closeModal={onClose}
      onSave={handleSave}
      title="Crear nueva Provision Fisiologicas "
      description={
        fetchError 
          ? fetchError 
          : loadingOptions 
            ? "Cargando opciones..." 
            : "Ingrese los datos de la nueva Provision Fisiologicas . Todos los campos son obligatorios."
      }
      fields={Provision_FisiologicasFields}
      entityName="Provision Fisiologicas "
      loading={loadingOptions} // Pasar el estado de carga al modal hijo
    />
  );
};