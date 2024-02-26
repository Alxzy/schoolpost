import CreateModal from '@/pages/Admin/Tag/components/CreateModal';
import UpdateModal from '@/pages/Admin/Tag/components/UpdateModal';
import { deleteTag, listTagByPage, listTagCategory } from '@/services/tagService';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Popconfirm, Space } from 'antd';
import { Typography } from 'antd/lib';
import { useEffect, useRef, useState } from 'react';

/**
 *  删除节点
 * @param selectedRows
 */
const doDelete = async (selectedRows: TagType.Tag[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteTag({
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
 * 标签管理页面
 * @constructor
 */
const AdminTagPage: React.FC<unknown> = () => {
  // useState是React的Hook
  // 作用是在函数组件中添加状态变量
  // 返回值是一个数组,包含两个元素: 当前的状态值和更新状态值的函数
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<TagType.Tag>({});
  const [categoryValueEnum, setCategoryValueEnum] = useState<any>({});
  const actionRef = useRef<ActionType>();

  // 获取标签列表
  useEffect(() => {
    listTagCategory()
      .then((res) => {
        const tempValueEnum: any = {};
        res.data.forEach((category) => {
          tempValueEnum[category] = {
            text: category,
          };
        });
        setCategoryValueEnum(tempValueEnum);
      })
      .catch((e) => {
        message.error('获取标签分类列表失败，' + e.message);
      });
  }, []);

  /**
   * 表格列配置
   */
  const columns: ProColumns<TagType.Tag>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '名称',
      dataIndex: 'tagName',
      valueType: 'text',
    },
    {
      title: '分类',
      dataIndex: 'category',
      valueEnum: categoryValueEnum,
    },
    {
      title: '帖子数',
      dataIndex: 'postNum',
      sorter: true, // 默认从高到低降序
      defaultSortOrder: 'descend',
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

  // 分页大小参数

  return (
    <PageContainer>
      <ProTable<TagType.Tag>
        headerTitle="标签管理"
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
        // 修改位置三: 组件属性修改
        pagination={{
          pageSize: 15,
        }}
        request={async (params, sorter, filter) => {
          // 修改位置二: 有效果 但组件显示冲突
          // params.pageSize = 15

          const { data, code } = await listTagByPage({
            ...params,
            // @ts-ignore
            sorter,
            filter,
            // 修改位置一: 有效果 但组件显示冲突
            // pageSize: 15,
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
export default AdminTagPage;
