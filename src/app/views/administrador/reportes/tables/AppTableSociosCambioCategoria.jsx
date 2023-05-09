import React from 'react'
import PaginationTableSociosCambioCategoria from './PaginationTableSociosCambioCategoria'
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

const AppTableSociosCambioCategoria= () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Reportes', path: '/' },
                        { name: '' },
                    ]}
                />
            </div>
            <Box py="12px" />
            <SimpleCard title="Socios Cambio Categoria">                
                <PaginationTableSociosCambioCategoria />
            </SimpleCard>
        </Container>
    )
}

export default AppTableSociosCambioCategoria
