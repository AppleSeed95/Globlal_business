import { useForm } from 'react-hook-form';
import { message } from 'antd';
import {
    LoginOutlined,
    LoadingOutlined,
    CheckCircleOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/actions';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { token, loading, loggedIn, error } = useSelector((state) => state.data)
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            messageApi.open({
                type: 'warning',
                content: 'ログインに失敗しました'
            });
        }
        if (loggedIn === true) {
            messageApi.open({
                type: 'success',
                content: '正常にログインしました'
            });
        }
        if (loggedIn === false) {
            messageApi.open({
                type: 'success',
                content: '正常にログアウトされました'
            });
        }
    }, [token, error])
    const onSubmit = async (data) => {
        dispatch(login(data));
    };
    const handleLogOut = () => {
        dispatch(logout());
    }
    const onError = (errors) => {
        if (errors.email) {
            messageApi.open({
                type: 'warning',
                content: errors.email.message
            });
        }
        if (errors.password) {
            messageApi.open({
                type: 'warning',
                content: errors.password.message
            });
        }

    };

    return (
        <div>
            {contextHolder}
            <form className='w-full flex' onSubmit={handleSubmit(onSubmit, onError)}>
                <div className='w-full flex flex-col gap-[10px]'>
                    <div
                        className="w-full pr-[10px] relative input-effect">
                        <input
                            {...register('email', { required: 'メールアドレスを入力してください' })}
                            placeholder='メールアドレスを入力' className="effect-17 w-full" type="email" />
                        <span className="focus-border"></span>
                    </div>
                    <div
                        className="w-full pr-[10px] relative input-effect">
                        <input
                            {...register('password', { required: 'パスワードを入力してください' })}
                            placeholder='パスワードを入力してください' className="effect-17 w-full" type='password' />
                        <span className="focus-border"></span>
                    </div>
                </div>
                {!loggedIn && <button
                    style={{
                        transitionDuration: '500ms',
                        backgroundColor: loggedIn ? '#1cb800' : error ? '#ff2a00' : ''
                    }}
                    type="submit"
                    className='w-[30%] mx-[10px] grow bg-[#25a0f7] shadow-lg text-white rounded-lg'
                >
                    {!loggedIn && <div className='flex gap-[10px] items-center justify-center'>
                        {!loggedIn && !loading && <LoginOutlined className='text-[25px]' />}
                        {loading && <LoadingOutlined className='text-[25px]' />}
                        {loggedIn && <CheckCircleOutlined className='text-[25px]' />}
                        ログイン
                    </div>}
                </button>}
                {loggedIn && <button
                    style={{
                        transitionDuration: '500ms',
                        backgroundColor: loggedIn ? '#1cb800' : error ? '#ff2a00' : ''
                    }}
                    className='w-[30%] mx-[10px] grow bg-[#25a0f7] shadow-lg text-white rounded-lg'
                    onClick={handleLogOut}
                >
                    {loggedIn && <div className='flex gap-[10px] items-center justify-center'>
                        <LogoutOutlined className='text-[25px]' />
                        ログアウト
                    </div>}
                </button>}
            </form>
        </div>
    );
}

export default Login;