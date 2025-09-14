import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { DynamicTable } from "../../components/tables/BasicTables/DynamicTable";


export default function DataSensorTable() {
    // Estado para refrescar la tabla
    const [refreshKey, setRefreshKey] = useState(0);

    // Función para refrescar la tabla
    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };
   
    return (
        <div>
            <PageMeta
                title="Base de datos GATEWAYS"
                description="En esta pagina podra agregar gateways, editar o elimarlos"
            />
            <div className="grid">
                
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        DATOS DEL SENSOR ECG
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
                <span className="text-sm text-gray-500">Ultimos 10 datos registrados</span>
                {/* Tabla de gateways */}
                <div className="space-y-1">
                    <DynamicTable
                        tableName="ECOPETROL_Main_Telemetry"
                        key={refreshKey}
                        orderBy="TimeStamp_Sensor"
                        orderDirection="desc"
                    />
                </div>
            </div>
        </div>
    );
}
