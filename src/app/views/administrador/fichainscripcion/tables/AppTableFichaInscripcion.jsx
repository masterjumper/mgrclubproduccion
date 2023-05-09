import React from 'react'
import PaginationTableObraSocial from './PaginationTableFichaInscripcion'
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

const AppTableObraSocial = () => {
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
            <Box py="12px" />
            <SimpleCard title="Lista de Fichas de Inscripciones">
                <PaginationTableObraSocial />
            </SimpleCard>
        </Container>
    )
}

export default AppTableObraSocial
