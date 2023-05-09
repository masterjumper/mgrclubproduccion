export const navigations = [
  /* { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' }, */
  {
    name: 'Inicio',
    path: '/dashboard/default',
    icon: 'dashboard',
  },
  {
    label: 'Administrador',
    type: 'label',                
  },
  {
    name: 'Administracion',
    icon: 'apps',
    badge: { value: '', color: 'secondary' },
    children: [
        {
            icon: 'group',
            name: 'Socios',
            path: '/socio/',
            iconText: 'S',
        },
        {
            icon: 'group',
            name: 'Socios Mutual',
            path: '/sociosmutual/',
            iconText: 'S',
        },                
        {
            name: 'Cuotas',
            icon: 'art_track',
            badge: { value: '', color: 'secondary' },
            children: [
                /* {
                    icon: 'settings',
                    name: 'Generar Cuotas',
                    path: '/sociocuotas/',
                    iconText: 'C',
                }, */
                /* {
                    icon: 'print',
                    name: 'Imprimir Cuotas',
                    path: '/sociocuotas/imprimir',
                    iconText: 'C',
                }, */
                {
                    icon: 'settings',
                    name: 'Seleccion Generar Cuotas',
                    path: '/seleccioncuotas/generar',
                    iconText: 'G',
                },
                {
                    icon: 'print',
                    name: 'Seleccion Cuotas a Imprimir',
                    path: '/seleccioncuotas/imprimir',
                    iconText: 'C',
                },
                {   
                    icon: 'payment',
                    name: 'Pago Cuota',
                    path: '/sociocuotas/pagar',
                    iconText: 'P',
                }
            ]
        },
        /* {
            name: 'Reportes',
            icon: 'library_books',
            badge: { value: '', color: 'secondary' },
            children: [
                {
                    icon: 'call_split',
                    name: 'Socios Cambio de Categoria',
                    path: '/socio/cambiocategoria',
                    iconText: 'G',
                },
                {
                    icon: 'directions_run',
                    name: 'Socios Activos',
                    path: '/socio/activos',
                    iconText: 'S',
                },
                {
                    icon: 'error_outline',
                    name: 'Socios Morosos',
                    path: '/socio/morosos',
                    iconText: 'M',
                },
                {
                    icon: 'pool',
                    name: 'Disciplinas Y Socios',
                    path: '/disciplinasocios',
                    iconText: 'I',
                }

            ]
        }, */
    ],
},
{
    name: 'Auxiliares',
    icon: 'brightness_auto',
    badge: { value: '', color: 'secondary' },
    children: [
        {
            icon: 'subject',
            name: 'Categorias',
            path: '/categoria/',
            iconText: 'C',
        },
        {
            icon: 'assistant_photo',
            name: 'Provincias',
            path: '/provincia/',
            iconText: 'P',
        },
        {
            icon: 'room',
            name: 'Localidades',
            path: '/localidad/',
            iconText: 'L',
        },
        {
            icon: 'wc',
            name: 'Tipo Socios',
            path: '/tiposocio/',
            iconText: 'T',
        },
        {
            icon: 'pool',
            name: 'Disciplinas',
            path: '/disciplina/',
            iconText: 'D',
        },
        {
            icon: 'dns',
            name: 'Adicionales',
            path: '/adicional/',
            iconText: 'D',
        },
        
    ],
},
{
    name: 'Fichas de Inscripciones',
    icon: 'assignment',
    badge: { value: '', color: 'secondary' },
    children: [
        {
            icon: 'content_paste',
            name: 'Ficha de Inscripcion',
            path: '/fichainscripcion/',
            iconText: 'D',
        },
        {
            icon: 'local_hospital',
            name: 'Obras Sociales',
            path: '/obrasocial/',
            iconText: 'D',
        },
        {
            icon: 'local_parking',
            name: 'Preguntas',
            path: '/pregunta/',
            iconText: 'D',
        },
    ]
}, 

 /* { label: 'PAGES', type: 'label' },
   {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
      { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
      { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
      { name: 'Error', iconText: '404', path: '/session/404' }
    ]
  }, 
  { label: 'Components', type: 'label' },*/
  /* {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '30+', color: 'secondary' },
    children: [
      { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
      { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
      { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
      { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
      { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
      { name: 'Form', path: '/material/form', iconText: 'F' },
      { name: 'Icons', path: '/material/icons', iconText: 'I' },
      { name: 'Menu', path: '/material/menu', iconText: 'M' },
      { name: 'Progress', path: '/material/progress', iconText: 'P' },
      { name: 'Radio', path: '/material/radio', iconText: 'R' },
      { name: 'Switch', path: '/material/switch', iconText: 'S' },
      { name: 'Slider', path: '/material/slider', iconText: 'S' },
      { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
      { name: 'Table', path: '/material/table', iconText: 'T' }
    ]
  }, */
  /* {
    name: 'Charts',
    icon: 'trending_up',
    children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }]
  }, */
  {
    name: 'Users',
    icon: 'trending_up',

    children: [
        {
            name: 'Users',
            path: '/appusers/',
            iconText: 'U',
        },
    ],
}, 
  /* {
    name: 'Documentation',
    icon: 'launch',
    type: 'extLink',
    path: 'http://demos.ui-lib.com/matx-react-doc/'
  } */
];
