import React from 'react'
import SimpleFormProvincia from './SimpleFormProvincia'
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

const AppFormProvincia = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Provincia', path: '/Provincia' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Provincia Nueva">
                <SimpleFormProvincia />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormProvincia
