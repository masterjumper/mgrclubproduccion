import React from 'react'
import SimpleFormFichaInscripcion from './SimpleFormFichaInscripcion'
import { Breadcrumb, SimpleCard } from '../../../../components'
import { Box, styled } from '@mui/system'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const AppFormFichaInscripcion = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Fichas de Inscripciones', path: '/fichainscripcion' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Ficha de Inscripcion Nueva">
                <SimpleFormFichaInscripcion />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormFichaInscripcion
