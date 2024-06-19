import { DatePicker, InputNumber, Input, Select, message, Progress } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';
import {
    LoadingOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';


const Settings = ({ ticket_info, url }) => {
    const { token } = useSelector((state) => state.data)

    const [messageApi, contextHolder] = message.useMessage();
    const [setting, setSetting] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ticketTime, setTicketTime] = useState('');
    const [beforeTime, setBeforeTime] = useState(0);
    const [percent, setPercent] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    const credential = JSON.parse(localStorage.getItem('userCredential'));

    const onDateTimePick = (value) => {
        const dateString = value.format('YYYY-MM-DD HH:mm:ss');
        setTicketTime(dateString);
    };
    useEffect(() => {
        if (ticket_info) {
            setPercent(0);
            setShowProgress(false);
        }
        setIsFree(ticket_info?.ticket.price === 0);
    }, [ticket_info]);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const handlePurchase = async () => {
        if (!ticket_info || !setting) {
            messageApi.open({
                type: 'warning',
                content: '情報を正しく設定してください'
            });
            return;
        }
        try {
            let delayTime = 0;
            if (ticketTime !== "") {
                const { data: { data: _time } } = await axios.post('http://localhost:8000/calc-time', { ticketTime, beforeTime });
                delayTime = _time;
                if (_time > 0) {
                    setShowProgress(true);
                    let passSeconds = 0;
                    const interval = setInterval(() => {
                        passSeconds++;
                        const progress = parseInt(passSeconds / _time * 100)
                        setPercent(progress);
                        if (progress >= 100) {
                            clearInterval(interval)
                        }
                    }, 1000);
                }
                await delay(_time * 1000);
            }
            setIsLoading(true);
            const requestUrl = `http://localhost:8000/${(!isFree && setting?._payMethod === '0') ? 'purchase-credit-ticket' : 'purchase-ticket'}`;
            const { data } = await axios.post(requestUrl, {
                event_url: url,
                ticket_id: ticket_info.ticket.id,
                ticket_cnt: ticket_info.ticket.ticket_cnt,
                utoken: token,
                event_id: ticket_info.eventInfo.eventId,
                event_cname: ticket_info.eventInfo.eventName,
                ticket_type: ticket_info.ticket.type,
                [`ticket_id_${ticket_info.ticket.id}`]: ticket_info.ticket.ticket_cnt,
                payment_method: setting?._payMethod,
                selected_cvs_code: setting?._payCvs,
                security_code: isFree ? null : setting?._securityCode,
                time: delayTime,
                email: credential.email,
                password: credential.password
            });
            if (data?.status === 'fail') {
                messageApi.open({
                    type: 'warning',
                    content: data.data.errmsg
                });
            } else {
                messageApi.open({
                    type: 'success',
                    content: 'チケットの購入が成功しました'
                });
            }
        } catch (e) {
            messageApi.open({
                type: 'warning',
                content: 'エラーが発生した'
            });
        }
        setIsLoading(false);
        setShowProgress(false);
    }
    return (
        <>
            {contextHolder}
            {showProgress && <div className='flex items-center gap-[10px] justify-center'>
                <ClockCircleOutlined className='text-gray' />
                <Progress percent={percent} />
            </div>}
            <div className='flex gap-[10px] w-full'>
                <div className="w-full">
                    <DatePicker
                        className='w-full h-[45px]'
                        placeholder='入力時間'
                        showTime
                        onOk={onDateTimePick}
                    />
                </div>
                <div className="w-full h-[45px]">
                    <InputNumber
                        onChange={(value) => setBeforeTime(value)}
                        className='w-full' />
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
                    {setting?._payMethod === '1' ?
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
                        </Select> :
                        <Input placeholder='セキュリティコード'
                            disabled={isFree}
                            onChange={({ target: { value } }) => setSetting({ ...setting, _securityCode: value })}
                            className='w-full' />}

                </div>
                <button
                    onClick={handlePurchase}
                    className='bg-[#25a0f7] shadow-lg w-full text-white rounded-lg'>
                    <div className='flex items-center justify-center gap-[10px]'>
                        {showProgress && percent < 100 ?
                            <ClockCircleOutlined />
                            :
                            isLoading && <LoadingOutlined />
                        }
                        <div>実行</div>
                    </div>
                </button>
            </div>
        </>
    )
}

export default Settings;