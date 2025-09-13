
import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Campos para actualizar un gateway
 * El ID es requerido, los demás campos son opcionales
 */
const updateGatewayFields = [
    { name: "ID_Gateway", label: "ID del Gateway", required: true },
    { name: "marca", label: "Marca", required: false },
    { name: "referencia", label: "Referencia", required: false },
    { name: "serial", label: "Serial", required: false },
    { name: "os", label: "Sistema Operativo", required: false },
    { name: "ssid", label: "SSID", required: false },
    { name: "macWifi", label: "MAC WiFi", required: false },
    { name: "macEthernet", label: "MAC Ethernet", required: false }
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
 * Props del componente UpdateGatewayModal
 */
interface UpdateGatewayModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para actualizar en la base de datos
    initialData?: any;                                   // Datos iniciales del gateway a actualizar
}

/**
 * Componente modal específico para la actualización de Gateways.
 * Maneja la lógica de actualización de forma independiente.
 */
export const UpdateGatewayModal = ({ 
    isOpen, 
    onClose, 
    onSave,
}: UpdateGatewayModalProps) => {
    
    /**
     * Valida que el formulario tenga los datos mínimos necesarios:
     * - ID del Gateway (requerido)
     * - Al menos un campo adicional para actualizar
     */
    const validateFormData = (data: any): boolean => {
        // Verificar que existe el ID
        if (!data.ID_Gateway) return false;
        if (!data.referencia) return false;

        // Verificar que al menos un campo adicional tenga valor
        const hasAtLeastOneField = updateGatewayFields
            .filter(field => field.name !== 'ID_Gateway')
            .some(field => data[field.name]?.trim() !== '');

        return hasAtLeastOneField;
    };
    
    /**
     * Función para manejar la actualización del gateway
     */
    const handleSave = async (formData: any) => {
        try {
            // Validar datos mínimos
            if (!validateFormData(formData)) {
                return {
                    ok: false,
                    message: "Se requiere el ID del Gateway que desea modificar y la referencia,  y al menos un campo para actualizar",
                    data: null
                };
            }

            // Intentar actualizar los datos
            const result = await onSave(formData);
            
            if (result.ok) {
                // Si todo sale bien, cerrar el modal después de un breve delay
                setTimeout(() => {
                    onClose();
                }, 500);
            }

            return result;
        } catch (error: any) {
            return {
                ok: false,
                message: error.message || "Error al actualizar el gateway",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Actualizar Gateway"
            description="Se requiere el ID del Gateway que desea modificar y al menos un campo para actualizar"
            fields={updateGatewayFields}
            entityName="Gateway"
        />
    );
};