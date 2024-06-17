import axios from "axios";
import { useEffect, useState } from "react";
import { message, Input, Select } from 'antd';
import {
    LoadingOutlined,
} from '@ant-design/icons';
import { Table, Empty, Spin } from "antd"




const URLForm = ({ set_ticket_info }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');
    const [data, setData] = useState(null);
    const [ticketInfo, setTicketInfo] = useState(null);
    useEffect(() => {
        if (ticketInfo) {
            set_ticket_info(ticketInfo);
        }
    }, [ticketInfo])

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'status',
            dataIndex: 'sales_status',
            key: 'status',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'detail',
            dataIndex: 'detail',
            key: 'detail',
        },
        {
            title: 'purchase num',
            dataIndex: 'limit_max',
            key: 'limit_max',
            render: (value, record) => (
                <Select
                    onChange={(e) => setTicketInfo({ ticket: { ...record, ticket_cnt: e }, eventInfo: data.eventInfo })}
                    className="w-full" value={ticketInfo?.ticket.id === record.id ? ticketInfo?.ticket.ticket_cnt ?? null : null} >
                    {
                        Array.from({ length: value }, (_, i) => i + 1).map((a, idx) =>
                            <Select.Option key={idx}
                                value={a}
                            >
                                {a}枚
                            </Select.Option>)
                    }
                </Select >
            )
        },
    ]


    const getTicketInfo = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('http://localhost:8000/get-ticket', { url });
            setData(data);
            messageApi.open({
                type: 'success',
                content: 'チケット情報が正常に取得されました'
            });

        } catch (e) {
            console.log(e);
            messageApi.open({
                type: 'warning',
                content: 'エラーが発生した'
            });
        }
        setIsLoading(false);
    }
    return (
        <>
            <div className='flex py-[10px]'>
                {contextHolder}
                <div
                    className="w-full pr-[10px]">
                    <Input
                        onChange={({ target: { value } }) => setUrl(value)}
                        placeholder='イベントURLを入力' className="w-full" type="text" />
                </div>
                <button
                    onClick={getTicketInfo}
                    className='w-[30%] h-[45px]  mx-[10px] grow bg-[#25a0f7] shadow-lg text-white rounded-lg'>
                    {isLoading && <LoadingOutlined />} チケット情報入手
                </button>
            </div>
            {<div className='w-full overflow-y-scroll rounded-lg h-[400px]  px-[10px]'>
                {
                    !data &&
                    <div className="h-full flex items-center justify-center">
                        {isLoading ?
                            <Spin tip="Loading" size="large">
                                <Empty />
                            </Spin> :
                            <Empty />
                        }
                    </div>
                }
                {
                    data?.ticket_data?.map((a, idx) => (

                        <div key={idx}>
                            <div className="flex">
                                <div className="m-[20px] p-[10px] rounded-[20px] text-white shadow-lg mx-auto bg-[#b0b0b0]">
                                    {a.group_name}
                                </div>
                            </div>
                            <Table columns={columns} bordered pagination={false} dataSource={a.tickets_info} />
                        </div>
                    ))
                }
            </div>}
        </>

    )
}

export default URLForm;