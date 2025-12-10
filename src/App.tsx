//import Login from './pages/Login/Login'
import { GlobalProvider } from "./state";
import AppRouter from './router/AppRouter'
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
function App() {


  return (
        <MantineProvider>
          <GlobalProvider>
            <AppRouter />
          </GlobalProvider>
        </MantineProvider>

  )
}

export default App
