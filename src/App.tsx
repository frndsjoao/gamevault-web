import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Router from './routes';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: true, retry: 1 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer position='top-center' theme='dark' pauseOnHover={false} className="text-xs" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
