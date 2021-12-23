import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { createTheme, ThemeProvider } from '@material-ui/core'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: 'dark',
          },
        })}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
