import Alert from "../../components/ui/alert/Alert";

interface GatewayData {
  ID_Gateway: string;
  Marca: string;
  Referencia: string;
  Serial: string;
  OS: string;
  SSID: string;
  MAC_Wifi: string;
  MAC_Ethernet: string | null;
}

interface OperationResult {
  ok?: boolean;
  message?: string;
  data?: GatewayData;
}

function InfoField({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="mb-4 flex flex-col">
      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
        {label}
      </span>
      <span className="mt-1 text-base text-gray-900 dark:text-white">
        {value?.trim() || "-"}
      </span>
    </div>
  );
}

export default function ResultOfOperation({ result }: { result?: OperationResult }) {
  if (!result) return null;
  //rounded-sm border border-stroke bg-tr px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <Alert
        variant={result.ok ? "success" : "error"}
        title={result.ok ? "Operación exitosa" : "Error"}
        message={result.message || (result.ok ? "Operación completada" : "Error en la operación")}
      />
    <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
      {result.data && (
        <div className="mt-4">
          <h4 className="mb-4 text-xl font-semibold text-black dark:text-white">
            Información del Gateway registrado
          </h4>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
            <div className="rounded-sm border border-gray-200 bg-white p-4 shadow-default dark:border-gray-800 dark:bg-white/[0.03]">
              <h5 className="mb-3 text-lg font-medium text-black dark:text-white">
                Detalles Básicos
              </h5>
              <InfoField label="ID Gateway" value={result.data.ID_Gateway} />
              <InfoField label="Marca" value={result.data.Marca} />
              <InfoField label="Referencia" value={result.data.Referencia} />
              <InfoField label="Serial" value={result.data.Serial} />
            </div>
            
            <div className="rounded-sm border border-gray-200 bg-white p-4 shadow-default dark:border-gray-800 dark:bg-white/[0.03]">
              <h5 className="mb-3 text-lg font-medium text-black dark:text-white">
                Configuración de Red
              </h5>
              <InfoField label="Sistema Operativo" value={result.data.OS} />
              <InfoField label="SSID" value={result.data.SSID} />
              <InfoField label="MAC WiFi" value={result.data.MAC_Wifi} />
              <InfoField label="MAC Ethernet" value={result.data.MAC_Ethernet} />
            </div>
          </div>
        </div>
      )}
      
      </div>
    </div>
  );
}
