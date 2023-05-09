import React from 'react'
import SimpleFormUpdateAdicional from './SimpleFormUpdateAdicional'
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

const AppFormUpdateAdicional = () => {
    
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Adicionales', path: '/adicional' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Modificar Adicional">
                <SimpleFormUpdateAdicional/>
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormUpdateAdicional
