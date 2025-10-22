import { useState, useEffect } from "react";
import { ModalCreateRelationSQL } from "../common/ModalCreateRelationSQL";
import { SelectOption } from '../../types/common';

/**
 * Campos para actualizar un
 * El ID es requerido, los demás campos son opcionales
 */

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
interface UpdateProvision_FisiologicasModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para actualizar en la base de datos
    initialData?: any;                                   // Datos iniciales del a actualizar
}

/**
 * Componente modal específico para la actualización 
 * Requiere el ID  y al menos un campo adicional para actualizar.
 */
export const UpdateProvision_FisiologicasModal = ({
    isOpen,
    onClose,
    onSave,
}: UpdateProvision_FisiologicasModalProps) => {
    // Estado para almacenar las opciones de cada select
    const [selectOptions, setSelectOptions] = useState<{
        trabajadores: SelectOption[];
        nodos: SelectOption[];
        sensores: SelectOption[];
        gatewayprov: SelectOption[];
    }>({
        trabajadores: [],
        nodos: [],
        sensores: [],
        gatewayprov: []
    });

    // Estado para controlar si se están cargando las opciones
    const [loadingOptions, setLoadingOptions] = useState(false);

    // Estado para manejar errores al cargar opciones
    const [fetchError, setFetchError] = useState<string | null>(null);

    /**
     * Función que obtiene los IDs de todas las tablas relacionadas
     * Usa el endpoint unificado /provision/listID
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

            const trabajadorOptions = data.Trabajador?.map((item: any) => ({
                value: item.id.toString(),
                label: `${item.id} - ${item.display}`
            })) || [];

            const gatewayProvisionOptions = data.Config_Provision_Gateways?.map((item: any) => ({
                value: item.id.toString(),
                label: `${item.id} - ${item.display}`
            })) || [];

            // Actualizar el estado con las opciones obtenidas
            setSelectOptions({
                nodos: nodoOptions,
                sensores: sensorOptions,
                trabajadores: trabajadorOptions,
                gatewayprov: gatewayProvisionOptions
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
    }, [isOpen]);
    
    /**
     * Definición dinámica de los campos del formulario
     * Las opciones ahora vienen del estado selectOptions
     */
    const updateProvision_FisiologicasFields = [
        { name: "ID_Provision_Fisiologicas", label: "ID Provision_Fisiologicas", required: true },
        {
            name: "ID_NodoIoT",
            label: "Nodo IoT",
            required: true,
            type: 'select' as const,
            options: loadingOptions
                ? [{ value: "", label: "Cargando opciones..." }]
                : selectOptions.nodos
        },
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
            options: loadingOptions
                ? [{ value: "", label: "Cargando opciones..." }]
                : selectOptions.trabajadores
        },
        {
            name: "ID_Config_Provision_Gateways",
            label: "ID Gateway Provisionado",
            required: true,
            type: 'select' as const,
            options: loadingOptions
                ? [{ value: "", label: "Cargando opciones..." }]
                : selectOptions.gatewayprov
        },
        {
            name: "ECG",
            label: "¿Desea enviar datos de electrocardiograma? <br />Ingrese 1 para verdadero y 0 para falso",
            required: true
        },
        {
            name: "HR_RR_RRi",
            label: "¿Desea enviar datos de frecuencia cardiaca, respiratoria y tiempo entre latidos?<br />Ingrese 1 para verdadero y 0 para falso",
            required: true
        },
        {
            name: "ACC",
            label: "¿Desea enviar datos relacionados con la acceleración o movimiento?<br />Ingrese 1 para verdadero y 0 para falso",
            required: true
        },
        {
            name: "Activo",
            label: "Actualmente esta activo el sensor<br />Ingrese 1 para verdadero y 0 para falso",
            required: true
        },
        {
            name: "SASTOKEN",
            label: "SASTOKEN. No olvide verificar la duración ",
            required: true
        }
    ];

    /**
     * Función para validar y enviar los datos de actualización
     */
    const handleSave = async (formData: any): Promise<OperationResult> => {
        try {
            // Validar que existe el ID
            if (!formData.ID_Provision_Fisiologicas) {
                return {
                    ok: false,
                    message: "El ID de la Provision_Fisiologicas es requerido",
                    data: null
                };
            }

            // Verificar que al menos un campo adicional tenga valor
            const hasUpdates = updateProvision_FisiologicasFields
                .filter(field => field.name !== 'ID_Provision_Fisiologicas')
                .some(field => formData[field.name]?.trim() !== '');

            if (!hasUpdates) {
                return {
                    ok: false,
                    message: "Debe proporcionar al menos un campo para actualizar",
                    data: null
                };
            }

            // Intentar actualizar los datos
            const result = await onSave(formData);
            return result;
        } catch (error: any) {
            return {
                ok: false,
                message: error.message || "Error al actualizar la Provision_Fisiologicas",
                data: null
            };
        }
    };

    return (
        <ModalCreateRelationSQL
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Actualizar Provision Fisiologicas"
            description={
                fetchError
                    ? fetchError
                    : loadingOptions
                        ? "Cargando opciones..."
                        : "Ingrese el ID de la Provision Fisiologicas y los campos que desea actualizar"
            }
            fields={updateProvision_FisiologicasFields}
            entityName="Provision Fisiologicas"
            loading={loadingOptions}
        />
    );
};