import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

const BootstrapTooltip = ({ className, arrowClass, tooltipClass, ...props }) => {
  const classes = useStyles();

  return (
    <Tooltip {...props} arrow classes={{ popper: className, arrow: arrowClass || classes.arrow, tooltip: tooltipClass || classes.tooltip }} />
  );
};

export default BootstrapTooltip;
