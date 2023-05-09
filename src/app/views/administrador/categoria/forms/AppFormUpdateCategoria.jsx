import React from 'react'
import SimpleFormUpdateCategoria from './SimpleFormUpdateCategoria'
import { Breadcrumb, SimpleCard } from '../../../../components'
import { Box, styled } from '@mui/system'
import { useLocation } from 'react-router-dom';

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

const AppFormUpdateCategoria = () => {

    const { state } = useLocation();
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Categorias', path: '/categoria' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Modificar Categoria">
                <SimpleFormUpdateCategoria state={state}/>
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormUpdateCategoria
