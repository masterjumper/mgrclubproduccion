import React from 'react'
import SimpleFormUpdateLocalidad from './SimpleFormUpdateLocalidad'
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

const AppFormUpdateLocalidad = () => {

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
            <SimpleCard title="Modificar localidad">
                <SimpleFormUpdateLocalidad />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormUpdateLocalidad
