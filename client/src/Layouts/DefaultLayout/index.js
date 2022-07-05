import Header from "~/Layouts/components/Header";
import Footer from "~/Layouts/components/Footer";
import Sidebar from "~/Layouts/components/Sidebar";
import classNames from "classnames/bind";
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles);
function DefaultLayout({children}){
   
  return( 
            <div>
                <Header />
                <div className={styles.container}>
                    <Sidebar />
                    <div className={styles['content']}>{children}</div> 
                </div>
                <Footer />
            </div>
            )
}
export  default DefaultLayout