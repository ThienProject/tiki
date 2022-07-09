import Header from "~/Layouts/components/Header";
import Footer from "~/Layouts/components/Footer";
import styles from './HeaderFooterLayout.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function HeaderFooterLayout({children}){
  return( 
            <div className={cx('wrapper')}>
                <Header />
                <section className={styles['content']}>
                    <div >{children}</div> 
                </section>
                <Footer />
            </div>
            )
}
export  default HeaderFooterLayout