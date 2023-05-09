import React, { lazy } from 'react'
//import Loadable from '../../components/Loadable/Loadable'
import Loadable from '../../components/Loadable';
//import { authRoles } from '../../auth/authRoles'
import { authRoles } from '../../auth/authRoles'

const UpdateFormPerfil = Loadable(lazy(() => import("./perfil/forms/AppFormUpdatePerfil")));

const perfilRoutes = [       
    {
        path: '/perfil/u',
        element: <UpdateFormPerfil />,
        auth: authRoles.admin,
    },
]
export default perfilRoutes
