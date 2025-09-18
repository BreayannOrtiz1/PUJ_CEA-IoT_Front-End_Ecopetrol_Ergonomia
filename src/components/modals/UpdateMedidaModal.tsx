import { ModalCreateInTable } from "../common/ModalCreateInTable";

/**
 * Campos para actualizar un
 * El ID es requerido, los demás campos son opcionales
 */
const updateMedidaFields = [
    { name: "ID_Medida", label: "ID Medida", required: true },
    { name: "ID_Trabajador", label: "ID Trabajador", required: true },
    { name: "ID_NodoIoT", label: "ID Nodo IoT", required: true },
    { name: "ID_Lugar", label: "ID Lugar", required: true },
    { name: "ID_Sensor", label: "ID Sensor", required: true },
    { name: "Fecha_Inicio", label: "Fecha de Inicio", required: true, type: "date",  placeholder: "Formato: YYYY-MM-DD" },
    { name: "Fecha_Fin", label: "Fecha Fin", required: true, type: "date",  placeholder: "Formato: YYYY-MM-DD" }
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
interface UpdateMedidaModalProps {
    isOpen: boolean;                                      // Controla la visibilidad del modal
    onClose: () => void;                                 // Función para cerrar el modal
    onSave: (formData: any) => Promise<OperationResult>; // Callback para actualizar en la base de datos
    initialData?: any;                                   // Datos iniciales del a actualizar
}

/**
 * Componente modal específico para la actualización 
 * Requiere el ID  y al menos un campo adicional para actualizar.
 */
export const UpdateMedidaModal = ({
    isOpen,
    onClose,
    onSave,
}: UpdateMedidaModalProps) => {
    /**
     * Función para validar y enviar los datos de actualización
     */
    const handleSave = async (formData: any): Promise<OperationResult> => {
        try {
            // Validar que existe el ID
            if (!formData.ID_Medida) {
                return {
                    ok: false,
                    message: "El ID de la medida es requerido",
                    data: null
                };
            }

            // Verificar que al menos un campo adicional tenga valor
            const hasUpdates = updateMedidaFields
                .filter(field => field.name !== 'ID_Medida')
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
                message: error.message || "Error al actualizar la medida",
                data: null
            };
        }
    };

    return (
        <ModalCreateInTable
            isOpen={isOpen}
            closeModal={onClose}
            onSave={handleSave}
            title="Actualizar Medida"
            description="Ingrese el ID de la medida y los campos que desea actualizar"
            fields={updateMedidaFields}
            entityName="Medida"
        />
    );
};