import useSettings from 'app/hooks/useSettings';
import Avatar from '@mui/material/Avatar';
//import Imagen from '../../assets/images/logo.png';

const MatxLogo = ({ className }) => {
  const { settings } = useSettings();
  const theme = settings.themes[settings.activeTheme];

  return (
    <Avatar src="../../assets/images/logo.png"  sx={{ width: 32, height: 32 }} />
  );
};

export default MatxLogo;
