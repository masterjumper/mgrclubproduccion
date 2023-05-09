import React from 'react'
import SimpleFormObraSocial from './SimpleFormPregunta'
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

const AppFormObraSocial = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Preguntas', path: '/pregunta' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Pregunta Nueva">
                <SimpleFormObraSocial />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormObraSocial
