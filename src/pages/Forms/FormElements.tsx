import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import InputGateway from "../../components/form/form-elements/InputGateway";
import ResultOfOperation from "../Tables/ResultOfOperation";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
import InputStates from "../../components/form/form-elements/InputStates";
import InputGroup from "../../components/form/form-elements/InputGroup";
import FileInputExample from "../../components/form/form-elements/FileInputExample";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
import RadioButtons from "../../components/form/form-elements/RadioButtons";
import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
import DropzoneComponent from "../../components/form/form-elements/DropZone";

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
          
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates /> 
        </div>
        <div className="space-y-6">
          <ResultOfOperation result={operationResult} />

          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div>
      </div>
    </div>
  );
}
