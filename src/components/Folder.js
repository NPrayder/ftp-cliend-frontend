import React, { useState, useEffect } from 'react';
import ftpService from '../services/ftpService';
import Item from './Item';
import { Empty, notification, Divider } from 'antd';

const Folder = ({ connection, directory, changePath, levelUp, onDownload }) => {
    const [dirContent, setDirContent] = useState([]);

    useEffect(() => {
        const getDirContent = async () => {
            setDirContent([]);
            const { files, error } = await ftpService.getDirContent(connection, directory);

            if (error) {
                notification.error({
                    message: 'Oops...',
                    description: error
                });
            } else {
                setDirContent(files);
            }
        };

        if (connection.host) {
            getDirContent();
        }
    }, [directory, connection]);

    if (dirContent.length === 0) {
        return (
            <div className="folder">
                {directory.split('/').length > 1 && <Divider onClick={levelUp}><span className="link">Level up...</span></Divider>}
                <div className="empty-container">
                    <Empty />
                </div>
            </div>
        )
    }

    return (
        <div className="folder">
            {directory.split('/').length > 1 && <Divider onClick={levelUp}><span className="link">Level up...</span></Divider>}
            {
                dirContent.map((file, index) => <Item
                    file={file}
                    key={index}
                    changePath={changePath}
                    onDownload={onDownload}
                />)
            }
        </div>
    )
};

export default Folder;