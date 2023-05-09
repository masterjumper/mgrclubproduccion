import React from 'react'
import PaginationTableSocioTransaccion from './PaginationTableSocioTransaccion'
import SimpleDataSocio from './SimpleDataSocio'
import { Breadcrumb, SimpleCard } from  '../../../../components'
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

const AppTableSocioTransaccion = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Socios', path: '/socio' },
                        { name: '' },
                    ]}
                />
            </div>
            <Box py="12px" />
            <SimpleCard title="socio - Movimiento de Cuenta">
                <SimpleDataSocio />
                <PaginationTableSocioTransaccion /> 
            </SimpleCard>
        </Container>
    )
}

export default AppTableSocioTransaccion
