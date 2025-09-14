
import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Definición de los campos del formulario para Lugar
 * Todos los campos son requeridos para la creación
 */
const lugarFields = [
    { name: "municipio", label: "Municipio", required: true },
    { name: "sede", label: "Sede", required: true },
    { name: "edificio", label: "Edificio", required: true },
    { name: "piso", label: "Piso", required: true },
    { name: "area", label: "Area", required: true }
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
 * Props del componente CreateLugarwayModal
 */
interface CreateLugarModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para guardar en la base de datos
}

/**
 * Componente modal específico para la creación de Lugares.
 * Encapsula toda la lógica relacionada con la creación de un lugar.
 */
export const CreateLugarModal = ({ isOpen, onClose, onSave }: CreateLugarModalProps) => {
    // Función para validar los datos antes de guardar
    const validateFormData = (formData: any): boolean => {
        // Verificar que todos los campos requeridos tengan valor
        return lugarFields.every(field => 
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
                    message: "Todos los campos son requeridos para crear un lugar",
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
                message: error.message || "Error al registrar el lugar",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Crear nuevo Lugar"
            description="Ingrese los datos del nuevo lugar que desea registrar"
            fields={lugarFields}
            entityName="Lugar"
        />
    );
};