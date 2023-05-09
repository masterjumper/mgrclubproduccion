import React from 'react'
import SimpleFormUpdateUsersPass from './SimpleFormUpdateUsersPass'
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

const AppFormUpdateUsersPass = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'User', path: '/appusers/' },
                        { name: '' },
                    ]}
                />
            </div>
            <SimpleCard title="Update User Password">
                <SimpleFormUpdateUsersPass/>
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppFormUpdateUsersPass
