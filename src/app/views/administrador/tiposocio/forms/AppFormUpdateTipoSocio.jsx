import React from 'react';
import SimpleFormUpdateTipoSocio from './SimpleFormUpdateTipoSocio';
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

const AppFormUpdateTipoSocio = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Tipo Socios', path: '/tiposocio' }, { name: '' }]} />
      </div>
      <SimpleCard title="Modificar Tipo Socio">
        <SimpleFormUpdateTipoSocio />
      </SimpleCard>
      <Box py="12px" />
    </Container>
  );
};

export default AppFormUpdateTipoSocio;
