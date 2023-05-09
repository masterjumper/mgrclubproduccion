// third-party
import { combineReducers } from 'redux';

// project import
import categorias from './categoriasSlice';
import disciplinas from './disciplinasSlice';
import tiposocios from './tiposociosSlice';
import adicionales from './adicionalesSlice';
import provincias from './provinciasSlice';
import localidades from './localidadesSlice';
import disciplinaSociosInscriptos from './disciplinaSociosInscriptosSlice'
import adicionalSociosinscriptos from './adicionalSociosInscriptosSlice'
import obrasociales from './obrasocialesSlice';
import preguntas from './preguntasSlice';
import users from './usersSlice';
import socios from './sociosSlice';
import sociotransaccion from './sociotransaccionSlice';
import sociodisciplinas from './sociodisciplinasSlice';
import socioadicionales from './socioadicionalesSlice';
import fichainscripcion from './fichainscripcionSlice';
import sociocuotas from './sociocuotaSlice';
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers(
    {   categorias, 
        disciplinas, 
        tiposocios, 
        adicionales, 
        provincias, 
        localidades, 
        disciplinaSociosInscriptos, 
        adicionalSociosinscriptos,
        obrasociales,
        preguntas, 
        users,
        socios,   
        sociotransaccion,
        sociodisciplinas,
        socioadicionales,
        fichainscripcion,
        sociocuotas,

        }
    );

export default reducers;
