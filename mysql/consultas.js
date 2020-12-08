let class_rutas = require("../models/rutas");
let class_frecuencias = require("../models/frecuencias");
var mysql = require("mysql");
var conexion = mysql.createConnection(
    {
        host:"71.6.142.111",
        port:3306,
        database:"uambatena",
        user:"root",
        password:"Vigitrack102030*"
    });




/***SQL PARA OBTENER LA RUTA Y LAS FRECUENCIAS**/
let sql_rutas_frecuencias = (callback)=>
{
    conexion.query("select  R.idRuta as idruta,R.DescRuta as ruta," +
        "R.LetrRuta as letraruta,F.LetrFrec as letrafrecuencia" +
        ",F.DescFrec " +
        "as frecuencia " +
        "from ruta as R join frecuencia as F " +
        "on R.idRuta=F.idRutaFrec where F.ActiFrec=1 and R.ActiRuta=1",(error,results,fields)=>
    {

        if(error)
        {
            callback(error,results)
        }else
            {
                /**DEFINIR ARRAYS OBJETO**/

                let i =0;
                let pos_init = 0;
                let pos_cont=0;
                let Orutas = []
                for (i=0;i<results.length;i++)
                {
                    /*console.log(`${results[i].idruta} -> ${results[i].ruta} -> ${results[i].letraruta}
                    -> ${results[i].frecuencia}`)*/
                    let Rutas = new class_rutas();
                    /*Orutas[i] = new class_rutas();
                    Orutas[i].setNameRuta(results[i].ruta);
                    Orutas[i].setLetraRuta(results[i].letraruta);
                    Orutas[i].setIdRuta(results[i].idruta);*/

                    Rutas.setNameRuta(results[i].ruta);
                    Rutas.setLetraRuta(results[i].letraruta);
                    Rutas.setIdRuta(results[i].idruta);

                    let oFrecuencias = []

                    for (let j = 0;j<results.length;j++)
                    {
                        if (Rutas.getIdRuta()===results[j].idruta)
                        {
                            var oF = new class_frecuencias();
                            oF.setIdFrecuencia(results[j].letrafrecuencia)
                            oF.setDetalleFrecuencia(results[j].frecuencia)
                            oFrecuencias.push(oF);
                            pos_init = j;
                        }
                    }

                    if(oFrecuencias.length > 0)
                    {
                        Rutas.setOFrecuecias(oFrecuencias);
                        Orutas.push(Rutas);
                        pos_cont++;
                    }
                    i = pos_init;
                    console.log(`i -> ${i}`)
                }
                callback(null,Orutas)
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
        console.log(`select M.CodiVehiMoni as vehiculo,M.PlacVehiMoni as placa,M.LetrRutaMoni as letra_ruta,
        M.UltiLatiMoni as lat,M.UltiLongMoni as lng,M.UltiRumbMoni as grados 
        from monitoreo as M where LetrRutaMoni = ${letra_ruta} and UltiFechMoni between ${date} 05:00
        and {date} 23:59 and idSali_mMoni<>0 and M.PlacVehiMoni is not null`)
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

