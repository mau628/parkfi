import Titulo from "./components/titulo.vue";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'es',
  messages: {
    es: {
      subtitulo: 'Servicio de estacionamiento',
      idioma: 'Idioma',
      ingreso: 'Ingreso',
      egreso: 'Egreso',
      colaborar: 'Colaborar',

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
      }
    },
    en: {
      subtitulo: 'Parking service',
      idioma: 'Language',
      ingreso: 'In',
      egreso: 'Out',
      colaborar: 'Support us',

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
      }
    }
  }
}))