import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

// eslint-disable-next-line react/prop-types
const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout className="min-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="bg-primary">
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
              navigate(key);
            }}
            items={[
              {
                key: '/admin/dashboard',
                icon: <UserOutlined />,
                label: 'Dashboard',
              },
              {
                key: '/admin/products',
                icon: <VideoCameraOutlined />,
                label: 'Products',
              },
              {
                key: '/admin/users',
                icon: <UploadOutlined />,
                label: 'Users',
              },
              {
                key: '/admin/doctors-list',
                icon: <UploadOutlined />,
                label: 'Doctors',
              },
              {
                key: '/admin/orders',
                icon: <UploadOutlined />,
                label: 'Orders',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div
              style={{
                float: 'right',
                marginRight: 16,
              }}
            >
              <button className="btn btn-error">Logout</button>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default AdminLayout