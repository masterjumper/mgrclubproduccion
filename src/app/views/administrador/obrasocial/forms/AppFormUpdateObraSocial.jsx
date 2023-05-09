import React from 'react'
import SimpleFormUpdateObraSocial from './SimpleFormUpdateObraSocial'
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

const AppFormUpdateObraSocial = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Obras Sociales', path: '/obrasocial' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Modificar Obra Social">
                <SimpleFormUpdateObraSocial />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormUpdateObraSocial
