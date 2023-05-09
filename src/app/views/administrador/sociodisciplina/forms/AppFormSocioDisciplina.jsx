import React from 'react'
import SimpleFormSocioDisciplina from './SimpleFormSocioDisciplina'
import SimpleDataSocio from './SimpleDataSocioDisciplina'
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

const AppFormSocioDisciplina = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Socio Y Disciplinas', path: '/sociodisciplina' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Inscribir Socio a Disciplina">
                <SimpleDataSocio />
                <SimpleFormSocioDisciplina />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormSocioDisciplina
