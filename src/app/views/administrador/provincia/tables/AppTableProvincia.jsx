import React from 'react'
import PaginationTableProvincia from './PaginationTableProvincia'
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

const AppTableProvincia = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Provincias', path: '/provincia' },
                        { name: '' },
                    ]}
                />
            </div>
            <Box py="12px" />
            <SimpleCard title="Lista de Provincias">
                <PaginationTableProvincia />
            </SimpleCard>
        </Container>
    )
}

export default AppTableProvincia
