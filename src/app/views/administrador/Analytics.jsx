import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/system'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Analytics = () => {   
    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>                        
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>                        
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    )
}
export default Analytics
