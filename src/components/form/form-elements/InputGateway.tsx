import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import TextArea from "../input/TextArea";
import Label from "../Label";
import Button from "../../ui/button/Button";
import { useGateway } from "../../../hooks/useRegister";

/**
 * Componente de registro de Gateway.
 * - Mantiene un objeto formData con todos los campos del formulario.
 * - Cada TextArea escribe en su campo correspondiente.
 * - SOLO al oprimir el botón se hace la petición al backend.
 */
interface InputGatewayProps {
  onOperationComplete?: (result: any) => void;
}

export default function InputGateway({ onOperationComplete }: InputGatewayProps) {
  // Estado local con todos los campos del formulario
  const [formData, setFormData] = useState({
    marca: "",
    referencia: "",
    serial: "",
    os: "",
    ssid: "",
    macWifi: "",
    macEthernet: "",
  });

  // Hook que encapsula la interacción con el backend
  const { registrar_gateway, loading, error, resultado } = useGateway();

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
      console.log("Enviando datos al backend:", formData);
      const result = await registrar_gateway(formData);
      console.log("Respuesta del backend:", result);
      
      // Notificar al componente padre del resultado
      onOperationComplete?.(result);

      // Limpiar formulario tras éxito
      setFormData({
        marca: "",
        referencia: "",
        serial: "",
        os: "",
        ssid: "",
        macWifi: "",
        macEthernet: "",
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
    <ComponentCard title="Registrar Gateway">
      <div className="space-y-1">

        {/* Marca */}
        <div>
          <Label>Marca</Label>
          <TextArea
            value={formData.marca}
            onChange={(val: string) => handleChange("marca", val)}
            rows={1}
          />
        </div>

        {/* Referencia */}
        <div>
          <Label>Referencia</Label>
          <TextArea
            value={formData.referencia}
            onChange={(val: string) => handleChange("referencia", val)}
            rows={1}
          />
        </div>

        {/* Serial */}
        <div>
          <Label>Serial</Label>
          <TextArea
            value={formData.serial}
            onChange={(val: string) => handleChange("serial", val)}
            rows={1}
          />
        </div>

        {/* OS */}
        <div>
          <Label>OS</Label>
          <TextArea
            value={formData.os}
            onChange={(val: string) => handleChange("os", val)}
            rows={1}
          />
        </div>

        {/* SSID */}
        <div>
          <Label>SSID</Label>
          <TextArea
            value={formData.ssid}
            onChange={(val: string) => handleChange("ssid", val)}
            rows={1}
          />
        </div>

        {/* MAC WiFi */}
        <div>
          <Label>MAC WiFi</Label>
          <TextArea
            value={formData.macWifi}
            onChange={(val: string) => handleChange("macWifi", val)}
            rows={1}
          />
        </div>

        {/* MAC Ethernet */}
        <div>
          <Label>MAC Ethernet</Label>
          <TextArea
            value={formData.macEthernet}
            onChange={(val: string) => handleChange("macEthernet", val)}
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
          {loading ? "Registrando..." : "Registrar Gateway"}
        </Button>

        {/* Feedback básico */}
        {error && (
          <p className="text-sm text-red-600">
            
            Error al registrar: {error}
          </p>
        )}
        {resultado && (
          <p className="text-sm text-green-600">  
          {/* {typeof resultado === "string" ? resultado : JSON.stringify(resultado)} */}
            ✅ Registro exitoso
          </p>
        )}
      </div>
    </ComponentCard>
  );
}