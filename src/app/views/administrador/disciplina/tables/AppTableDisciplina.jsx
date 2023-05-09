import React from 'react'
import PaginationTableDisciplina from './PaginationTableDisciplina'
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

const AppTableDisciplina = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Disciplinas', path: '/disciplina' },
                        { name: '' },
                    ]}
                />
            </div>
            <Box py="12px" />
            <SimpleCard title="Lista de Disciplinas">
                <PaginationTableDisciplina />
            </SimpleCard>
        </Container>
    )
}

export default AppTableDisciplina
