import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Campos para actualizar un nodo IoT
 * El ID es requerido, los demás campos son opcionales
 */
const updateRangoEdadFields = [
    { name: "RangoEdad", label: "Rango Edad", required: true },
    { name: "Minimo", label: "Edad Mínima", required: false },
    { name: "Maximo", label: "Edad Máxima", required: false }
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
interface UpdateRangoEdadModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para actualizar en la base de datos
    initialData?: any;                                   // Datos iniciales del nodo IoT a actualizar
}

/**
 * Componente modal específico para la actualización de Nodos IoT.
 * Requiere el ID del nodo y al menos un campo adicional para actualizar.
 */
export const UpdateRangoEdadModal = ({
    isOpen,
    onClose,
    onSave,
}: UpdateRangoEdadModalProps) => {
    /**
     * Función para validar y enviar los datos de actualización
     */
    const handleSave = async (formData: any): Promise<OperationResult> => {
        try {
            // Validar que existe el ID
            if (!formData.RangoEdad) {
                return {
                    ok: false,
                    message: "El Rango edad es requerido",
                    data: null
                };
            }

            // Verificar que al menos un campo adicional tenga valor
            const hasUpdates = updateRangoEdadFields
                .filter(field => field.name !== 'RangoEdad')
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
            description="Ingrese el rango de edad y los campos que desea actualizar"
            fields={updateRangoEdadFields}
            entityName="Rango_Edad"
        />
    );
};