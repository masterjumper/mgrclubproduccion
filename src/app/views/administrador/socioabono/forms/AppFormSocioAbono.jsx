import React from 'react'
import SimpleFormSocioAbono from './SimpleFormSocioAbono'
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

const AppFormSocioAbono = () => {
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
            <SimpleCard title="Socio - Abono/Credito">
                <SimpleDataSocio />
                <SimpleFormSocioAbono />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormSocioAbono
