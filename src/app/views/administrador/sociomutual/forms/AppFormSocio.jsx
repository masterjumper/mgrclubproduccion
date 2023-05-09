import React from 'react'
import SimpleFormSocio from './SimpleFormSocio'
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

const AppFormSocio = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Socio', path: '/socio' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Socio Nuevo">
                <SimpleFormSocio />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormSocio
