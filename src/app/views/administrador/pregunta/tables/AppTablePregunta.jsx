import React from 'react'
import PaginationTablePregunta from './PaginationTablePregunta'
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

const AppTablePregunta = () => {
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
            <Box py="12px" />
            <SimpleCard title="Lista de Preguntas">
                <PaginationTablePregunta />
            </SimpleCard>
        </Container>
    )
}

export default AppTablePregunta
