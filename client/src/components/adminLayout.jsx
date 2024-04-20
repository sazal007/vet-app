import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { LuLayoutDashboard } from "react-icons/lu";
import { TbBrandProducthunt } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { MdChecklistRtl } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { Layout, Menu, Button, theme, Popover, Badge } from 'antd';
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
import { FaRegBell } from "react-icons/fa6";
import { ChatState } from "../context/chatProvider";
import { logoutUser } from "../apis/auth/userApi";
import axios from "axios";
import { useToast } from "../context/toastProvider";

// eslint-disable-next-line react/prop-types
const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = ChatState();
  const { showToast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleNotification = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/get-notification`, { userId: user._id }, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      if (res.data.success) {
        showToast(res.data.message, "success");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const content = (
    <div className="w-[17rem] bg-slate-50 p-2 rounded cursor-pointer">
      {
        user?.notification.map((n, i) => (
          <div key={i} className="flex items-center justify-between" onClick={() => navigate('/admin/doctors-list')}>
            <div onClick={() => handleNotification()}><p>{n.message}</p></div>
          </div>
        ))
      }
    </div>
  );

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  }
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
                icon: <LuLayoutDashboard />,
                label: 'Dashboard',
              },
              {
                key: '/admin/products',
                icon: <TbBrandProducthunt />,
                label: 'Products',
              },
              {
                key: '/admin/users',
                icon: <FaRegUser />,
                label: 'Users',
              },
              {
                key: '/admin/doctors-list',
                icon: <MdChecklistRtl />,
                label: 'Doctors Requests',
              },
              {
                key: '/admin/orders',
                icon: <LiaClipboardListSolid />,
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
              <div className="mt-2 flex items-center gap-4">
                <Popover content={content} title="Notifications" trigger="click">
                  <Badge size="small" count={user?.notification.length}>
                    <FaRegBell className="text-xl cursor-pointer" />
                  </Badge>
                </Popover>
                <button className="btn btn-error cursor-pointer" onClick={handleLogout} >Logout</button>
              </div>
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