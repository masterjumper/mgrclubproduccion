import React from 'react'
import PaginationTableSocioDisciplina from './PaginationTableSocioDisciplina'
import SimpleDataSocio from './SimpleDataSocio'
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

const AppTableSocioDisciplina = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Socios', path: '/socio' },
                        { name: '' },
                    ]}
                />
            </div>
            <Box py="12px" />
            <SimpleCard title="Socio y Disciplinas">
                <SimpleDataSocio />
                <PaginationTableSocioDisciplina /> 
            </SimpleCard>
        </Container>
    )
}

export default AppTableSocioDisciplina
