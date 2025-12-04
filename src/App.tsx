//import Login from './pages/Login/Login'
import { GlobalProvider } from "./state";
import AppRouter from './router/AppRouter'

function App() {


  return (

    <GlobalProvider>
      <AppRouter />
    </GlobalProvider>

  )
}

export default App
