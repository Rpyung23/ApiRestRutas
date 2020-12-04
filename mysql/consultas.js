var mysql = require("mysql");

var conexion = mysql.createConnection(
    {
        host:"71.6.142.111",
        port:3306,
        database:"uambatena",
        user:"root",
        password:"Vigitrack102030*"
    });

conexion.connect((error)=>
{
    if(error)
    {
        return error;
    }
    console.log(`CONN -> ${conexion.threadId}`)
});


/***SQL PARA OBTENER LA RUTA Y LAS FRECUENCIAS**/
let sql_rutas_frecuencias = (callback)=>
{
    conexion.query("select  R.idRuta as idruta,R.DescRuta as ruta,R.LetrRuta as letraruta,F.DescFrec " +
        "as frecuencia " +
        "from ruta as R join frecuencia as F " +
        "on R.idRuta=F.idRutaFrec where F.ActiFrec=1 and R.ActiRuta=1",(error,results,fields)=>
    {

        /*
        if(error)
        {
            return error;
        }
        */
        /*for(let i =0;i<results.length;i++)
        {
            /*let oR = new cRutas(fields);
            oR.setRuta()
            oR.setLetraRuta()*//*
            console.log(`ID Ruta -> ${results[0].idruta}`)
            console.log(`Ruta -> ${results[1].ruta}`)
            console.log(`Letra Ruta -> ${results[2].letraruta}`)
            console.log(`FRECUENCIA -> ${results[3].frecuencia}`)
        }*/

        if(error)
        {
            callback(error,results)
        }else
            {
                callback(null,results)
            }


    });
}

/**SQL OBTENER LOS CONTROLES DE CADA FRECUENCIA (Recive la is de la fecuencia)**/
let sql_controles = (id_control,callback)=>
{
    conexion.query("select  C.DescCtrl,C.CodiCtrl,SC.CodiCtrlSecuCtrl,SC.CodiCtrlSecuCtrl,SC.idFrecSecuCtrl " +
        "from secuencia_control " +
        "as SC inner join controles as C on  C.CodiCtrl = SC.CodiCtrlSecuCtrl " +
        "and SC.idFrecSecuCtrl = '"+id_control+"'",(error,results,fields)=>
    {
        if (error)
        {
            callback(error);
        }else
            {
                callback(null,results)
            }
    });
}
/**SQL OBTENER LOS CONTROLES **/

let sql_controles_all = (callback)=>
{
    conexion.query("select C.CodiCtrl as id_control,C.DescCtrl as nombre," +
        "C.Lati1Ctrl as lat1,C.Long1Ctrl as lng1," +
        "C.Lati2Ctrl as lat2,C.Long2Ctrl lng2 " +
        "from controles as C where C.EstaCtrl = 1;",(error,results,fields)=>
    {
        if (error)
        {
            callback(error);
        }else
        {
            callback(null,results)
        }
    });
}

/**TODOS LOS BUSES POR LA RUTA**/
let sql_buses_all_ruta = (letra_ruta,date,callback)=>
{
    conexion.query("select M.CodiVehiMoni as vehiculo,M.PlacVehiMoni as placa,M.LetrRutaMoni as letra_ruta," +
        "M.UltiLatiMoni as lat,M.UltiLongMoni as lng,M.UltiRumbMoni as grados " +
        "from monitoreo as M where LetrRutaMoni = '"+letra_ruta+"' and UltiFechMoni between '"+date+" 05:00'" +
        "and '"+date+" 23:59' and idSali_mMoni<>0 and M.PlacVehiMoni is not null",(error,results)=>
    {
        if (error)
        {
            callback(error);
        }else
        {
            callback(null,results);
        }
    });
}


let sql_monitoreo_bus = (bus,callback)=>
{
    conexion.query("select M.CodiVehiMoni as vehiculo,M.PlacVehiMoni as placa,M.LetrRutaMoni as letra_ruta," +
        "M.UltiLatiMoni as lat,M.UltiLongMoni as lng,M.UltiRumbMoni as grados "+
        "from monitoreo as M where M.CodiVehiMoni = "+bus,(error,results,fields)=>
    {
        if(error)
        {
            callback(error)
        }else
            {
                callback(null,results)
            }
    })
}
module.exports = {
    sql_rutas_frecuencias,sql_controles,sql_controles_all,sql_buses_all_ruta,sql_monitoreo_bus
}

