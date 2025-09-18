// Interfaz base para respuestas de la API
export interface ApiResponse<T = unknown> {
    ok: boolean;
    message: string;
    data?: T;
}

// Interfaz base para datos de formulario
export interface BaseFormData {
    [key: string]: string | number | boolean | undefined;
}

// Interfaces para cada entidad
export interface Gateway extends BaseFormData {
    ID_Gateway?: number;
    Nombre: string;
    Descripcion: string;
    MAC: string;
    Topico: string;
}

export interface Lugar extends BaseFormData {
    ID_Lugar?: number;
    Nombre: string;
    Descripcion: string;
}

export interface Sensor extends BaseFormData {
    ID_Sensor?: number;
    Marca: string;
    Modelo: string;
    Variable: string;
    Unidad: string;
    ValorMaximo: string;
    ValorMinimo: string;
    Resolucion: string;
    MAC: string;
    FechaUltimaCalibracion: string;
}

export interface Trabajador extends BaseFormData {
    ID_Trabajador?: number;
    Sexo: string;
    Rango_Edad: string;
    Cargo: string;
}

export interface NodoIoT extends BaseFormData {
    ID_NodoIoT?: number;
    Nombre: string;
    Descripcion: string;
    MAC: string;
}

export interface RangoEdad extends BaseFormData {
    ID_RangoEdad?: number;
    RangoEdad: string;
    Descripcion: string;
}

// Interfaces para props comunes de modales
export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface CreateModalProps<T> extends BaseModalProps {
    onSave: (formData: T) => Promise<ApiResponse>;
}

export interface UpdateModalProps<T> extends BaseModalProps {
    onSave: (formData: T) => Promise<ApiResponse>;
    initialData?: T;
}

export interface DeleteModalProps<T> extends BaseModalProps {
    onConfirm: (data: T) => Promise<ApiResponse>;
    entityData?: T;
}

// Interfaz para opciones de selección
export interface SelectOption {
    value: string;
    label: string;
}

// Interfaz para campos de formulario
export interface FormField {
    name: string;
    label: string;
    required?: boolean;
    type?: string;
    rows?: number;
    placeholder?: string;
    options?: SelectOption[];
    loadOptions?: () => Promise<SelectOption[]>;
}

// Tipo para ordenamiento
export type OrderDirection = 'asc' | 'desc';

// Interfaz para configuración de tabla
export interface TableConfig {
    tableName: string;
    orderBy?: string;
    orderDirection?: OrderDirection;
}

// Tipo para resultado de operaciones
export type OperationResult = ApiResponse;
