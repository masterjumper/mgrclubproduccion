import React from 'react'
import PaginationTableSocioAdicional from './PaginationTableSocioAdicional'
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

const AppTableSocioAdicional = () => {
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
            <SimpleCard title="Socio y Adicionales">
                <SimpleDataSocio />
                <PaginationTableSocioAdicional /> 
            </SimpleCard>
        </Container>
    )
}

export default AppTableSocioAdicional
