import { RouterProvider } from 'react-router-dom';
import router from './routes/route.tsx';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 h-full">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
