import classNames from "classnames/bind";
import styles from './Breadcrumb.module.scss';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Breadcrumb({parentCrumb,middleCrumb,childCrumb })
{
    function handleClick(event) {
       /*  event.preventDefault(); */
        console.info('You clicked a breadcrumb.');
      }
    const breadcrumbs = [
        <Link underline="hover" 
        style={{opacity : "0.8"}} 
            key="1" color="inherit" 
            href="/" 
            fontSize="1.5rem"
            onClick={handleClick}>
          Home
        </Link>,
        <Link
        style={{opacity : "0.8"}} 
          underline="hover"
          key="2"
          fontSize="1.5rem"
          color="inherit"
          href="/material-ui/getting-started/installation/"
          onClick={handleClick}
        >
          {parentCrumb}
        </Link>,
         <Link
         style={{opacity : "0.8"}} 
         underline="hover"
         key="2"
         color="inherit"
         fontSize="1.5rem"
         href="/material-ui/getting-started/installation/"
         onClick={handleClick}
       >
         {middleCrumb}
       </Link>,
        <Typography 
        fontSize="1.5rem"
        style={{opacity : "0.6"}} 
        key="3" color = "var(--text)">
          
          {childCrumb}
        </Typography>,
      ];
    
      return (
        <Breadcrumbs separator={<FontAwesomeIcon icon = {faAngleRight} />} aria-label="breadcrumb">
            {breadcrumbs}
        </Breadcrumbs>
      );

}
export default Breadcrumb