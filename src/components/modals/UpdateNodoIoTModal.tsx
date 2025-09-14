import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Campos para actualizar un nodo IoT
 * El ID es requerido, los demás campos son opcionales
 */
const updateNodoIoTFields = [
    { name: "ID_NodoIoT", label: "ID del Nodo IoT", required: true },
    { name: "MAC_Ble", label: "MAC Bluetooth", required: false },
    { name: "MAC_Wifi", label: "MAC WiFi", required: false },
    { name: "Tipo", label: "Tipo", required: false },
    { name: "OS", label: "Sistema Operativo", required: false },
    { name: "Marca", label: "Marca", required: false },
    { name: "Referencia", label: "Referencia", required: false },
    { name: "Propiedad", label: "Propiedad", required: false }
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
 * Props del componente UpdateNodoIoTModal
 */
interface UpdateNodoIoTModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para actualizar en la base de datos
    initialData?: any;                                   // Datos iniciales del nodo IoT a actualizar
}

/**
 * Componente modal específico para la actualización de Nodos IoT.
 * Requiere el ID del nodo y al menos un campo adicional para actualizar.
 */
export const UpdateNodoIoTModal = ({
    isOpen,
    onClose,
    onSave,
}: UpdateNodoIoTModalProps) => {
    /**
     * Función para validar y enviar los datos de actualización
     */
    const handleSave = async (formData: any): Promise<OperationResult> => {
        try {
            // Validar que existe el ID
            if (!formData.ID_NodoIoT) {
                return {
                    ok: false,
                    message: "El ID del Nodo IoT es requerido",
                    data: null
                };
            }

            // Verificar que al menos un campo adicional tenga valor
            const hasUpdates = updateNodoIoTFields
                .filter(field => field.name !== 'ID_NodoIoT')
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
                message: error.message || "Error al actualizar el nodo IoT",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Actualizar Nodo IoT"
            description="Ingrese el ID del nodo IoT y los campos que desea actualizar"
            fields={updateNodoIoTFields}
            entityName="NodoIoT"
        />
    );
};