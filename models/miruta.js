class Miruta
{
    id_control = ""
    letra_control ="";
    distance_start = 0;
    distance_end =0;
    constructor()
    {}

    getIdControl()
    {
        return this.id_control;
    }
    getLetraControl()
    {
        return this.letra_control;
    }
    getDistanceStart()
    {
        return this.distance_start;
    }
    getDistanceEnd()
    {
        return this.distance_end;
    }


    setIdControl(aux)
    {
        this.id_control = aux;
    }
    setLetraControl(aux)
    {
        this.letra_control = aux;
    }
    setDistanceStart(aux)
    {
        this.distance_start=aux;
    }
    setDistanceEnd(aux)
    {
        this.distance_end = aux;
    }
}
module.exports = Miruta