interface Configuracion {
    Tarifas: Tarifa[];
    Nombre: string;
    UsarQR: boolean;
    AutoImprimir: boolean;
    Idioma: string;
    Tema: string;
    Moneda: string;
}

export default Configuracion