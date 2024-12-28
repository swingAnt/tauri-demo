import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { createWebviewWindow } from "@/utils";
import { Upload,Switch,Select } from 'antd';
import "./index.css";
import type { UploadProps } from 'antd';
import {  message, } from 'antd';
import {
  UploadOutlined
} from '@ant-design/icons';
const App: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAIQuery = async () => {
    try {
      createWebviewWindow(`/result?query=${query}`, 'result-window');

    } catch (error) {
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
          <div className='button-container'>
       模型:   <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="label"
    // onChange={onChange}
    // onSearch={onSearch}
    defaultValue={'codegeex-3.5'}
    options={[
      {
        value: 'codegeex-3.5',
        label: 'codegeex-3.5',
      },
      {
        value: 'codegeex-4',
        label: 'codegeex-4',
      },
      {
        value: 'codegeex-4pro',
        label: 'codegeex-4pro',
      },
    ]}
  />
        
      </div>
      <div className='button-container'>

      <Upload {...props}>
   <UploadOutlined />
  </Upload>
  <Switch checkedChildren="联网" unCheckedChildren="离线" />

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
