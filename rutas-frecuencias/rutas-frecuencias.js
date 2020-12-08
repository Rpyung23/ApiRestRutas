const { sql_rutas_frecuencias ,sql_controles,sql_controles_all,
    sql_buses_all_ruta,sql_monitoreo_bus} = require('../mysql/consultas.js');
let express = require("express")
let body = require("body-parser");
const app = express();
let jsonparser = body.json();
let url = body.urlencoded({ extended: false });
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
app.get("/buses_all",url,function (req,res)
{
    console.log(`ruta ->${req.body.rutas} - date ${req.body.date}`)
    sql_buses_all_ruta(req.body.rutas,req.body.date,(error,results)=>
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
app.get("/miruta",function (req,res)
{
    let lat_ini = req.body.lat_ini;
    let lng_ini = req.body.lng_ini;
    let lat_fin = req.body.lat_fin;
    let lng_fin = req.body.lng_fin;
})

app.post("/rating",function (req,res)
{
    res.status(200).json(
        {
            ok:"ok",
            bus:req.body.bus,
            rating:req.body.rating
        })
})

module.exports = app