import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Definición de los campos del formulario para 
 * Todos los campos son requeridos para la creación
 */
const rangoEdadFields = [
    { name: "Minimo", label: "Edad Minima", required: true },
    { name: "Maximo", label: "Edad Maxima", required: true }
    
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
 * Props del componente 
 */
interface CreateRangoEdadModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para almacenar en la base de datos
}

/**
 * Componente modal específico para la creación de 
 * Encapsula toda la lógica relacionada con la creación de un nodo IoT.
 * Requiere que todos los campos estén llenos antes de permitir la creación.
 */
export const CreateRangoEdadModal = ({ 
    isOpen, 
    onClose, 
    onSave 
}: CreateRangoEdadModalProps) => {
    /**
     * Función para manejar la creación del nodo IoT.
     * Valida y envía los datos al servidor.
     */
    const handleSave = async (formData: any): Promise<OperationResult> => {
        try {
            // Validar que todos los campos requeridos tienen valor
            const missingFields = rangoEdadFields
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
                message: error.message || "Error al registrar el Rango edad",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Crear nuevo Rango de edad"
            description="Ingrese los datos del rango de edad. Todos los campos son obligatorios."
            fields={rangoEdadFields}
            entityName="Rango_Edad"
        />
    );
};