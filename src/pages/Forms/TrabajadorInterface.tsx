import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { DynamicTable } from "../../components/tables/BasicTables/DynamicTable";
import { useModal } from "../../hooks/useModal";
import { useCRUD } from "../../hooks/useCRUD";
import { CreateTrabajadorModal } from "../../components/modals/CreateTrabajadorModal";
import { UpdateTrabajadorModal } from "../../components/modals/UpdateTrabajadorModal";
import { DeleteTrabajadorModal } from "../../components/modals/DeleteTrabajadorModal";

export default function TrabajadorInterface() {
  // Estado para refrescar la tabla
  const [refreshKey, setRefreshKey] = useState(0);

  // Estados independientes para cada modal
  const { isOpen: isCreateOpen, openModal: openCreateModal, closeModal: closeCreateModal } = useModal();
  const { isOpen: isUpdateOpen, openModal: openUpdateModal, closeModal: closeUpdateModal } = useModal();
  const { isOpen: isDeleteOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  // Hook para operaciones CRUD
  const { registrar_trabajador, actualizar_trabajador, eliminar_trabajador } = useCRUD();

  // Función para refrescar la tabla
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  
  /**
   * Interfaz para los datos de
   */
  interface Trabajador {
    ID_Trabajador?: number;
    Sexo?: string;
    Rango_Edad?: string;
    Cargo?: string;
  }

  /**
   * Maneja la creación de un nuevo trabajador
   */
  const handleCreate = async (formData: any) => {
    try {
      const result = await registrar_trabajador(formData);
      handleRefresh();
      return {
        ok: true,
        message: "Trabajador registrado exitosamente",
        data: result
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message || "Error al registrar el trabajador",
        data: null
      };
    }
  };

  /**
   * Maneja la actualización de un trabajador
   */
  const handleUpdate = async (formData: any) => {
    try {
      const result = await actualizar_trabajador(formData);
      handleRefresh();
      return {
        ok: true,
        message: "Trabajador actualizado exitosamente",
        data: result
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message || "Error al actualizar el trabajador",
        data: null
      };
    }
  };

  /**
   * Maneja la eliminación de un trabajador
   */
  const handleDelete = async (formData: any) => {
    try {
      if (!formData.ID_Trabajador) {
        return {
          ok: false,
          message: "Se requiere el ID del trabajador para eliminar"
        };
      }
      await eliminar_trabajador(formData);
      handleRefresh();
      return {
        ok: true,
        message: "Trabajador eliminado exitosamente"
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message || "Error al eliminar el trabajador"
      };
    }
  };
  // Estado para el NodoIoT seleccionado con tipo correcto
  const [selectedTrabajador] = useState<Trabajador | null>(null);


  return (
    <div>
      <PageMeta
        title="Base de datos Trabajadores"
        description="En esta página podrá agregar trabajadores, editarlos o eliminarlos"
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
              Crear un nuevo Trabajador
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
              Editar un Trabajador
            </button>
            <button
              onClick={openDeleteModal}
              className="m-5 mt-1 flex w-1/2 items-center justify-center gap-2 rounded-full border border-solid border-blue-500 bg-white px-4 py-3 text-sm font-medium text-red-700 shadow-theme-xs hover:bg-red-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              Eliminar un Trabajador
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            TRABAJADORES REGISTRADOS
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

        {/* Modal para crear trabajador */}
        <CreateTrabajadorModal
          isOpen={isCreateOpen}
          onClose={closeCreateModal}
          onSave={handleCreate}
        />

        {/* Modal para actualizar trabajador */}
        <UpdateTrabajadorModal
          isOpen={isUpdateOpen}
          onClose={closeUpdateModal}
          onSave={handleUpdate}
          initialData={selectedTrabajador}
        />

        {/* Modal para eliminar trabajador */}
        <DeleteTrabajadorModal
          isOpen={isDeleteOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDelete}
          TrabajadorData={selectedTrabajador ? {
              ID_Trabajador: selectedTrabajador.ID_Trabajador,
            } : undefined}
        />

        {/* Tabla de trabajadores */}
        <div className="space-y-1">
          <DynamicTable
            tableName="Trabajador"
            key={refreshKey}
            orderBy="ID_Trabajador"
            orderDirection="asc"
          />
        </div>
      </div>
    </div>
  );
}
