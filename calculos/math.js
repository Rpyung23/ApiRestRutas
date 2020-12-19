const cParada = require("../models/paradas");


let ordenamiento = (oParadas)=>
{
    for(let i = 2; i < oParadas.length; i++)
    {
        for(let j = 0;j < oParadas.length-i;j++)
        {
            if(oParadas[j].getDistance() > oParadas[j+1].getDistance())
            {
                auxiliar = oParadas[j];
                oParadas[j] = oParadas[j+1];
                oParadas[j+1] = auxiliar;
            }
        }
    }

    return oParadas[0];
}

let distance = (lat1,lng1,lat2,lng2)=>
{
    rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lng2 - lng1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1))
        * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = (R * c);
    return d.toFixed(3); //Retorna tres decimales
}

let paradas = (lat,lng,tipo,oParadas)=>
{
    let contS = 0;
    let oParadasT = [];
    for(let i=0;i<oParadas.length;i++)
    {
        oParadas[i].setDistance(distance(lat,lng,oParadas[i].getLat()
            ,oParadas[i].getLng()));

        if (tipo===oParadas[i].getTipo())/**subida**/
        {
            oParadasT[contS] = oParadas[i];
            contS++;
        }
    }

    let oP = ordenamiento(oParadasT);

    return oP;
}

module.exports = {paradas}