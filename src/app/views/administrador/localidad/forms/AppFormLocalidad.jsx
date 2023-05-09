import React from 'react';
import SimpleFormLocalidad from './SimpleFormLocalidad';
import { Breadcrumb, SimpleCard } from '../../../../components';
import { Box, styled } from '@mui/system';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px'
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px'
    }
  }
}));

const AppFormLocalidad = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Localidad', path: '/Localidad' }, { name: '' }]} />
      </div>
      <SimpleCard title="Localidad Nueva">
        <SimpleFormLocalidad />
      </SimpleCard>
      <Box py="12px" />
    </Container>
  );
};

export default AppFormLocalidad;
