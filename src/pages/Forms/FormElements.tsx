import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import InputGateway from "../../components/form/form-elements/InputGateway";
import ResultOfOperation from "../Tables/ResultOfOperation";

export default function FormElements() {
  const [operationResult, setOperationResult] = useState<{
    ok?: boolean;
    message?: string;
    data?: any;
  } | undefined>(undefined);
  return (
    <div>
      <PageMeta
        title="Registro de elementos"
        description="En esta pagina podra agregar gateways, sensores, lugares, Nodos, etc.."
      />
      {/* <PageBreadcrumb pageTitle="Registro de elementos" /> */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-10">
          <InputGateway 
            onOperationComplete={setOperationResult}/>
          {/* <DefaultInputs />*/}
          {/* <SelectInputs /> */}
          {/* <TextAreaInput /> */}
          {/* <InputStates />  */}
        </div>
        <div className="space-y-6">
          <ResultOfOperation result={operationResult} />

          {/* <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent /> */}
        </div>
      </div>
    </div>
  );
}
