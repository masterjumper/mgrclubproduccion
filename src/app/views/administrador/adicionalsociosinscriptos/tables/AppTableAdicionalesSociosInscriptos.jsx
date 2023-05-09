import React from 'react';
import PaginationTableAdicionalsSociosInscriptos from './PaginationTableAdicionalsSociosInscriptos';
import SimpleDataAdicional from './SimpleDataAdicional';
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

const AppTableAdicional = () => {
  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Adicionales', path: '/adicional' }, { name: '' }]} />
      </div>
      <Box py="12px" />
      <SimpleCard title="Adicional - Socios Inscriptos">
        <SimpleDataAdicional />
        <PaginationTableAdicionalsSociosInscriptos />
      </SimpleCard>
    </Container>
  );
};

export default AppTableAdicional;
