import React from 'react';
import PaginationTableTipoSocio from './PaginationTableTipoSocio';
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

const AppTableTipoSocio = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Tipo Socios', path: '/TipoSocio' }, { name: '' }]} />
      </div>
      <Box py="12px" />
      <SimpleCard title="Lista de Tipo Socios">
        <PaginationTableTipoSocio />
      </SimpleCard>
    </Container>
  );
};

export default AppTableTipoSocio;
