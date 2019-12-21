import React, { useEffect, useState } from 'react';
import { Button, PageHeader, Table, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import ConnectionModal from './ConnectionModal';

import connectionsService from '../services/connectionsService';
import ftpService from '../services/ftpService';

const Connections = ({ history }) => {
    const [connections, setConnections] = useState([]);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        getConnections();
    }, []);

    const getConnections = async () => {
        const connections = await connectionsService.getConnections();
        setConnections(connections);
    };

    const connectToServer = async connectionData => {
        try {
            const { status, error } = await ftpService.connectToFtp({
                ...connectionData
            });

            if (error) {
                notification.error({
                    message: 'Oops...',
                    description: error
                });
            } else {
                notification.success({
                    message: status
                });

                const connectionInfo = JSON.stringify({
                    ...connectionData
                });

                sessionStorage.setItem('connection', connectionInfo);
                history.push('/content');
            }
        } catch (exception) {
            notification.error({
                message: 'Oops...',
                description: exception.message
            });
        }
    };

    const openModal = record => {
        setData(record);
        setVisible(true);
    };

    const saveData = async data => {
        if (data.id) {
            await connectionsService.editConnection(data);
            notification.success({
                message: 'Connection edited'
            });
        } else {
            await connectionsService.addConnection(data);
            notification.success({
                message: 'Connection added'
            });
        }
        setVisible(false);
        await getConnections();
        setData({});
    };

    const deleteConnection = async record => {
        await connectionsService.deleteConnection(record.id);
        await getConnections();
        notification.success({
            message: 'Connection deleted'
        });
    };

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: description => <span>{description}</span>
        },
        {
            title: 'Host',
            dataIndex: 'host',
            key: 'host',
            render: host => <span>{host}</span>
        },
        {
            title: 'Port',
            dataIndex: 'port',
            key: 'port',
            render: port => <span>{port}</span>
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: username => <span>{username}</span>
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            render: record => (
                <div className="btn-container">
                    <Button onClick={() => connectToServer(record)}>Connect</Button>
                    <Button onClick={() => openModal(record)}>Edit</Button>
                    <Button onClick={() => deleteConnection(record)}>Delete</Button>
                </div>
            )
        },
    ];

    return (
        <div className="folder-container">
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="My Connections"
                extra={[
                    <Button key="1" icon="plus" onClick={() => setVisible(true)}>Add</Button>,
                ]}
            ></PageHeader>

            <div className="table-container">
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={connections}
                    pagination={false}
                />
            </div>

            <ConnectionModal
                visible={visible}
                data={data}
                handleClose={() => { setData({}); setVisible(false) }}
                handleSave={saveData}
            />
        </div>
    );
};

export default withRouter(Connections);