const { sql_rutas_frecuencias ,sql_controles,sql_controles_all,
    sql_buses_all_ruta,sql_monitoreo_bus,sql_mi_ruta,sql_mi_ruta_ruta
    ,sql_mi_paradas} = require('../mysql/consultas.js');
let express = require("express")
let body = require("body-parser");
let cMiRuta = require("../models/miruta")
const app = express();
app.use(body.json());
app.use(body.urlencoded({ extended: false }));

app.get("/rutas",function (req,res)
{
    /**Todas las rutas y sus frecuencias**/

    sql_rutas_frecuencias((error,results)=>
    {
        if(error)
        {
            res.status(500).json(
                {
                    ok:"error",
                    error:error
                })
        }else
        {
            res.status(200).json(
                {
                    ok:"ok",
                    error:"s/n",
                    datos:results
                })
        }
    });

});
/**CONTROLES POR LA FRECUENCIA (ID)**/
app.get("/controles",function (req,res)
{
    sql_controles(req.body.id,(error,results)=>
    {
       if (error)
       {
           res.status(500).json(
               {
                   ok:"error",
                   error:error
               });
       }else
           {
               res.status(200).json(
                   {
                       ok:"ok",
                       error:"s/n",
                       datos:results
                   });
           }
    });
})
/**TODOS LOS CONTROLES**/
app.get("/controles_all",function (req,res)
{
    sql_controles_all((error,results)=>
    {
        if (error)
        {
            res.status(500).json(
                {
                    ok:"error",
                    error:error
                });
        }else
        {
            res.status(200).json(
                {
                    ok:"ok",
                    error:"s/n",
                    datos:results
                });
        }
    });
})

/**TODOS LOS BUSES (RASTREO) POR RUTA**/
app.get("/buses_all/:rutas/:date", (req,res)=>
{


    let datos =
        {
            rutas:req.params.rutas,
            date:req.params.date
        }


    console.log(`${datos.rutas} -> ${datos.date}`)

    sql_buses_all_ruta(datos.rutas,datos.date,(error,results)=>
    {
        if(error)
        {
            res.status(500).json(
                {
                    ok:"error",
                    error:error
                })
        }else
            {
                if(results.length>0)
                {
                    res.status(200).json(
                        {
                            ok:"ok",
                            error:"s/n",
                            datos:results
                        })
                }else
                    {
                        res.status(200).json(
                            {
                                ok:"vacio",
                                error:"s/n",
                                datos:results
                            })
                    }
            }
    })
})


/**TODOS LOS BUSES (RASTREO) POR RUTA (RECIBE LOS DATOS EN EL BODY ) **/
app.get("/buses_all_body",function (req,res)
{


    let datos =
        {
            rutas:req.body.rutas,
            date:req.body.date
        }


    console.log(`${datos.rutas} -> ${datos.date}`)

    sql_buses_all_ruta(datos.rutas,datos.date,(error,results)=>
    {
        if(error)
        {
            res.status(500).json(
                {
                    ok:"error",
                    error:error
                })
        }else
        {
            if(results.length>0)
            {
                res.status(200).json(
                    {
                        ok:"ok",
                        error:"s/n",
                        datos:results
                    })
            }else
            {
                res.status(200).json(
                    {
                        ok:"vacio",
                        error:"s/n",
                        datos:results
                    })
            }
        }
    })
})


/**RASTREO DE BUS**/
app.get("/rastreo",function (req,res)
{
    sql_monitoreo_bus(req.body.bus,(error,results)=>
    {
        if(error)
        {
            res.status(500).json(
                {
                    ok:"error",
                    error:error
                })
        }else
        {
            if(results.length>0)
            {
                res.status(200).json(
                    {
                        ok:"ok",
                        error:"s/n",
                        datos:results
                    })
            }else
                {
                    res.status(200).json(
                        {
                            ok:"ok",
                            error:"vacio",
                            datos:results
                        })
                }
        }
    })
})

/**RUTA CERCANA A MI INICO Y DESTINO**/
app.get("/miruta/:lat_ini/:lng_ini/:lat_fin/:lng_fin",function (req,res)
{
    let lat_ini = req.params.lat_ini;
    let lng_ini = req.params.lng_ini;
    let lat_fin = req.params.lat_fin;
    let lng_fin = req.params.lng_fin;

    /*let lat_ini = -1.2422413;
    let lng_ini = -78.6287594;
    let lat_fin = -1.252727877680087;
    let lng_fin = -78.627574778261;*/

    /**1º OBTENER LOS CONTROLES **/

    sql_mi_ruta(lat_ini,lng_ini,lat_fin,lng_fin,(error,oMisRutas)=>
    {
        if (error)
        {
            res.status(400).json(
                {
                    ok:"ok",
                    error:error,
                    data:null
                });
        }else
            {

                let oMInicio;
                let oMfin = new cMiRuta();
                let auxiliar = new cMiRuta();
                for(let i = 2; i < oMisRutas.length; i++)
                {
                    for(let j = 0;j < oMisRutas.length-i;j++)
                    {
                        if(oMisRutas[j].getDistanceStart() > oMisRutas[j+1].getDistanceStart())
                        {
                            auxiliar = oMisRutas[j];
                            oMisRutas[j] = oMisRutas[j+1];
                            oMisRutas[j+1] = auxiliar;
                        }
                    }
                }
                oMInicio = oMisRutas[0];

                oMisRutas.splice(0,1);

                for(let i = 2; i < oMisRutas.length; i++)
                {
                    for(let j = 0;j < oMisRutas.length-i;j++)
                    {
                        if(oMisRutas[j].getDistanceStart() > oMisRutas[j+1].getDistanceStart())
                        {
                            auxiliar = oMisRutas[j];
                            oMisRutas[j] = oMisRutas[j+1];
                            oMisRutas[j+1] = auxiliar;
                        }
                    }
                }



                oMfin = oMisRutas[0];

                /**CONSULTA DE RUTAS CON LOS CONTROLES**/

                sql_mi_ruta_ruta(oMInicio.getIdControl(),oMfin.getIdControl(),(error,results)=>
                {
                    if(error)
                    {
                        res.status(200).json(
                            {
                                ok:"error",
                                error:error,
                                data:null
                            })
                    }else
                        {
                            if(results.length>0)
                            {
                                res.status(200).json(
                                    {
                                        ok:"ok",
                                        error:"s/n",
                                        data:results
                                    })
                            }else
                                {
                                    res.status(200).json(
                                        {
                                            ok:"vacio",
                                            error:"s/n",
                                            data:null
                                        })
                                }
                        }
                })

                /*res.status(400).json(
                    {
                        ok:"ok",
                        error:"s/n",
                        data:
                            {
                                inicio:oMInicio.getIdControl(),
                                fin:oMfin.getIdControl()
                            }
                    });*/
            }
    });


})

app.post("/rating/:valor/:placa",function (req,res)
{

    let valor = req.params.valor;
    let placa = req.params.placa;


   /****/


    res.status(200).json(
        {
            ok:"ok",
            bus:req.body.bus,
            rating:req.body.rating
        })
})

app.get("/paradas/:id",function (req,res)
{
   let id = req.params.id;

   sql_mi_paradas(id,(error,oParadas)=>
   {
       if (error)
       {
           res.status(400).json(
               {
                   ok:"error",
                   error:error
               })
       }else
           {
               if(oParadas.length>0)
               {
                   res.status(200).json(
                       {
                           ok:"ok",
                           error:"s/n",
                           data :oParadas
                       })
               }else
                   {
                       res.status(200).json(
                           {
                               ok:"vacio",
                               error:"s/n"
                           })
                   }
           }
   });

});

module.exports = app