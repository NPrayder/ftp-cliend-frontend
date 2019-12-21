import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Checkbox, Icon } from 'antd';

const ConnectionModal = ({ data, visible, handleClose, handleSave }) => {
    const [host, setHost] = useState(data.host || '');
    const [port, setPort] = useState(data.port || 21);
    const [username, setUsername] = useState(data.username || '');
    const [password, setPassword] = useState(data.password || '');
    const [secure, setSecure] = useState(data.secure);
    const [description, setDescription] = useState(data.description || '')

    useEffect(() => {
        setHost(data.host || '');
        setPort(data.port || 21);
        setUsername(data.username || '');
        setPassword(data.password || '');
        setSecure(data.secure);
        setDescription(data.description || '');
    }, [data]);

    const save = () => {
        handleSave({
            id: data.id,
            host,
            port,
            username,
            password,
            secure,
            description
        });
    };

    return (
        <Modal
            visible={visible}
            closeIcon=" "
            onOk={() => save()}
            onCancel={handleClose}
            destroyOnClose={true}
        >
            <Form >
                <Form.Item>
                    <Input
                        placeholder="Description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Host"
                        value={host}
                        onChange={event => setHost(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Port"
                        value={port}
                        onChange={event => setPort(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Checkbox
                        checked={secure}
                        onChange={event => setSecure(event.target.checked)}
                    >
                        SFTP connection
                    </Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ConnectionModal;