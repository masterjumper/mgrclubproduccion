import React from 'react'
import PaginationTableDisciplinasSocios from './PaginationTableDisciplinasSocios'
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

const AppTableDisciplinasSocios= () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Reportes', path: '/' },
                        { name: '' },
                    ]}
                />
            </div>
            <Box py="12px" />
            <SimpleCard title="Disciplinas y Socios">
                <PaginationTableDisciplinasSocios />
            </SimpleCard>
        </Container>
    )
}

export default AppTableDisciplinasSocios
