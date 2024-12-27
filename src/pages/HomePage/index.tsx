import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { invoke } from "@tauri-apps/api/core";
import { createWebviewWindow } from "@/utils";
import { Switch } from 'antd';
import "./index.css";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import {  message, Upload,Select } from 'antd';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAIQuery = async () => {
    try {
      const aiResponse = await invoke('ask_ai', { query });
      setResponse(aiResponse as string);
      createWebviewWindow(`/result?query=${query}`, 'result-window');

    } catch (error) {
      setResponse('Error: Unable to get a response.');
    }
  };

  const props: UploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  
  return (
    <div className="home">
      <div className="input-container">

        <Input
          placeholder="Ask a question..."
          value={query}
          onChange={handleInputChange}
          style={{ marginBottom: 20 }}
        />
          <div className="toolbar">
          <div style={{gap: '20px'}}>
          {/* <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={[
      {
        value: 'jack',
        label: 'Jack',
      },
      {
        value: 'lucy',
        label: 'Lucy',
      },
      {
        value: 'tom',
        label: 'Tom',
      },
    ]}
  /><Upload {...props}>
    <a>上传</a>
  </Upload> */}
  <Switch checkedChildren="联网" unCheckedChildren="离线" />
      </div>
      <div style={{gap: '20px'}}>



        <Button type="primary" onClick={handleAIQuery}>
          Ask AI
        </Button>
        </div>
     
          </div>
  
      </div>

      {/* {response && (
        <div className="response">
          <h3>AI Response:</h3>
          <p>{response}</p>
        </div>
      )} */}
    </div>
  );
};

export default App;
