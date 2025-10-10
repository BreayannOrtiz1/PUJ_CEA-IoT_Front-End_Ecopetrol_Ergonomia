// components/GenericEntityInterface.tsx
import { useState } from "react";
import PageMeta from "../components/common/PageMeta";
import { DynamicTable } from "../components/tables/BasicTables/DynamicTable";
import { useModal } from "../hooks/useModal";
import { useGenericCRUD } from "../hooks/useGenericCRUD";
import { GenericCREATEModal } from "../components/modals/GenericCREATEModal";
import { GenericUPDATEModal } from "../components/modals/GenericUPDATEModal";
import { GenericDELETEModal } from "../components/modals/GenericDELETEModal";
import { entityConfig, EntityType } from "../components/config/entities";
import { ApiResponse } from '../types/common';

interface GenericEntityInterfaceProps {
  entity: EntityType;
  title: string;
  description: string;
}

export default function GenericEntityInterface({ 
  entity, 
  title, 
  description 
}: GenericEntityInterfaceProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentAction, setCurrentAction] = useState<'create' | 'update' | 'delete'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const { create, update, remove } = useGenericCRUD(entity);
  const config = entityConfig[entity];

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenModal = (action: 'create' | 'update' | 'delete', item?: any) => {
    setCurrentAction(action);
    setSelectedItem(item || null);
    openModal();
  };

  const handleSave = async (formData: any) : Promise<ApiResponse> => {
    try {
      let result;
      switch (currentAction) {
        case 'create':
          result = await create(formData);
          break;
        case 'update':
          // Use the ID provided by the user directly from the form
          result = await update({ ...formData, ID: Number(formData.ID) });
          break;
        case 'delete':
          result = await remove(Number(formData.ID));
          break;
        default:
          throw new Error('Acción no válida');
      }

      if (result.ok) {
        handleRefresh();
      }

      return result;
    } catch (error: any) {
      return {
        ok: false,
        message: error.message || 'Error desconocido',
        data: null
      };
    }
  };

  // Render the appropriate modal based on the current action
  const renderModal = () => {
    switch (currentAction) {
      case 'create':
        return (
          <GenericCREATEModal
            isOpen={isOpen}
            onClose={closeModal}
            onSave={handleSave}
            entityName={config.displayName}
            fields={config.fields}
          />
        );
      case 'update':
        return (
          <GenericUPDATEModal
            isOpen={isOpen}
            onClose={closeModal}
            onSave={handleSave}
            entityName={config.displayName}
            fields={config.fields}
            initialData={selectedItem}
          />
        );
      case 'delete':
        return (
          <GenericDELETEModal
            isOpen={isOpen}
            onClose={closeModal}
            onSave={handleSave}
            entityName={config.displayName}
            initialData={selectedItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <PageMeta title={title} description={description} />
      <div className="grid">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <button
              onClick={() => handleOpenModal('create')}
              className="m-5 mt-1 flex w-1/2 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"/>
              </svg>
              Crear {config.displayName}
            </button>
            <button
              onClick={() => handleOpenModal('update')}
              className="m-5 mt-1 flex w-1/2 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              Editar {config.displayName}
            </button>
            <button
              onClick={() => handleOpenModal('delete')}
              className="m-5 mt-1 flex w-1/2 items-center justify-center gap-2 rounded-full border border-solid border-red-500 bg-white px-4 py-3 text-sm font-medium text-red-700 shadow-theme-xs hover:bg-red-50 lg:inline-flex lg:w-auto"
            >
              Eliminar {config.displayName}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {config.displayName.toUpperCase()} Registrados
          </h3>
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Actualizar Tabla
          </button>
        </div>

        {/* Render the appropriate modal based on current action */}
        {renderModal()}

        <div className="space-y-1">
          <DynamicTable
            tableName={entity}
            key={refreshKey}
            orderBy={config.primaryKey}
            orderDirection="asc"
          />
        </div>
      </div>
    </div>
  );
}