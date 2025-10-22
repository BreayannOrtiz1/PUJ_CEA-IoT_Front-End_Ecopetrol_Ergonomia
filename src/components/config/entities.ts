// src/components/config
export const entityConfig = {
  Sensor: {
    fields: [
      { name: "Marca", label: "<b>Marca</b> <br /> (máximo 20 carácteres)", required: true },
      { name: "Modelo", label: "<b>Modelo</b> <br /> (máximo 20 carácteres)", required: true },
      { name: "Variable", label: "<b>Variable medida</b> <br /> (máximo 20 carácteres)", required: true },
      { name: "Unidad", label: "<b>Unidad física</b> <br /> (máximo 10 carácteres)", required: true },
      { name: "ValorMaximo", label: "<b>Valor Máximo </b> <br /> (número decimal, separado por punto [2.0])", required: true },
      { name: "ValorMinimo", label: "<b>Valor Mínimo</b> <br /> (número decimal, separado por punto [2.0])", required: true },
      { name: "Resolucion", label: "<b>Resolución</b> <br /> (número decimal, separado por punto [2.0])", required: true },
      { name: "MAC", label: "<b>MAC del sensor</b> <br /> (máximo 20 carácteres)", required: true },
      { name: "Protocolo", label: "<b>Protoclo de comunicación</b> <br /> (máximo 20 carácteres)", required: true},
      { 
        name: "FechaUltimaCalibracion", 
        label: "Fecha de la última calibración realizada al sensor <br /> Ingrese valores mayores al año 1800", 
        required: false, 
        type: "date",
        placeholder: "YYYY-MM-DD"
      }
    ],
    displayName: "Sensores",
    primaryKey: "ID_Sensor"
  },
  Gateway: {
    fields: [
      { name: "Marca", label: "Marca", required: true },
      { name: "Referencia", label: "Referencia", required: true },
      { name: "Serial", label: "Serial", required: false },
      { name: "OS", label: "Sistema operativo", required: false },
      { name: "SSID", label: "Nombre de la red (SSID)", required: false },
      { name: "MAC_WiFi", label: "Dirección MAC del WiFi", required: false },
      { name: "MAC_Ethernet", label: "Dirección MAC del Ethernet", required: false }
    ],
    displayName: "Gateways",
    primaryKey: "ID_Gateway"
  },
  Lugar: {
    fields: [
      { name: "Municipio", label: "Municipio (máximo 40 carácteres)", required: true },
      { name: "Sede", label: "Sede (máximo 40 carácteres)", required: true },
      { name: "Edificio", label: "Edificio (máximo 40 carácteres)", required: true },
      { name: "Piso", label: "Piso (máximo 40 carácteres)", required: true },
      { name: "Area", label: "Area (máximo 40 carácteres)", required: true}
    ],
    displayName: "Lugares",
    primaryKey: "ID_Lugar"
  },
  NodoIoT: {
    fields: [
      { name: "MAC_Ble", label: "MAC Bluetooth (máximo 20 carácteres)", required: true },
      { name: "MAC_Wifi", label: "MAC WiFi (máximo 20 carácteres)", required: true },
      { name: "Tipo", label: "¿Que tipo de Nodo es? (máximo 20 carácteres)", required: true },
      { name: "OS", label: "Sistema operativo (máximo 20 carácteres)", required: true },
      { name: "Marca", label: "Marca o Fabricante (máximo 20 carácteres)", required: true},
      { name: "Referencia", label: "Referencia (máximo 20 carácteres)", required: true },
      { name: "Propiedad", label: "¿Aquien pertenece el activo? (máximo 50 carácteres)", required: true }
    ],
    displayName: "Nodos IoT",
    primaryKey: "ID_NodoIoT"
  }, 
  Rango_Edad: {
    fields: [
      { name: "Minimo", label: "Edad Minima", required: true },
      { name: "Maximo", label: "Edad Máxima", required: true }
    ],
    displayName: "Rango de edad",
    primaryKey: "ID_Rango_Edad"
  },
  Trabajador: {
    fields: [
      { name: "Sexo", label: "Sexo", required: true },
      { name: "ID_Rango_Edad", label: "ID del rango de edad", required: true },
      { name: "Cargo", label: "Cargo que desempeña  <br />(máximo 50 carácteres)", required: true }
    ],
    displayName: "Trabajadores",
    primaryKey: "ID_Trabajador"
  }, 
  Config_Provision_Fisiologicas: {
    fields: [
      { name: "ID_NodoIoT", label: "ID del Nodo IoT", required: true, type: 'select' as const,
      options: [{ value: "", label: "Cargando opciones..." }] },
      { name: "ID_Sensor", label: "ID del sensor", required: true, type: 'select' as const,
      options: [{ value: "", label: "Cargando opciones..." }] },
      { name: "ID_Trabajador", label: "ID del trabajador ", required: true, type: 'select' as const,
      options: [{ value: "", label: "Cargando opciones..." }] },
      { name: "ID_Config_Provision_Gateways", label: "ID del gateway provisionado", required: true, type: 'select' as const,
      options: [{ value: "", label: "Cargando opciones..." }] },
      { name: "ECG", label: "¿Desea enviar datos de electrocardiograma? <br />Ingrese 1 para verdadero y 0 para falso", required: true},
      { name: "HR_RR_RRi", label: "¿Desea enviar datos de frecuencia cardiaca, frecuencia respiratoria y tiempo entre latidos?<br />Ingrese 1 para verdadero y 0 para falso", required: true },
      { name: "ACC", label: "¿Desea enviar datos relacionados con la acceleración o movimiento?<br />Ingrese 1 para verdadero y 0 para falso", required: true },
      { name: "Activo", label: "Actualmente esta activo el sensor<br />Ingrese 1 para verdadero y 0 para falso", required: true },
      { name: "SASTOKEN", label: "SASTOKEN. No olvide verificar la duración ", required: true }
    ],
    displayName: "Provisionamiento de sensor de variables fisiologicas",
    primaryKey: "ID_Provision_Fisiologicas"
  }
} ;

export type EntityType = keyof typeof entityConfig;