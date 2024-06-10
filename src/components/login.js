import { useForm } from 'react-hook-form';
import { message } from 'antd';
import {
    LoginOutlined,
    LoadingOutlined,
    CheckCircleOutlined
} from '@ant-design/icons'; import axios from 'axios'
import { useState } from 'react';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoadding, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [failed, setIsFailed] = useState(false);
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const { data: response } = await axios.post('http://localhost:8000/login', data);
            if (!response.success) {
                messageApi.open({
                    type: 'warning',
                    content: 'ログインに失敗しました'
                });
                setIsFailed(true);
            } else {
                setLoggedIn(true);
                messageApi.open({
                    type: 'success',
                    content: '正常にログインしました'
                });
                setIsFailed(false);
            }
        } catch (e) {
            messageApi.open({
                type: 'error',
                content: e.message
            });
        }
        setIsLoading(false);

    };

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
                            placeholder='メールアドレスを入力' className="effect-17" type="text" />
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
                <button
                    style={{
                        transitionDuration: '500ms',
                        backgroundColor: loggedIn ? '#1cb800' : failed ? '#ff2a00' : ''
                    }}
                    type="submit"
                    className='w-[30%] mx-[10px] grow bg-[#25a0f7] shadow-lg text-white rounded-lg'
                >
                    <div className='flex gap-[10px] items-center justify-center'>
                        {!loggedIn && !isLoadding && <LoginOutlined className='text-[25px]' />}
                        {isLoadding && <LoadingOutlined className='text-[25px]' />}
                        {loggedIn && <CheckCircleOutlined className='text-[25px]' />}
                        ログイン
                    </div>
                </button>
            </form>
        </div>
    );
}

export default Login;