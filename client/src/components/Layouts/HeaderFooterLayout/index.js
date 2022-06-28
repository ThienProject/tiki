import Header from "~/components/Layouts/components/Header";
import Footer from "~/components/Layouts/components/Footer";
import styles from './HeaderFooterLayout.module.scss'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function HeaderFooterLayout({children}){
  return( 
            <div className={cx('wrapper')}>
                <Header />
                <section className="content">
                    <div >{children}</div> 
                </section>
                <Footer />
            </div>
            )
}
export  default HeaderFooterLayout