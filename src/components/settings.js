import { DatePicker, InputNumber, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import {
    LoadingOutlined,
} from '@ant-design/icons';


const Settings = ({ ticket_info }) => {
    const { token } = useSelector((state) => state.data)

    const [messageApi, contextHolder] = message.useMessage();
    const [setting, setSetting] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const onDateTimePick = (value) => {
        console.log('onOk: ', value);
    };
    useEffect(() => {
        setIsFree(ticket_info?.ticket.price === 0);
    }, [ticket_info]);
    const handlePurchase = async () => {
        if (!ticket_info || !setting) {
            messageApi.open({
                type: 'warning',
                content: '情報を正しく設定してください'
            });
            return;
        }
        try {
            setIsLoading(true);
            const credential = JSON.parse(localStorage.getItem('userCredential'));
            const { data } = await axios.post('http://localhost:8000/purchase-ticket', {
                utoken: token,
                event_id: ticket_info.eventInfo.eventId,
                event_cname: ticket_info.eventInfo.eventName,
                ticket_type: ticket_info.ticket.type,
                [`ticket_id_${ticket_info.ticket.id}`]: ticket_info.ticket.ticket_cnt,
                payment_method: setting?._payMethod,
                selected_cvs_code: setting._payCvs,
                email: credential.email,
                password: credential.password
            });
            console.log(data);
            messageApi.open({
                type: 'success',
                content: 'チケットの購入が成功しました'
            });

        } catch (e) {
            messageApi.open({
                type: 'warning',
                content: 'エラーが発生した'
            });
        }
        setIsLoading(false);
        // console.log(ticket_info);
        // console.log(setting);
    }
    return (
        <>
            {contextHolder}

            <div className='flex gap-[10px] w-full'>
                <div className="w-full">
                    <DatePicker
                        className='w-full h-[45px]'
                        placeholder='入力時間'
                        showTime
                        onChange={(value, dateString) => {
                            console.log('Selected Time: ', value);
                            console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onDateTimePick}
                    />
                </div>
                <div className="w-full h-[45px]">
                    <InputNumber className='w-full' />
                </div>
                <div className="w-full h-[45px]">
                    <InputNumber className='w-full' />
                </div>
            </div>
            <div className='flex gap-[10px] w-full'>
                <div className="w-full h-[45px]">
                    <Select
                        value={setting?._payMethod}
                        onChange={(e) => {
                            setSetting({ ...setting, _payMethod: e })
                        }}
                        className='w-full h-[45px]'
                    >
                        <Select.Option value="0">{isFree ? '無料アカウント' : 'クレジットカード'}</Select.Option>
                        <Select.Option value="1">コンビニ決済</Select.Option>
                        <Select.Option value="2">LivePocketあと払い</Select.Option>
                    </Select>
                </div>
                <div
                    className="w-full">
                    <Select
                        disabled={setting?._payMethod !== '1'}
                        className='w-full h-[45px]'
                        onChange={(e) => {
                            setSetting({ ...setting, _payCvs: e })
                        }}
                    >
                        <Select.Option value="002">ローソン</Select.Option>
                        <Select.Option value="016">ファミリーマート</Select.Option>
                        <Select.Option value="005">ミニストップ</Select.Option>
                        <Select.Option value="010">デイリーヤマザキ</Select.Option>
                        <Select.Option value="018">セイコーマート</Select.Option>
                    </Select>
                </div>
                <button
                    onClick={handlePurchase}
                    className='bg-[#25a0f7] shadow-lg w-full text-white rounded-lg'>
                    <div className='flex items-center justify-center'>
                        {isLoading && <LoadingOutlined />}
                        <div>実行</div>
                    </div>
                </button>
            </div>
        </>
    )
}

export default Settings;