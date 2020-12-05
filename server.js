require("./config/port.js")
let express = require("express");
let body = require("body-parser");

let rutas_frecuencias = require("./rutas-frecuencias/rutas-frecuencias");

let app = express();

/**parse application/x-www-form-urlencoded**/
app.use(body.urlencoded({extended:false}));

/**parse application/json**/
app.use(body.json())


app.use(rutas_frecuencias);


/**SERVIDOR ESCUCHANDO EN EL PUERTO**/

app.listen(process.env.PORT,()=>
{
    console.log(`Coneccion en el pueto ${process.env.PORT}`);
})