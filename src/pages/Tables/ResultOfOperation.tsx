import Alert from "../../components/ui/alert/Alert";
import ComponentCard from "../../components/common/ComponentCard";

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

function InfoField({ label, value }: { label: string; value: string | null | undefined }) {
  // Limpia el valor de espacios en blanco extras y muestra '-' si está vacío
  const displayValue = value?.toString().trim() || "-";
  
  return (
    <div className="mb-4">
      <span className="block text-sm font-medium text-black dark:text-white">
        {label}
      </span>
      <span className="mt-1 block text-sm text-body dark:text-bodydark">
        {displayValue}
      </span>
    </div>
  );
}

export default function ResultOfOperation({ result }: { result?: OperationResult }) {
  if (!result) return null;

  console.log("Mostrando resultado:", result); // Para debug
  //rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]
  return (
    <ComponentCard title="Resultado de la Operación">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Alerta de estado */}
        <div className="border-b border-stroke px-4 py-4 dark:border-strokedark">
          <Alert
            variant={result.ok ? "success" : "error"}
            title={result.ok ? "Operación exitosa" : "Error"}
            message={result.message || (result.ok ? "Operación completada" : "Error en la operación")}
          />
        </div>

        {/* Datos del Gateway */}
        {result.data && (
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Información del Gateway registrado
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Columna 1: Información Básica */}
              <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] rounded-sm border border-stroke bg-white p-4 ">
                <h4 className="mb-6 text-lg font-medium text-black dark:text-white text-xl">
                  Detalles Básicos
                </h4>
                <div className="space-y-3 dark:text-white">
                  <InfoField label="ID Gateway" value={result.data.ID_Gateway} />
                  <InfoField label="Marca" value={result.data.Marca} />
                  <InfoField label="Referencia" value={result.data.Referencia} />
                  <InfoField label="Serial" value={result.data.Serial} />
                </div>
              </div>

              {/* Columna 2: Configuración de Red */}
              <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] rounded-sm border border-stroke bg-white p-4 ">
                <h4 className="mb-6 text-lg font-medium text-black dark:text-white text-xl">
                  Configuración de Red
                </h4>
                <div className="space-y-3 dark:text-white ">
                  <InfoField label="Sistema Operativo" value={result.data.OS} />
                  <InfoField label="SSID" value={result.data.SSID} />
                  <InfoField label="MAC WiFi" value={result.data.MAC_Wifi} />
                  <InfoField label="MAC Ethernet" value={result.data.MAC_Ethernet} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ComponentCard>
  );
}
