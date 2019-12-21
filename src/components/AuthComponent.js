import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import ftpService from '../services/ftpService';
import { withRouter } from 'react-router-dom';

const AuthComponent = ({ history }) => {
    const [host, setHost] = useState('127.0.0.1');
    const [port, setPort] = useState('10021');
    const [username, setUsername] = useState('krampi');
    const [password, setPassword] = useState('krampi123');
    const [secure, setSecure] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const connectData = sessionStorage.getItem('connection');
        if (connectData) {
            history.push('/content')
        }
    }, [history])

    const handleSubmit = async event => {
        event.preventDefault();
        setLoading(true);

        try {
            const { status, error } = await ftpService.connectToFtp({
                host,
                port: parseInt(port),
                username,
                secure,
                password
            });

            if (error) {
                notification.error({
                    message: 'Oops...',
                    description: error
                });
                setLoading(false);
            } else {
                notification.success({
                    message: status
                });

                const connectionData = JSON.stringify({
                    host,
                    port: parseInt(port),
                    username,
                    secure,
                    password
                });

                sessionStorage.setItem('connection', connectionData);
                setLoading(false);
                history.push('/content');
            }
        } catch (exception) {
            console.log(exception);
        }
    };

    return (
        <div className="container">
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    <Input
                        placeholder="Host"
                        onChange={event => setHost(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Port"
                        onChange={event => setPort(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        onChange={event => setUsername(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Checkbox
                        onChange={event => setSecure(event.target.checked)}
                    >
                        SFTP connection
                    </Checkbox>
                </Form.Item>
                <div className="btn-container">
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                        Connect
                    </Button>
                    <Button type="primary" className="login-form-button" onClick={() => history.push('my-connections')}>
                        My connections
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default withRouter(AuthComponent);