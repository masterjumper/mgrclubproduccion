import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAdicionalbyId } from 'app/store/reducers/adicionalesSlice';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0)
}));

const SimpleDataAdicional = () => {
  const [datos, setDatos] = useState({ disdsc: '' });
  const location = useLocation();
  let dispatch = useDispatch();
  const adicional = useSelector((state) => state.adicionales.fetchAdicionalbyId);
  const { adidsc } = datos;

  useEffect(() => {
    dispatch(fetchAdicionalbyId({ id: location.state.identicador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (adicional) {
      setDatos(adicional);
    }
  }, [adicional]);

  return <Div>{adidsc}</Div>;
};
export default SimpleDataAdicional;
