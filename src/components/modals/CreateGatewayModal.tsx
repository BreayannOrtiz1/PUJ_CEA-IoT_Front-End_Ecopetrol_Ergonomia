
import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Definición de los campos del formulario para Gateway
 * Todos los campos son requeridos para la creación
 */
const gatewayFields = [
    { name: "marca", label: "Marca", required: true },
    { name: "referencia", label: "Referencia", required: true },
    { name: "serial", label: "Serial", required: true },
    { name: "os", label: "Sistema Operativo", required: true },
    { name: "ssid", label: "SSID", required: true },
    { name: "macWifi", label: "MAC WiFi", required: true },
    { name: "macEthernet", label: "MAC Ethernet", required: true }
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
 * Props del componente CreateGatewayModal
 */
interface CreateGatewayModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para guardar en la base de datos
}

/**
 * Componente modal específico para la creación de Gateways.
 * Encapsula toda la lógica relacionada con la creación de un gateway.
 */
export const CreateGatewayModal = ({ isOpen, onClose, onSave }: CreateGatewayModalProps) => {
    // Función para validar los datos antes de guardar
    const validateFormData = (formData: any): boolean => {
        // Verificar que todos los campos requeridos tengan valor
        return gatewayFields.every(field => 
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
                    message: "Todos los campos son requeridos para crear un gateway",
                    data: null
                };
            }

            // Intentar guardar los datos
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
                message: error.message || "Error al registrar el gateway",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Crear nuevo Gateway"
            description="Ingrese los datos del nuevo gateway que desea registrar"
            fields={gatewayFields}
            entityName="Gateway"
        />
    );
};