import './App.css';

function App() {
  return (
    <div className="App">
      <div className='w-[60%] flex flex-col gap-[10px] mx-auto mt-[100px] p-[20px] pt-[100px] bg-white rounded-lg relative shadow-lg'>
        <div className='mx-auto bg-[#25a0f7] w-[30%] left-[35%] shadow-lg text-white rounded-lg p-[30px] px-[50px] text-[30px] absolute top-[-50px]'>Live Pocket</div>
        <div className='flex '>
          <div className='w-full  flex flex-col gap-[10px]'>
            <input placeholder='メールアドレスを入力' className='h-[40px] shadow-sm round-sm'></input>
            <input placeholder='パスワードを入力してください' className='h-[40px] shadow-sm round-sm'></input>
          </div>
          <button className='w-[30%] mx-[10px] grow bg-[#25a0f7] shadow-lg text-white rounded-lg'>ログイン</button>
        </div>
        <div className='flex '>
          <div className='w-full flex flex-col gap-[10px]'>
            <input placeholder='入力URL' className='h-[40px] shadow-sm round-sm'></input>
          </div>
          <button className='w-[30%]  mx-[10px] grow bg-[#25a0f7] shadow-lg text-white rounded-lg'>チケット情報を取得する</button>
        </div>
        <div className='w-full rounded-lg h-[400px]  px-[10px]  border-[#c7c7c7] border-[1px]'></div>
        <div className='flex gap-[10px] w-full'>
          <input className='h-[40px] w-full shadow-sm round-sm'></input>
          <input className='h-[40px] w-full shadow-sm round-sm'></input>
          <input className='h-[40px] w-full shadow-sm round-sm'></input>
        </div>
        <div className='flex gap-[10px] w-full'>
          <input className='h-[40px] w-full shadow-sm round-sm'></input>
          <input className='h-[40px] w-full shadow-sm round-sm'></input>
          <button className='bg-[#25a0f7] shadow-lg w-full text-white rounded-lg p-[5px]'>実行する</button>
        </div>
      </div>
    </div>
  );
}

export default App;