
import GenericEntityInterface from "../../components/GenericEntityInterface";

export default function TrabajadorInterface() {
  return (
    <>
      <GenericEntityInterface
        entity="Trabajador"
        title="Base de datos Gateways"
        description="En esta página podrá agregar Gateways, editar o eliminarlos"
      />
      <div className="space-y-1 mt-10">
        <GenericEntityInterface
            entity="Rango_Edad"
            title="Base de datos Gateways"
            description="En esta página podrá agregar Gateways, editar o eliminarlos"
          />
      </div>
      

      {/* <div className="space-y-1 mt-10">
          <DynamicTable
            tableName="Rango_Edad"
            orderBy="ID_Rango_Edad"
            orderDirection="asc"
          />
        </div> */}
    </>
    
    
  );
}