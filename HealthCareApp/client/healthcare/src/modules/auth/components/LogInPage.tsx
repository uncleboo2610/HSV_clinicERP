import { Input, Button, Form, message, Row, Col } from 'antd';
import React, { useState } from 'react'
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useUserProfileStore } from '../store/auth.store';
import { staffService } from '../../staff/services/staff.service';

interface ILoginForm{
    username: string
    password: string
}

export const LogInPage = () => {
    const [err, setErr] = useState<Error | null>(null);
    const { loadProfile } = useUserProfileStore();
    const navigate = useNavigate()

    const onFinish = (values: ILoginForm) => {
        authService.logIn(values)
            .then(( token ) => {
                authService.saveToken(String(token));
                loadProfile();
                navigate('/');
            })
            .catch((e) => {
                setErr(e)
                message.error(err + "")
            })
    };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <Row justify="center" align="middle" style={{minHeight: '100vh'}}>
        <Col>
            <Form
                name="login"
                labelAlign="left"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Tên người dùng"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
  )
}