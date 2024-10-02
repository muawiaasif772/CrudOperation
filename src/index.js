import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  

     <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
);


