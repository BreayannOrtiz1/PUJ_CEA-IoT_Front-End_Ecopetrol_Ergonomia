
import GenericConfigEntityInterface from "../../components/GenericConfigEntityInterface";

/**
 * Interfaz principal para la gestión .
 * Permite crear, actualizar y eliminar en la base de datos.
 */
export default function Provision_GatewaysInterface() {
  return (
    <GenericConfigEntityInterface
      entity="Config_Provision_Gateways"
      title="Configuracion Gateways"
      description="En esta agina podra agregar, actualizar o eliminar gateways"
    />
  );
}