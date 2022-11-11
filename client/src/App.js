import { useSelector } from 'react-redux';
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import {publicRoutes, privateRoutes} from '~/routes'
import ScrollToTop from './helpers/ScrollToTop';
import Login from './components/Auth/Login';
function App() {
  const user = useSelector(state => state.auth.user);
  return (
   <BrowserRouter >
      <ScrollToTop />
      <div className="App">
        {
          <Routes  >
            {
              publicRoutes.map((route, index) =>{
                let Layout = route.layout;
                const Page = route.component;
                return <Route 
                  key={index} path={route.path} element={<Layout>{ <Page /> }</Layout> } ></Route>
              })

            }
            {
              
              privateRoutes.map((route, index) => {
                let Layout = route.layout;
                const Page = user? route.component : Login;
                return <Route 
                  key={index} path={route.path} element={  <Layout>{ <Page /> }</Layout> } ></Route>
              })
             
              
            }
          
          </Routes>
        }
      </div>
   </BrowserRouter>
  );
}

export default App;
