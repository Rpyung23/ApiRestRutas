class cRutas
{
    idruta = 0
    nameruta=""
    letraRuta=""
    oFrecuencias = [];

    constructor()
    {
    }
    getIdRuta()
    {
        return this.idruta;
    }
    getNameRuta()
    {
        return this.nameruta;
    }
    getLetraRuta()
    {
        return this.letraRuta;
    }
    setIdRuta(aux)
    {
        this.idruta = aux;
    }
    setNameRuta(aux)
    {
        this.nameruta = aux;
    }
    setLetraRuta(aux)
    {
        this.letraRuta = aux;
    }

    getOFrecuencias()
    {
        return this.oFrecuencias;
    }

    setOFrecuecias(aux)
    {
        this.oFrecuencias = aux;
    }

}
module.exports = cRutas
