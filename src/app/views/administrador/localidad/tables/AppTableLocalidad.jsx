import React from 'react'
import PaginationTableLocalidad from './PaginationTableLocalidad'
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

const AppTableLocalidad = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Localidades', path: '/localidad' },
                        { name: '' },
                    ]}
                />
            </div>
            <Box py="12px" />
            <SimpleCard title="Lista de Localidades">
                <PaginationTableLocalidad />
            </SimpleCard>
        </Container>
    )
}

export default AppTableLocalidad
