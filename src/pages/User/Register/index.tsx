// @ts-ignore
import Logo from '@/assets/logo.svg';
import GlobalFooter from '@/components/GlobalFooter';
import { DEFAULT_NAME } from '@/constants';
import { register } from '@/services/ant-design-pro/api';
import { Link } from '@@/exports';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, SelectLang } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'umi';
import Settings from '../../../../config/defaultSettings';

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const navigate = useNavigate();

  const doUserRegister = async (fields: UserType.UserRegisterRequest) => {
    const hide = message.loading('注册中');
    // 添加校验确认密码的逻辑
    const { userPassword, checkPassword } = fields;
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    try {
      // 注册
      const res = await register({ ...fields });
      if (res.data > 0) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        navigate('/user/login', {
          replace: true,
        });
        // 这个 else 是为了方便展示错误信息
      } else {
        message.error(res.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      hide();
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册页'}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm<UserType.UserRegisterRequest>
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={Logo}
          title={DEFAULT_NAME}
          subTitle="简约干净的恋爱信息展示平台"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (formData) => {
            await doUserRegister(formData);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账号密码注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />

              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="密码是必填项！"
                      />
                    ),
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '密码长度不能小于8位',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="确认密码是必填项！"
                      />
                    ),
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '确认密码长度不能小于8位',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="/user/login">返回登录页</Link>
            <Link
              to="/"
              style={{
                float: 'right',
              }}
            >
              返回主页
            </Link>
          </div>
        </LoginForm>
      </div>
      <GlobalFooter />
    </div>
  );
};

export default Register;
