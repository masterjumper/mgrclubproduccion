import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDisciplinabyId } from '../../../../store/reducers/disciplinasSlice';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0)
}));

const SimpleDataDisciplina = () => {
  const [datos, setDatos] = useState({ disdsc: '' });
  const location = useLocation();
  let dispatch = useDispatch();
  const disciplina = useSelector((state) => state.disciplinas.disciplinaUnique);
  const { disdsc } = datos;

  useEffect(() => {
    dispatch(fetchDisciplinabyId({ id: location.state.identificador }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (disciplina) {
      setDatos(disciplina);
    }
  }, [disciplina]);

  return <Div>{disdsc}</Div>;
};
export default SimpleDataDisciplina;
