import React from 'react'
import SimpleFormUpdateProvincia from './SimpleFormUpdateProvincia'
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

const AppFormUpdateProvincia = () => {

    const { state } = useLocation();
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Provincias', path: '/provincia' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Modificar provincia">
                <SimpleFormUpdateProvincia state={state}/>
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormUpdateProvincia
