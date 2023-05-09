import React from 'react'
import SimpleFormAdicional from './SimpleFormAdicional'
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

const AppFormAdicional = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Adicionales', path: '/adcional' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Nuevo Adcional">
                <SimpleFormAdicional />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormAdicional
