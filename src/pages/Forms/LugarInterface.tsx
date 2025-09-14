import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { DynamicTable } from "../../components/tables/BasicTables/DynamicTable";
import { useModal } from "../../hooks/useModal";
import { useCRUD } from "../../hooks/useCRUD";
import { CreateLugarModal } from "../../components/modals/CreateLugarModal";
import { UpdateLugarModal } from "../../components/modals/UpdateLugarModal";
import { DeleteLugarModal } from "../../components/modals/DeleteLugarModal";


export default function LugarInterface() {
    // Estado para refrescar la tabla
    const [refreshKey, setRefreshKey] = useState(0);

    // Estados independientes para cada modal
    const { isOpen: isCreateOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
    const { isOpen: isUpdateOpen, openModal: openUpdateModal, closeModal: closeUpdateModal } = useModal();
    const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();
    

    // Hook para operaciones CRUD
    const { 
        registrar_lugar, 
        actualizar_lugar, 
        eliminar_lugar 
    } = useCRUD();

    // Función para refrescar la tabla
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };
    /**
     * Interfaz para los datos de Lugar
     */
    interface Lugar {
        ID_Lugar?: number;
        municipio?: string;
        sede: string;
        edificio?: string;
        piso?: string;
        area?: string;
    }
    /**
     * Maneja la creación de un nuevo lugar.
     * Esta función se pasa como callback al modal de creación.
     * Implementa el patrón Lifting State Up manteniendo la lógica de negocio en el componente padre.
     * 
     * @param formData - Datos del formulario para crear el lugar
     * @returns Objeto con el resultado de la operación
     */
    const handleCreate = async (formData: any) => {
        try {
            const result = await registrar_lugar(formData);
            handleRefresh(); // Actualizar la tabla después del éxito
            return {
                ok: true,
                message: "Lugar registrado exitosamente",
                data: result
            };
        } catch (error: any) {
            return {
                ok: false,
                message: error.message || "Error al registrar el lugar",
                data: null
            };
        }
    };

    /**
     * Maneja la actualización de un lugar existente.
     * Callback para el modal de actualización.
     * 
     * @param formData - Datos actualizados del lugar
     * @returns Objeto con el resultado de la operación
     */
    const handleUpdate = async (formData: any) => {
        try {
            const result = await actualizar_lugar(formData);
            handleRefresh(); // Actualizar la tabla después del éxito
            return {
                ok: true,
                message: "Lugar actualizado exitosamente",
                data: result
            };
        } catch (error: any) {
            return {
                ok: false,
                message: error.message || "Error al actualizar el lugar",
                data: null
            };
        }
    };

    /**
     * Maneja la eliminación de un lugar.
     * Callback para el modal de eliminación.
     * 
     * @param formData - Datos del lugar a eliminar (ID requerido)
     */
    const handleDelete = async (formData: any) => {
        try {
            // Validar que el ID existe
            if (!formData.ID_Lugar) {
                return {
                    ok: false,
                    message: "Se requiere el ID del lugar para eliminar"
                };
            }
            console.log("Inside handleDelete, ID_Lugar:", formData.ID_Lugar);
            await eliminar_lugar(formData);
            handleRefresh();
            return {
                ok: true,
                message: "Lugar eliminado exitosamente"
            };
        } catch (error: any) {
            return {
                ok: false,
                message: error.message || "Error al eliminar el lugar"
            };
        }
    };

    // Estado para el lugar seleccionado con tipo correcto
    const [selectedLugar] = useState<Lugar | null>(null);

    return (
        <div>
            <PageMeta
                title="Base de datos Lugares"
                description="En esta pagina podra agregar lugares, editar o elimarlos"
            />
            <div className="grid">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <button
                            onClick={openCreateModal}
                            className="m-5 mt-1 flex w-1/2 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                        >
                            <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                                    fill=""
                                />
                            </svg>
                            Crear un nuevo Lugar
                        </button>
                        <button
                            onClick={openUpdateModal}
                            className="m-5 mt-1 flex w-1/2 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                        >
                            <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                                    fill=""
                                />
                            </svg>
                            Editar un Lugar
                        </button>
                        <button
                            onClick={openDeleteModal}
                            className="m-5 mt-1 flex w-1/2 items-center justify-center gap-2 rounded-full border border-solid border-blue-500 bg-white px-4 py-3 text-sm font-medium text-red-700 shadow-theme-xs hover:bg-red-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                        >
                            Eliminar un Lugar
                        </button>

                    </div>
                </div>
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        LUGARES REGISTRADOS
                    </h3>
                    <button
                        onClick={handleRefresh}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Actualizar
                    </button>
                </div>
                {/* Modal para crear lugar - Implementación de Lifting State Up */}
                <CreateLugarModal
                    isOpen={isCreateOpen}
                    onClose={closeCreateModal}
                    onSave={handleCreate}  // Función para manejar la creación del lugar
                />

                {/* Modal para actualizar lugar - Implementación de Lifting State Up */}
                <UpdateLugarModal
                    isOpen={isUpdateOpen}
                    onClose={closeUpdateModal}
                    onSave={handleUpdate}  // Función para manejar la actualización del lugar
                    initialData={selectedLugar}  // Datos iniciales del lugar seleccionado
                />

                {/* Modal para eliminar lugar - Implementación de Lifting State Up */}
                <DeleteLugarModal
                    isOpen={isDeleteOpen}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}  // Función para manejar la eliminación del lugar
                    lugarData={selectedLugar ? {
                        ID_Lugar: selectedLugar.ID_Lugar,
                    } : undefined}
                />

                {/* Tabla de lugares */}
                <div className="space-y-1">
                    <DynamicTable
                        tableName="Lugar"   // Nombre de la tabla en mayusculas
                        key={refreshKey}
                        orderBy="ID_Lugar"
                        orderDirection="asc"
                    />
                </div>
            </div>
        </div>
    );
}
