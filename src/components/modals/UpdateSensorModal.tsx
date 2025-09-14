import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Campos para actualizar un sensor
 * El ID es requerido, los demás campos son opcionales
 */
const updateSensorFields = [
    { name: "ID_Sensor", label: "ID del Sensor", required: true },
    { name: "Marca", label: "Marca", required: false },
    { name: "Modelo", label: "Modelo", required: false },
    { name: "Variable", label: "Variable", required: false },
    { name: "Unidad", label: "Unidad", required: false },
    { name: "ValorMaximo", label: "Valor Máximo", required: false },
    { name: "ValorMinimo", label: "Valor Mínimo", required: false },
    { name: "Resolucion", label: "Resolución", required: false },
    { name: "MAC", label: "MAC", required: false },
    { 
        name: "FechaUltimaCalibracion", 
        label: "Fecha Última Calibración (YYYY-MM-DD)", 
        required: true, 
        type: "date",
        placeholder: "Formato: YYYY-MM-DD"
    }
];

/**
 * Interfaz para el resultado de la operación
 */
interface OperationResult {
    ok: boolean;
    message: string;
    data?: any;
}

/**
 * Props del componente UpdateSensorModal
 */
interface UpdateSensorModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para actualizar en la base de datos
    initialData?: any;                                   // Datos iniciales del sensor a actualizar
}

/**
 * Componente modal específico para la actualización de Sensores.
 * Maneja la lógica de actualización de forma independiente.
 */
export const UpdateSensorModal = ({ 
    isOpen, 
    onClose, 
    onSave,
}: UpdateSensorModalProps) => {
    
    /**
     * Valida que el formulario tenga los datos mínimos necesarios:
     * - ID del Sensor (requerido)
     * - Al menos un campo adicional para actualizar
     */
    const validateFormData = (data: any): boolean => {
        // Verificar que existe el ID
        if (!data.ID_Sensor) return false;
        
        // Verificar que al menos un campo adicional tenga valor
        const hasAtLeastOneField = updateSensorFields
            .filter(field => field.name !== 'ID_Sensor')
            .some(field => data[field.name]?.trim() !== '');

        return hasAtLeastOneField;
    };
    
    /**
     * Función para manejar la actualización del sensor
     */
    const handleSave = async (formData: any) => {
        try {
            // Validar datos mínimos
            if (!validateFormData(formData)) {
                return {
                    ok: false,
                    message: "Se requiere el ID del Sensor que desea modificar y al menos un campo para actualizar",
                    data: null
                };
            }

            // Intentar actualizar los datos
            const result = await onSave(formData);
            
            if (result.ok) {
                // Si todo sale bien, cerrar el modal después de un breve delay
                setTimeout(() => {
                    onClose();
                }, 1000);
            }

            return result;
        } catch (error: any) {
            return {
                ok: false,
                message: error.message || "Error al actualizar el sensor",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Actualizar Sensor"
            description="Se requiere el ID del Sensor que desea modificar y al menos un campo para actualizar"
            fields={updateSensorFields}
            entityName="Sensor"
        />
    );
};