
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
    type?: string;        // Tipo de campo (text, date, number, etc.)
    rows?: number;        // Número de filas para TextArea
    placeholder?: string; // Texto de ayuda para el campo
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

export function ModalCreateInTable({
    isOpen,
    closeModal,
    onSave,
    title = "Crear",
    description = "Ingrese los datos requeridos",
    fields,
    entityName
}: ModalCreateInTableProps) {
    // Estado para el formulario
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Inicializar formData con campos vacíos
    useEffect(() => {
        setError(null);
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
        setLoading(false);
    };

    // Validar campos requeridos y formato de fecha
    const validateForm = (): boolean => {
        const requiredFields = fields.filter(f => f.required);
        for (const field of requiredFields) {
            if (!formData[field.name]?.trim()) {
                setError(`El campo ${field.label} es obligatorio`);
                return false;
            }
            
            // Validación específica para campos de tipo fecha
            if (field.type === 'date') {
                const dateValue = formData[field.name];
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                
                if (!dateRegex.test(dateValue)) {
                    setError(`El campo ${field.label} debe tener el formato YYYY-MM-DD`);
                    return false;
                }
                
                // Validar que la fecha sea válida
                const date = new Date(dateValue);
                if (isNaN(date.getTime())) {
                    setError(`La fecha ingresada en ${field.label} no es válida`);
                    return false;
                }
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
            // Preparar los datos para el envío
            const processedData = { ...formData };
            fields.forEach(field => {
                if (field.type === 'date' && processedData[field.name]) {
                    // Asegurarse de que la fecha esté en formato YYYY-MM-DD
                    const date = new Date(processedData[field.name]);
                    if (!isNaN(date.getTime())) {
                        processedData[field.name] = date.toISOString().split('T')[0];
                    }
                }
            });

            const result = await onSave(processedData);
            
            if (result.ok) {
                setSuccess(result.message || `${entityName} creado exitosamente`);
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
                setError(result.message || `Error al crear ${entityName.toLowerCase()}`);
            }
        } catch (err: any) {
            setError(err.message || `Error al crear ${entityName.toLowerCase()}`);
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
                                    {field.type === 'date' ? (
                                        <input
                                            type="date"
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                            className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                                            placeholder={field.placeholder}
                                        />
                                    ) : (
                                        <TextArea
                                            value={formData[field.name] || ''}
                                            onChange={(val: string) => handleChange(field.name, val)}
                                            rows={field.rows || 1}
                                            placeholder={field.placeholder}
                                        />
                                    )}
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
                        <Button size="sm" variant="outline" onClick={closeModal} >
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


