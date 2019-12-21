import React from 'react';
import { Icon, Button } from 'antd';

const Item = ({ file, changePath, onDownload }) => {
    if (file.type === 'folder') {
        return (
            <div
                onClick={() => changePath(file.name)}
                className="link folder-item"
            >
                <Icon type="folder" className="icon" />{file.name}
            </div>
        );
    } else {
        return (
            <div className="item-container">
                <div className="folder-item">
                    {file.name}
                </div>
                <Button icon="download" onClick={() => onDownload(file.name)}>Download</Button>
            </div>
        );
    }
};

export default Item;