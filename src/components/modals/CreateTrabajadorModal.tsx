import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Definición de los campos del formulario
 * Todos los campos son requeridos para la creación
 */
const TrabajadorFields = [
    { name: "Sexo", label: "Sexo", required: true },
    { name: "ID_Rango_Edad", label: "Rango de edad", required: true },
    { name: "Cargo", label: "Cargo", required: true },

];

/**
 * Interfaz para el resultado de la operación
 */
interface OperationResult {
    ok: boolean;
    message: string;
    data?: any;
}

interface CreateTrabajadorModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para almacenar en la base de datos
}

/**
 * Componente modal específico para la creación
 * Encapsula toda la lógica relacionada con la creación de un nodo IoT.
 * Requiere que todos los campos estén llenos antes de permitir la creación.
 */
export const CreateTrabajadorModal = ({ 
    isOpen, 
    onClose, 
    onSave 
}: CreateTrabajadorModalProps) => {
    /**
     * Función para manejar la creación.
     * Valida y envía los datos al servidor.
     */
    const handleSave = async (formData: any): Promise<OperationResult> => {
        try {
            // Validar que todos los campos requeridos tienen valor
            const missingFields = TrabajadorFields
                .filter(field => field.required && !formData[field.name]?.trim())
                .map(field => field.label);

            if (missingFields.length > 0) {
                return {
                    ok: false,
                    message: `Campos requeridos faltantes: ${missingFields.join(', ')}`,
                    data: null
                };
            }

            // Enviar datos al servidor
            const result = await onSave(formData);
            return result;
        } catch (error: any) {
            return {
                ok: false,
                message: error.message || "Error al registrar",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Crear nuevo Trabajador"
            description="Ingrese los datos del nuevo Trabajador. Todos los campos son obligatorios."
            fields={TrabajadorFields}
            entityName="Trabajador"
        />
    );
};