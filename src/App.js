import './App.css';
import Login from './components/login';
import URLForm from './components/urlForm';
import EffectTrigger from './components/util/effectTrigger';
import Settings from './components/settings';
import { useState } from 'react';

function App() {
  const [ticket_info, set_ticket_info] = useState(null);
  return (
    <div className="App">
      <EffectTrigger />
      <img src='/img/login.jpg' alt='' className='bg fixed w-[100vw] h-[100vh] top-0 left-0' />
      <div className='w-[60%] h-[85vh] flex flex-col gap-[10px] mx-auto mt-[10vh] p-[20px] pt-[100px] bg-white rounded-lg relative shadow-lg'>
        <div className='title mx-auto bg-[#1cb800] w-[30%] left-[35%] text-white rounded-lg p-[30px] px-[50px] text-[30px] absolute top-[-50px]'>Live Pocket</div>
        <Login />
        <URLForm set_ticket_info={set_ticket_info} />
        <Settings ticket_info={ticket_info} />
      </div>
    </div>
  );
}

export default App;
