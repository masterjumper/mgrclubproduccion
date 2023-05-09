import React from 'react'
import SimpleFormUpdateDisciplinas from './SimpleFormUpdateDisciplina'
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

const AppFormUpdateDisciplina = () => {

    
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
            <SimpleCard title="Modificar Disciplina">
                <SimpleFormUpdateDisciplinas/>
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormUpdateDisciplina
