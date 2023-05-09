import React from 'react'
import SimpleFormSocioCuotas from './SimpleFormSocioCuotas'

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

const AppFormSocioCuotas = () => {
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
            <SimpleCard title="Generar Cuotas">                
                <SimpleFormSocioCuotas />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormSocioCuotas
