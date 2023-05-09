import React from 'react'
import SimpleFormSocioAdicional from './SimpleFormSocioAdicional'
import SimpleDataSocio from './SimpleDataSocioAdicional'
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

const AppFormSocioAdicional = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Socio Y Adicionales', path: '/socioadicional' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Inscribir Socio a Adicional">
                <SimpleDataSocio />
                <SimpleFormSocioAdicional />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormSocioAdicional
