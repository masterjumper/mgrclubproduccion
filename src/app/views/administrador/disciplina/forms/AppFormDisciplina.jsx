import React from 'react'
import SimpleFormDisciplina from './SimpleFormDisciplina'
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

const AppFormDisciplina = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Disciplina', path: '/disciplina' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Disciplina Nueva">
                <SimpleFormDisciplina />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormDisciplina
