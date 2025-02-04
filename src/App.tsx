import './App.css';
import Login from './pages/login';

export default function App() {
  return (
    <div className=' h-screen flex flex-col items-center justify-center p-5'>
      <h1>주차 정산 서비스</h1>
      <Login></Login>
    </div>
  );
}