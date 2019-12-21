import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { PageHeader, Button } from 'antd';
import Folder from './Folder';
import ftpService from '../services/ftpService';

const ServerContent = ({ history }) => {
    const [connectionData, setConnectionData] = useState({});
    const [currentDir, setCurrentDir] = useState('');

    useEffect(() => {
        const connectionData = sessionStorage.getItem('connection');

        if (!connectionData) {
            return history.push('/connect');
        }
        setConnectionData(JSON.parse(connectionData));
    }, [history]);

    const changePath = path => {
        setCurrentDir(currentDir + '/' + path);
    };

    const levelUp = () => {
        const newDir = currentDir.split('/');
        newDir.pop();
        setCurrentDir(newDir.join('/'));
    };

    const downloadFile = async fileName => {
        await ftpService.downloadFile(connectionData, currentDir, fileName);
    };

    const logout = () => {
        sessionStorage.clear();
        history.push('/connect');
    };

    return (
        <div className="folder-container">
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                title={connectionData.host}
                subTitle={connectionData.username}
                extra={[
                    <Button key="1" icon="logout" onClick={logout}>Log out</Button>
                ]}
            />
            <Folder
                connection={connectionData}
                directory={currentDir}
                changePath={changePath}
                levelUp={levelUp}
                onDownload={downloadFile}
            />
        </div>
    );
};

export default withRouter(ServerContent);