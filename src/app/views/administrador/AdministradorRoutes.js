import React, { lazy } from 'react'
//import Loadable from '../../components/Loadable/Loadable'
import Loadable from '../../components/Loadable';
//import { authRoles } from '../../auth/authRoles'
import { authRoles } from '../../auth/authRoles'

const AppTableCategoria = Loadable(lazy(() => import("./categoria/tables/AppTableCategoria")));
const InsertFormCategoria = Loadable(lazy(() => import("./categoria/forms/AppFormCategoria")));
const UpdateFormCategoria = Loadable(lazy(() => import("./categoria/forms/AppFormUpdateCategoria")));

const AppTableProvincia = Loadable(lazy(() => import("./provincia/tables/AppTableProvincia")));
const InsertFormProvincia = Loadable(lazy(() => import("./provincia/forms/AppFormProvincia")));
const UpdateFormProvincia = Loadable(lazy(() => import("./provincia/forms/AppFormUpdateProvincia")));

const AppTableLocalidad = Loadable(lazy(() => import("./localidad/tables/AppTableLocalidad")));
const InsertFormLocalidad = Loadable(lazy(() => import("./localidad/forms/AppFormLocalidad")));
const UpdateFormLocalidad = Loadable(lazy(() => import("./localidad/forms/AppFormUpdateLocalidad")));

const AppTableTipoSocio = Loadable(lazy(() => import("./tiposocio/tables/AppTableTipoSocio")));
const InsertFormTipoSocio = Loadable(lazy(() => import("./tiposocio/forms/AppFormTipoSocio")));
const UpdateFormTipoSocio = Loadable(lazy(() => import("./tiposocio/forms/AppFormUpdateTipoSocio")));


const AppTableDisciplina = Loadable(lazy(() => import("./disciplina/tables/AppTableDisciplina")));
const InsertFormDisciplina = Loadable(lazy(() => import("./disciplina/forms/AppFormDisciplina")));
const UpdateFormDisciplina = Loadable(lazy(() => import("./disciplina/forms/AppFormUpdateDisciplina")));

const AppTableAdicional = Loadable(lazy(() => import("./adicional/tables/AppTableAdicional")));
const InsertFormAdicional = Loadable(lazy(() => import("./adicional/forms/AppFormAdicional")));
const UpdateFormAdicional = Loadable(lazy(() => import("./adicional/forms/AppFormUpdateAdicional")));

const AppTableSocio = Loadable(lazy(() => import("./socio/tables/AppTableSocio")));
const InsertFormSocio = Loadable(lazy(() => import("./socio/forms/AppFormSocio")));
const UpdateFormSocio = Loadable(lazy(() => import("./socio/forms/AppFormUpdateSocio")));


const AppTableSocioDisciplina = Loadable(lazy(() => import("./sociodisciplina/tables/AppTableSocioDisciplina")));

const InsertFormSocioDisciplina = Loadable(lazy(() => import("./sociodisciplina/forms/AppFormSocioDisciplina")));

const AppTableSocioAdicional = Loadable(lazy(() => import("./socioadicional/tables/AppTableSocioAdicional")));
const InsertFormSocioAdicional = Loadable(lazy(() => import("./socioadicional/forms/AppFormSocioAdicional")));


const AppTableSocioTransaccion = Loadable(lazy(() => import("./sociotransaccion/tables/AppTableSocioTransaccion")));

const AppFormSocioAbono = Loadable(lazy(() => import("./socioabono/forms/AppFormSocioAbono")));
/*
const AppFormSocioCuotas = Loadable(lazy(() => import("./sociocuotas/forms/AppFormSocioCuotas")));

const AppFormSocioCuotasImprmir = Loadable(lazy(() => import("./sociocuotas/forms/AppFormSocioCuotasImprimir")));
*/

const AppFormSeleccionCuotasGenerar = Loadable(lazy(() => import("./sociocuotas/forms/AppFormSeleccionCuotasGenerar")));

const AppFormSeleccionCuotasImprimir = Loadable(lazy(() => import("./sociocuotas/forms/AppFormSeleccionCuotasImprimir")));

const AppFormSocioCuotasPagar = Loadable(lazy(() => import("./sociocuotas/forms/AppFormSocioCuotasPagar")));
/*
const AppTableDisciplinasSociosInscriptos = Loadable(lazy(() => import("./disciplinasociosinscriptos/tables/AppTableDisciplinasSociosInscriptos")));

const AppTableSociosMorosos = Loadable(lazy(() => import("./reportes/tables/AppTableSociosMorosos")));

const AppTableSociosActivos = Loadable(lazy(() => import("./reportes/tables/AppTableSociosActivos")));

const AppTableSociosCambioCategoria = Loadable(lazy(() => import("./reportes/tables/AppTableSociosCambioCategoria")));
*/

const AppTableDisciplinasSocios = Loadable(lazy(() => import("./reportes/tables/AppTableDisciplinasSocios")));
/*
const AppTableAdicionalesSociosInscriptos = Loadable(lazy(() => import("./adicionalsociosinscriptos/tables/AppTableAdicionalesSociosInscriptos")));
*/
const AppFormSocioCarnetImprmir = Loadable(lazy(() => import("./sociocarnet/forms/AppFormSocioCarnetImprimir")));

/* TODO PARA FICHAS INSCRIPCION*/

 const AppTableObraSocial = Loadable(lazy(() => import("./obrasocial/tables/AppTableObraSocial")));
const InsertFormObraSocial = Loadable(lazy(() => import("./obrasocial/forms/AppFormObraSocial")));
const UpdateFormObraSocial = Loadable(lazy(() => import("./obrasocial/forms/AppFormUpdateObraSocial")));

const AppTablePregunta = Loadable(lazy(() => import("./pregunta/tables/AppTablePregunta")));
const InsertFormPregunta = Loadable(lazy(() => import("./pregunta/forms/AppFormPregunta")));
const UpdateFormPregunta = Loadable(lazy(() => import("./pregunta/forms/AppFormUpdatePregunta")));

const AppTableFichaInscripcion = Loadable(lazy(() => import("./fichainscripcion/tables/AppTableFichaInscripcion")));
const InsertFormFichaInscripcion = Loadable(lazy(() => import("./fichainscripcion/forms/AppFormFichaInscripcion")));
/*
const AppTableSocioMutual = Loadable(lazy(() => import("./sociomutual/tables/AppTableSocioMutual")));
*/
const AppTableUsers = Loadable(lazy(() => import("./users/tables/AppTableUsers")));
const AppFormUsers = Loadable(lazy(() => import("./users/forms/AppFormUsers")));
const AppFormUpdateUsers = Loadable(lazy(() => import("./users/forms/AppFormUpdateUsers")));
//const AppFormUpdateUsersPass= Loadable(lazy(() => import("./users/forms/AppFormUpdateUsersPass"))); */
const AppFormSeleccionCuotaReImprimir = Loadable(lazy(()=>import("./sociocuotas/forms/AppFormSeleccionCuotaReImprimir")))

const AppFormSeleccionCuotaGenerarIndividual = Loadable(lazy(()=>import("./sociocuotas/forms/AppFormSeleccionCuotaGenerarIndividual")))

const administradorRoutes = [
    {
        path: '/administrador/default',
        element: {/* <Analytics />, */},
        auth: authRoles.admin,
    }, 
    {
        path: '/categoria/',
        element: <AppTableCategoria />,
        auth: authRoles.admin,
    },
    {
        path: '/categoria/i',
        element: <InsertFormCategoria />,
        auth: authRoles.admin,
    },
    {
        path: '/categoria/u',
        element: <UpdateFormCategoria />,
        auth: authRoles.admin,
    },
    {
        path: '/provincia/',
        element: <AppTableProvincia />,
        auth: authRoles.admin,
    },
    {
        path: '/provincia/i',
        element: <InsertFormProvincia />,
        auth: authRoles.admin,
    },
    {
        path: '/provincia/u',
        element: <UpdateFormProvincia />,
        auth: authRoles.admin,
    },    
    {
        path: '/localidad/',
        element: <AppTableLocalidad />,
        auth: authRoles.admin,
    },
    {
        path: '/localidad/i',
        element: <InsertFormLocalidad />,
        auth: authRoles.admin,
    },
    {
        path: '/localidad/u',
        element: <UpdateFormLocalidad />,
        auth: authRoles.admin,
    },    
    {
        path: '/tiposocio/',
        element: <AppTableTipoSocio />,
        auth: authRoles.admin,
    },
    
    {
        path: '/tiposocio/i',
        element: <InsertFormTipoSocio />,
        auth: authRoles.admin,
    },
    {
        path: '/tiposocio/u',
        element: <UpdateFormTipoSocio />,
        auth: authRoles.admin,
    },
        
    {
        path: '/disciplina/',
        element: <AppTableDisciplina />,
        auth: authRoles.admin,
    },
    {
        path: '/disciplina/i',
        element: <InsertFormDisciplina />,
        auth: authRoles.admin,
    },
    {
        path: '/disciplina/u',
        element: <UpdateFormDisciplina/>,
        auth: authRoles.admin,
    },
    
    {
        path: '/adicional/',
        element: <AppTableAdicional/>,
        auth: authRoles.admin,
    },
    {
        path: '/adicional/i',
        element: <InsertFormAdicional/>,
        auth: authRoles.admin,
    },
    {
        path: '/adicional/u',
        element: <UpdateFormAdicional/>,
        auth: authRoles.admin,
    },    
    {
        path: '/socio/',
        element: <AppTableSocio />,
        auth: authRoles.admin,
    },
    {
        path: '/socio/i',
        element: <InsertFormSocio />,
        auth: authRoles.admin,
    },
    {
        path: '/socio/u',
        element: <UpdateFormSocio/>,
        auth: authRoles.admin,
    },    
    {
        path: '/sociodisciplina/',
        element: <AppTableSocioDisciplina />,
        auth: authRoles.admin,
    },    
     {
        path: '/sociodisciplina/i',
        element: <InsertFormSocioDisciplina />,
        auth: authRoles.admin,
    },    
    {
        path: '/socioadicional/',
        element: <AppTableSocioAdicional />,
        auth: authRoles.admin,
    },
     {
        path: '/socioadicional/i',
        element: <InsertFormSocioAdicional />,
        auth: authRoles.admin,
    },    
    {
        path: '/sociotransaccion/',
        element: <AppTableSocioTransaccion />,
        auth: authRoles.admin,
    },
    {
        path: '/socioabono/',
        element: <AppFormSocioAbono />,
        auth: authRoles.admin,
    },
    /*    
    {
        path: '/sociocuotas/',
        element: <AppFormSocioCuotas />,
        auth: authRoles.admin,
    },
    
    {
        path: '/sociocuotas/imprimir',
        element: <AppFormSocioCuotasImprmir />,
        auth: authRoles.admin,
    },
    */
    
    {
        path: '/seleccioncuotas/generar',
        element: <AppFormSeleccionCuotasGenerar />,
        auth: authRoles.admin,
    },    
    {
        path: '/seleccioncuotas/imprimir',
        element: <AppFormSeleccionCuotasImprimir />,
        auth: authRoles.admin,
    },    
    
    {
        path: '/sociocuotas/pagar',
        element: <AppFormSocioCuotasPagar />,
        auth: authRoles.admin,
    },
    /*
    {
        path: '/disciplinasociosinscriptos/',
        element: <AppTableDisciplinasSociosInscriptos />,
        auth: authRoles.admin,
    },
    
    {
        path: '/adicionalsociosinscriptos/',
        element: <AppTableAdicionalesSociosInscriptos />,
        auth: authRoles.admin,
    },
    */    
    {
        path: '/disciplinasocios',
        element: <AppTableDisciplinasSocios />,
        auth: authRoles.admin,
    },
    /*    
    {
        path: '/socio/morosos',
        element: <AppTableSociosMorosos />,
        auth: authRoles.admin,
    },
    {
        path: '/socio/activos',
        element: <AppTableSociosActivos />,
        auth: authRoles.admin,
    },
    {
        path: '/socio/cambiocategoria',
        element: <AppTableSociosCambioCategoria />,
        auth: authRoles.admin,
    },
    */
    
    {
        path: '/sociocuotagenerarindividual/',
        element: <AppFormSeleccionCuotaGenerarIndividual />,
        auth: authRoles.admin,
    },
    {
        path: '/sociocuotareimprimir/',
        element: <AppFormSeleccionCuotaReImprimir />,
        auth: authRoles.admin,
    },
    {
        path: '/sociocarnet/',
        element: <AppFormSocioCarnetImprmir />,
        auth: authRoles.admin,
    },    
    {
        path: '/obrasocial/',
        element: <AppTableObraSocial />,
        auth: authRoles.admin,
    },
    {
        path: '/obrasocial/i',
        element: <InsertFormObraSocial />,
        auth: authRoles.admin,
    },
    {
        path: '/obrasocial/u',
        element: <UpdateFormObraSocial />,
        auth: authRoles.admin,
    },
    
    {
        path: '/pregunta/',
        element: <AppTablePregunta />,
        auth: authRoles.admin,
    },
    {
        path: '/pregunta/i',
        element: <InsertFormPregunta />,
        auth: authRoles.admin,
    },
    {
        path: '/pregunta/u',
        element: <UpdateFormPregunta />,
        auth: authRoles.admin,
    },
    
    {
        path: '/fichainscripcion/',
        element: <AppTableFichaInscripcion />,
        auth: authRoles.admin,
    },
    {
        path: '/fichainscripcion/i',
        element: <InsertFormFichaInscripcion />,
        auth: authRoles.admin,
    },
    /*
    {
        path: '/sociosmutual/',
        element: <AppTableSocioMutual />,
        auth: authRoles.admin,
    },
    */    
    {        
        path: '/appusers/',
        element: <AppTableUsers/>,
        auth: authRoles.sa,                
    },    
    {        
        path: '/appusers/u',
        element: <AppFormUpdateUsers/>,
        auth: authRoles.sa,                
    },
    {        
        path: '/appusers/i',
        element: <AppFormUsers/>,
        auth: authRoles.sa,                
    },
    /*
    {        
        path: '/appusers/up',
        element: <AppFormUpdateUsersPass/>,
        auth: authRoles.sa,                
    },
    /*
    {
        path: '/socioxdisciplina/u',
        element: <UpdateFormSocioDisciplina/>,
        auth: authRoles.admin,
    }, */

]

export default administradorRoutes
