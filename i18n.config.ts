export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'es',
  messages: {
    es: {
      subtitulo: 'Servicio de estacionamiento',
      idioma: 'Idioma',
      colaborar: 'Colaborar',
      elegir: 'Elegir...',
      verDetalle: 'Ver detalle',
      tiempo: 'Tiempo',
      subtotal: 'Subtotal',
      limpiar: 'Limpiar',
      leerQR: 'Leer QR',
      o: 'o',
      cancelar: 'Cancelar',
      ingreseCodigo: 'Ingrese el código',

      configuracion: {
        titulo: 'Configuración',
        nombre: 'Nombre',
        usarQR: 'Usar QR',
        imprimirAutomaticamente: 'Imprimir automáticamente',
        tiempoMinutos: 'Tiempo (minutos)',
        precio: 'Tarifa',
      },

      indice: {
        ingreso: {
          subtitulo1: 'Registro de ingreso de vehículos ',
          subtitulo2: ' al estacionamiento',
        },
        egreso: {
          subtitulo1: 'Registro de egreso de vehículos ',
          subtitulo2: ' del estacionamiento',
        }
      },

      egreso: {
        titulo: 'Egreso',
        subtitulo: 'Registro de egreso de vehículos del estacionamiento',
        mensaje1: 'Esacanee el código QR ',
        mensaje2: ' del ticket de ingreso o ingrese el código manualmente ',
      },

      ingreso: {
        titulo: 'Ingreso',
        subtitulo: 'Registro de ingreso de vehículos al estacionamiento',
        matricula: 'Matrícula',
        generar: 'Generar',
        imprimir: 'Imprimir',
        mensaje: 'Genere un ticket de ingreso para el vehículo. Ingrese la matrícula y presione el botón "Generar"',
      },

      errores: {
        qrInvalido: 'El código QR es inválido',
        parqueoInvalido: 'El parqueo no es válido',
        matriculaRequerida: 'La matrícula es requerida',
      }
    },
    en: {
      subtitulo: 'Parking service',
      idioma: 'Language',
      colaborar: 'Support us',
      elegir: 'Choose...',
      verDetalle: 'View detail',
      tiempo: 'Time',
      subtotal: 'Subtotal',
      limpiar: 'Clear',
      leerQR: 'Read QR',
      o: 'or',
      cancelar: 'Cancel',
      ingreseCodigo: 'Enter the code',

      configuracion: {
        titulo: 'Settings',
        nombre: 'Name',
        usarQR: 'Use QR',
        imprimirAutomaticamente: 'Auto-print',
        tiempoMinutos: 'Time (minutes)',
        precio: 'Rate',
      },

      indice: {
        ingreso: {
          subtitulo1: 'Vehicle ',
          subtitulo2: ' entry registration to the parking lot',
        },
        egreso: {
          subtitulo1: 'Vehicle ',
          subtitulo2: ' exit registration from the parking lot',
        }
      },

      egreso: {
        titulo: 'Out',
        subtitulo: 'Vehicle exit registration from the parking lot',
        mensaje1: 'Scan the QR code ',
        mensaje2: ' from the entry ticket or manually enter the code ',
      },

      ingreso: {
        titulo: 'In',
        subtitulo: 'Vehicle entry registration to the parking lot',
        matricula: 'License plate',
        generar: 'Generate',
        imprimir: 'Print',
        mensaje: 'Generate an entry ticket for the vehicle. Enter the license plate and press the "Generate" button',
      },

      errores: {
        qrInvalido: 'The QR code is invalid',
        parqueoInvalido: 'The parking is not valid',
        matriculaRequerida: 'The license plate is required',
      }
    }
  }
}))