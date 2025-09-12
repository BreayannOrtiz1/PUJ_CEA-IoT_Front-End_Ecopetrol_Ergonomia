import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ResultOfOperation from "../Tables/ResultOfOperation";

export default function RegisterMedida() {
  const [operationResult, setOperationResult] = useState<{
    ok?: boolean;
    message?: string;
    data?: any;
  } | undefined>(undefined);

  return (
    <div>
      <PageMeta
        title="Registro de lugares"
        description="En esta pagina podra agregar lugares, ubicaciones, sitios, etc.. relacionados con los activos"
      />
      <PageBreadcrumb pageTitle="Registro de lugares" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-10">
         <p className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Formulario para registrar un lugar
          </p>
          
         
        </div>
        <div className="space-y-6">
          <ResultOfOperation result={operationResult} />

        </div>
      </div>
    </div>
  );
}
