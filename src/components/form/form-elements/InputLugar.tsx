import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";
import Button from "../../ui/button/Button";
import { useGateway } from "../../../hooks/useRegister";

/**
 * Componente de registro de lugar.
 * - Mantiene un objeto formData con todos los campos del formulario.
 * - Cada TextArea escribe en su campo correspondiente.
 * - SOLO al oprimir el botón se hace la petición al backend.
 */
interface InputGatewayProps {
  onOperationComplete?: (result: any) => void;
}

export default function InputLugar({ onOperationComplete }: InputGatewayProps) {
  // Estado local con todos los campos del formulario
  const [formData, setFormData] = useState({
    municipio: "",
    sede: "",
    edificio: "",
    piso: "",
    area: "",
  });

  // Hook que encapsula la interacción con el backend
  const { registrar_lugar, loading, error, resultado } = useGateway();

//   /**
//    * Actualiza un campo específico del formData.
//    * @param field Nombre del campo (clave en formData)
//    * @param value Nuevo valor
//    */
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Envía el objeto formData al backend.
   * Solo se ejecuta cuando el usuario hace clic en "Registrar Gateway".
   */
  const handleSubmit = async () => {
    try {
      console.log("Enviando datos del gateway:", formData);
      const result = await registrar_lugar(formData);
      
      // Notificar al componente padre del resultado
      onOperationComplete?.(resultado || {
        ok: true,
        message: "Gateway registrado exitosamente",
        data: result
      });

      // Limpiar formulario tras éxito
      setFormData({
        municipio: "",
        sede: "",
        edificio: "",
        piso: "",
        area: "",
      });
    } catch (err) {
      // Notificar al componente padre del error
      onOperationComplete?.({
        ok: false,
        message: error || "Error al registrar el gateway",
        data: null
      });
    }
  };

  return (
    <ComponentCard title="Registrar Lugar">
      <div className="space-y-1">
        <div>
          <Label>Municipio</Label>
          <TextArea
            value={formData.municipio}
            onChange={(val: string) => handleChange("municipio", val)}
            rows={1}
          />
        </div>

        <div>
          <Label>Sede</Label>
          <TextArea
            value={formData.sede}
            onChange={(val: string) => handleChange("sede", val)}
            rows={1}
          />
        </div>

       
        <div>
          <Label>Edificio</Label>
          <TextArea
            value={formData.edificio}
            onChange={(val: string) => handleChange("edificio", val)}
            rows={1}
          />
        </div>

        
        <div>
          <Label>Piso</Label>
          <TextArea
            value={formData.piso}
            onChange={(val: string) => handleChange("piso", val)}
            rows={1}
          />
        </div>


        <div>
          <Label>Area</Label>
          <TextArea
            value={formData.area}
            onChange={(val: string) => handleChange("area", val)}
            rows={1}
          />
        </div>

         {/* Acción: SOLO aquí se invoca el backend */}
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2"
        >
          {loading ? "Registrando..." : "Registrar Lugar"}
        </Button>

        {/* Feedback básico */}
        {error && (
          <p className="text-sm text-red-600">
            
            Error al registrar: {error}
          </p>
        )}
        {resultado && (
          <p className="text-sm text-green-600">
            ✅ Registro exitoso: {typeof resultado === "string" ? resultado : JSON.stringify(resultado)}
          </p>
        )}
      </div>
    </ComponentCard>
  );
}