import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { get_SOCIO } from '../../../../redux/actions/SocioActions';
import { fetchSociobyId } from 'app/store/reducers/sociosSlice';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0)
}));

const SimpleDataSocio = () => {
  const location = useLocation();
  let dispatch = useDispatch();
  const socio = useSelector((state) => state.socios.socioUnique);

  useEffect(() => {
    dispatch(fetchSociobyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socio) {
      setDatos(socio);
    }
  }, [socio]);

  const [datos, setDatos] = useState({
    SocNom: '',
    SocApe: '',
    SocNro: '',
    SocSal: '',
    SocDom: ''
  });

  const { SocNom, SocApe, SocNro, SocSal, SocDom } = datos;

  return (
    <Div>
      {SocNro} - {SocApe}, {SocNom}
      <div>{SocDom}</div>
      <div>Saldo: ${SocSal}</div>
    </Div>
  );
};
export default SimpleDataSocio;
