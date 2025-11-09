
import GenericConfigEntityInterface from "../../components/GenericConfigEntityInterface";

/**
 * Interfaz principal para la gestión .
 * Permite crear, actualizar y eliminar en la base de datos.
 */
export default function Provision_AmbientalesInterface() {
  return (
    <GenericConfigEntityInterface
      entity="Config_Provision_Ambiental"
      title="Configuracion sensores ambientales"
      description="En esta agina podra agregar, actualizar o eliminar los sensores ambientales"
    />
  );
}