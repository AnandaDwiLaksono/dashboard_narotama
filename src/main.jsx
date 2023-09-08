import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerLicense } from '@syncfusion/ej2-base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App.jsx'
import './index.css'
import { ContextProvider } from './utils/ContextProvider.jsx';

registerLicense('ORg4AjUWIQA/Gnt2V1hiQlRPf0BDXnxLflF1VWFTfV16dldWESFaRnZdQV1rSHpTdUBrWn5beX1R');

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
