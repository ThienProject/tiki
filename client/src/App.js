import {BrowserRouter,Route, Routes} from 'react-router-dom'
import {publicRoutes, privateRoutes} from '~/routes'

import {ToastProvider} from './providers/ToastProvider/ToastProvider';
function App() {
  return (
   <BrowserRouter>
      <div className="App">
        {
          <Routes>
            {
              publicRoutes.map((route, index) =>{
                let Layout = route.layout;
                const Page = route.component;
                return <Route key={index} path={route.path} element={<Layout>{ <Page /> }</Layout> } />
              })
            }
          
          </Routes>
        }
      </div>
   </BrowserRouter>
  );
}

export default App;
