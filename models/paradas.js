class Paradas
{
    id_parada = 0;
    lat = 0;
    lng = 0;
    tipo = 0;

    constructor() {}
    getidParada()
    {
        return this.id_parada;
    }
    getLat()
    {
        return this.lat;
    }
    getLng()
    {
        return this.lng;
    }
    getTipo()
    {
        return this.tipo;
    }



    setidParada(aux)
    {
        this.id_parada=aux;
    }
    setLat(aux)
    {
        this.lat=aux;
    }
    setLng(aux)
    {
        this.lng=aux;
    }
    setTipo(aux)
    {
        this.tipo=aux;
    }

}

module.exports = Paradas