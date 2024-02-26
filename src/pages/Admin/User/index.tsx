import CreateModal from '@/pages/Admin/User/components/CreateModal';
import UpdateModal from '@/pages/Admin/User/components/UpdateModal';
import { deleteUser, listUserByPage } from '@/services/userService';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Space } from 'antd';
import { Typography } from 'antd/lib';
import { useRef, useState } from 'react';

/**
 *  删除节点
 * @param selectedRows
 */
const doDelete = async (selectedRows: UserType.User[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUser({
      id: selectedRows.find((row) => row.id)?.id || 0,
    });
    message.success('操作成功');
  } catch (e: any) {
    message.error('操作失败，' + e.message);
  } finally {
    hide();
  }
};
/**
 * 用户管理页面
 * @constructor
 */
const AdminUserPage: React.FC<unknown> = () => {
  // useState是React的Hook
  // 作用是在函数组件中添加状态变量
  // 返回值是一个数组,包含两个元素: 当前的状态值和更新状态值的函数
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UserType.User>({});
  const actionRef = useRef<ActionType>();

  /**
   * 表格列配置
   */
  const columns: ProColumns<UserType.User>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '用户昵称',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
    },
    {
      title: '用户头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInForm: true,
      valueEnum: {
        0: { text: '男' },
        1: { text: '女' },
      },
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link
            onClick={() => {
              setUpdateData(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="您确定要删除吗?"
            onConfirm={() => doDelete([record])}
            okText="确认"
            cancelText="取消"
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserType.User>
        headerTitle="用户管理"
        actionRef={actionRef} // 触发表格的操作：重置和查询
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={() => setCreateModalVisible(true)}>
            新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, code } = await listUserByPage({
            ...params,
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.records || [],
            success: code === 0,
            total: data.total,
          } as any;
        }}
        columns={columns}
      />

      <CreateModal
        modalVisible={createModalVisible}
        columns={columns}
        onSubmit={() => {}}
        onCancel={() => setCreateModalVisible(false)}
      />
      <UpdateModal
        oldData={updateData}
        modalVisible={updateModalVisible}
        columns={columns}
        onSubmit={() => {}}
        onCancel={() => setUpdateModalVisible(false)}
      />
    </PageContainer>
  );
};
export default AdminUserPage;
