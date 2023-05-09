import React from 'react'
import SimpleFormCategoria from './SimpleFormCategoria'
//import StepperForm from './StepperForm'
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

const AppFormCategoria = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Categoria', path: '/categoria' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Categoria Nueva">
                <SimpleFormCategoria />
            </SimpleCard>
            <Box py="12px" />
            {/* <SimpleCard title="stepper form">
                <StepperForm />
            </SimpleCard> */}
        </Container>
    )
}

export default AppFormCategoria
