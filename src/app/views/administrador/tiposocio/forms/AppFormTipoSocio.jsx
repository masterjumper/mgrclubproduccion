import React from 'react';
import SimpleFormTipoSocio from './SimpleFormTipoSocio';
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

const AppFormTipoSocio = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Tipo Socios', path: '/TipoSocio' }, { name: '' }]} />
      </div>
      <SimpleCard title="Tipo Socio Nuevo">
        <SimpleFormTipoSocio />
      </SimpleCard>
      <Box py="12px" />
    </Container>
  );
};

export default AppFormTipoSocio;
