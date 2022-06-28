import Header from "~/components/Layouts/components/Header";
import Footer from "~/components/Layouts/components/Footer";
import Sidebar from "~/components/Layouts/components/Sidebar";
import classNames from "classnames/bind";
import styles from './DefaultLayout.module.scss'

function DefaultLayout({children}){
    const cx = classNames.bind(styles);
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