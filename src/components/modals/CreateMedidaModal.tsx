import { ModalCreateRelationSQL } from "../common/ModalCreateRelationSQL";

/**
 * Definición de los campos del formulario
 * Todos los campos son requeridos para la creación
 */
const medidaFields = [
    { name: "ID_Trabajador", label: "ID Trabajador", required: true, type: 'select', options: [{value: "place-001", label: "Lugar 1" }] },
    { name: "ID_NodoIoT", label: "ID Nodo IoT", required: true, type: 'select' },
    { name: "ID_Lugar", label: "ID Lugar", required: true, type: 'select' },
    { name: "ID_Sensor", label: "ID Sensor", required: true, type: 'select' }
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
interface CreateMedidaModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para almacenar en la base de datos
}

/**
 * Componente modal específico para la creación
 * Encapsula toda la lógica relacionada con la creación 
 * Requiere que todos los campos estén llenos antes de permitir la creación.
 */
export const CreateMedidaModal = ({ 
    isOpen, 
    onClose, 
    onSave 
}: CreateMedidaModalProps) => {
    /**
     * Función para manejar la creación 
     * Valida y envía los datos al servidor.
     */
    const handleSave = async (formData: any): Promise<OperationResult> => {
        try {
            // Validar que todos los campos requeridos tienen valor
            const missingFields = medidaFields
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
                message: error.message || "Error al registrar Medida",
                data: null
            };
        }
    };

    return (
        <ModalCreateRelationSQL
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Crear nueva Medida"
            description="Ingrese los datos de la nueva medida. Todos los campos son obligatorios."
            fields={medidaFields}
            entityName="Medida"
        />
    );
};