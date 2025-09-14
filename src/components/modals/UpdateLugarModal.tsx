
import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Campos para actualizar un lugar
 * El ID es requerido, los demás campos son opcionales
 */
const updateLugarFields = [
    { name: "ID_Lugar", label: "ID del lugar", required: true },
    { name: "municipio", label: "Municipio", required: false },
    { name: "sede", label: "Sede", required: false },
    { name: "edificio", label: "Edificio", required: false },
    { name: "piso", label: "Piso", required: false },
    { name: "area", label: "Area", required: false }
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
 * Props del componente UpdateLugarModal
 */
interface UpdateLugarModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para actualizar en la base de datos
    initialData?: any;                                   // Datos iniciales del lugar a actualizar
}

/**
 * Componente modal específico para la actualización de Lugares.
 * Maneja la lógica de actualización de forma independiente.
 */
export const UpdateLugarModal = ({ 
    isOpen, 
    onClose, 
    onSave,
}: UpdateLugarModalProps) => {
    
    /**
     * Valida que el formulario tenga los datos mínimos necesarios:
     * - ID del Lugar (requerido)
     * - Al menos un campo adicional para actualizar
     */
    const validateFormData = (data: any): boolean => {
        // Verificar que existe el ID
        if (!data.ID_Lugar) return false;
        
        // Verificar que al menos un campo adicional tenga valor
        const hasAtLeastOneField = updateLugarFields
            .filter(field => field.name !== 'ID_Lugar')
            .some(field => data[field.name]?.trim() !== '');

        return hasAtLeastOneField;
    };
    
    /**
     * Función para manejar la actualización del lugar
     */
    const handleSave = async (formData: any) => {
        try {
            // Validar datos mínimos
            if (!validateFormData(formData)) {
                return {
                    ok: false,
                    message: "Se requiere el ID del Lugar que desea modificar y al menos un campo para actualizar",
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
                message: error.message || "Error al actualizar el lugar",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Actualizar Lugar"
            description="Se requiere el ID del Lugar que desea modificar y al menos un campo para actualizar"
            fields={updateLugarFields}
            entityName="Lugar"
        />
    );
};