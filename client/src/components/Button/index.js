import classNames from "classnames/bind";
import styles from './Button.module.scss';
import {Link} from 'react-router-dom';
const cx = classNames.bind(styles);
function Button({
    to , href,
    children,
    red = false,
    primary = false,
    rounded = false,
    outline = false,
    size = "medium",
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps})
{
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps
    }
    if(href){
        Comp = 'a';
        props.href = href;
    }
    else if(to){
        props.to = to;
        Comp = Link;
    }

    const classes = cx('wrapper',  size, {
        [className] : className ,
        primary,
        red,
        rounded,
        outline
    });

    return (
        <Comp className = {classes} {...props} >
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {<span className={cx('title')}>{children}</span> }
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    )

}
export default Button