import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Definición de los campos del formulario para Sensor
 * Todos los campos son requeridos para la creación
 */
const sensorFields = [
    { name: "Marca", label: "Marca", required: true },
    { name: "Modelo", label: "Modelo", required: true },
    { name: "Variable", label: "Variable", required: true },
    { name: "Unidad", label: "Unidad", required: true },
    { name: "ValorMaximo", label: "Valor Máximo", required: true },
    { name: "ValorMinimo", label: "Valor Mínimo", required: true },
    { name: "Resolucion", label: "Resolución", required: true },
    { name: "MAC", label: "MAC", required: true },
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
 * Props del componente CreateSensorModal
 */
interface CreateSensorModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para guardar en la base de datos
}

/**
 * Componente modal específico para la creación de Sensores.
 * Encapsula toda la lógica relacionada con la creación de un sensor.
 */
export const CreateSensorModal = ({ isOpen, onClose, onSave }: CreateSensorModalProps) => {
    // Función para validar los datos antes de guardar
    const validateFormData = (formData: any): boolean => {
        // Verificar que todos los campos requeridos tengan valor
        return sensorFields.every(field => 
            field.required ? formData[field.name]?.trim() !== '' : true
        );
    };

    // Función para manejar el guardado de datos
    const handleSave = async (formData: any) => {
        try {
            // Validar que todos los campos requeridos estén llenos
            if (!validateFormData(formData)) {
                return {
                    ok: false,
                    message: "Todos los campos son requeridos para crear un sensor",
                    data: null
                };
            }

            // Intentar guardar los datos
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
                message: error.message || "Error al registrar el sensor",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Crear nuevo Sensor"
            description="Ingrese los datos del nuevo sensor. Todos los campos son obligatorios."
            fields={sensorFields}
            entityName="Sensor"
        />
    );
};