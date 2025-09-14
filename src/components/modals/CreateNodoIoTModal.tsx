import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Definición de los campos del formulario para NodoIoT
 * Todos los campos son requeridos para la creación
 */
const nodoIoTFields = [
    { name: "MAC_Ble", label: "MAC Bluetooth", required: true },
    { name: "MAC_Wifi", label: "MAC WiFi", required: true },
    { name: "Tipo", label: "Tipo", required: true },
    { name: "OS", label: "Sistema Operativo", required: true },
    { name: "Marca", label: "Marca", required: true },
    { name: "Referencia", label: "Referencia", required: true },
    { name: "Propiedad", label: "Propiedad", required: true }
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
 * Props del componente CreateNodoIoTModal
 */
interface CreateNodoIoTModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para almacenar en la base de datos
}

/**
 * Componente modal específico para la creación de NodoIoT.
 * Encapsula toda la lógica relacionada con la creación de un nodo IoT.
 * Requiere que todos los campos estén llenos antes de permitir la creación.
 */
export const CreateNodoIoTModal = ({ 
    isOpen, 
    onClose, 
    onSave 
}: CreateNodoIoTModalProps) => {
    /**
     * Función para manejar la creación del nodo IoT.
     * Valida y envía los datos al servidor.
     */
    const handleSave = async (formData: any): Promise<OperationResult> => {
        try {
            // Validar que todos los campos requeridos tienen valor
            const missingFields = nodoIoTFields
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
                message: error.message || "Error al registrar el nodo IoT",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Crear nuevo Nodo IoT"
            description="Ingrese los datos del nuevo nodo IoT. Todos los campos son obligatorios."
            fields={nodoIoTFields}
            entityName="NodoIoT"
        />
    );
};