
import { useState, useEffect } from "react";
import { Modal } from "../../components/ui/modal";
import Button from "../../components/ui/button/Button";
import TextArea from "../form/input/TextArea";
import Label from "../../components/form/Label";

// Interfaz para definir la estructura de un campo del formulario
interface FormField {
    name: string;           // Nombre del campo en el formData
    label: string;         // Etiqueta que se mostrará al usuario
    required?: boolean;    // Si el campo es obligatorio
    type?: string;        // Tipo de campo (por defecto texto)
    rows?: number;        // Número de filas para TextArea
}

// Interfaz para el resultado de la operación
interface OperationResult {
    ok: boolean;
    message: string;
    data?: any;
}

interface ModalCreateInTableProps {
    isOpen: boolean;
    closeModal: () => void;
    onSave: (formData: any) => Promise<OperationResult>;
    title?: string;
    description?: string;
    fields: FormField[];           // Lista de campos a mostrar
    entityName: string;            // Nombre de la entidad (ej: "Gateway", "Sensor")
}

export function ModalUpdateInTable({
    isOpen,
    closeModal,
    onSave,
    title = "ACTUALIZAR",
    description = "Ingrese los datos que desea actualizar",
    fields,
    entityName
}: ModalCreateInTableProps) {
    // Estado para el formulario
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Inicializar formData con campos llenos en funcion de la fila selecionada.
    useEffect(() => {
        const initialData: Record<string, string> = {};
        fields.forEach(field => {
            initialData[field.name] = '';
        });
        setFormData(initialData);
    }, [fields]);

    // Manejar cambios en los campos
    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Limpiar mensajes de error/éxito al editar
        setError(null);
        setSuccess(null);
    };

    // Validar campos requeridos
    const validateForm = (): boolean => {
        const requiredFields = fields.filter(f => f.required);
        for (const field of requiredFields) {
            if (!formData[field.name]?.trim()) {
                setError(`El campo ${field.label} es obligatorio`);
                return false;
            }
        }
        return true;
    };

    // Manejar el envío del formulario
    const handleSubmit = async () => {
        if (!validateForm()) return;
        
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await onSave(formData);
            
            if (result.ok) {
                setSuccess(result.message || `${entityName} actualizado exitosamente`);
                // Limpiar formulario
                const cleanData: Record<string, string> = {};
                fields.forEach(field => {
                    cleanData[field.name] = '';
                });
                setFormData(cleanData);
                
                // Cerrar modal después de un breve delay
                setTimeout(() => {
                    closeModal();
                    setSuccess(null);
                }, 1500);
            } else {
                setError(result.message || `Error al actualizar ${entityName.toLowerCase()}`);
            }
        } catch (err: any) {
            setError(err.message || `Error al actualizar ${entityName.toLowerCase()}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
            <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        {title}
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        {description}
                    </p>
                </div>
                <form className="flex flex-col" onSubmit={e => e.preventDefault()}>
                    <div className="px-2 overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <Label>
                                        {field.label}
                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                    </Label>
                                    <TextArea
                                        value={formData[field.name] || ''}
                                        onChange={(val: string) => handleChange(field.name, val)}
                                        rows={field.rows || 1}
                                    />
                                </div>
                            ))}
                        </div>
                        
                        {/* Mensajes de error/éxito */}
                        {error && (
                            <div className="mt-4 p-3 rounded bg-red-100 text-red-700">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mt-4 p-3 rounded bg-green-100 text-green-700">
                                {success}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="outline" onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button 
                            size="sm" 
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}


