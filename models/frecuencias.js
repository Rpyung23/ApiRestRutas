class cFrecuencias
    {
        id_frecuencia = 0
        detalle_frecuencia =""
        constructor() {
        }
        getIdFrecuencia()
        {
            return this.id_frecuencia;
        }
        getDetalleFrecuencia()
        {
            return this.detalle_frecuencia;
        }
        setIdFrecuencia(aux)
        {
            this.id_frecuencia = aux;
        }
        setDetalleFrecuencia(aux)
        {
            this.detalle_frecuencia = aux;
        }
    }

    module.exports = cFrecuencias
