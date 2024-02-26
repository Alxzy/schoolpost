import { updatePost } from '@/services/postService';
import { ProColumns, ProTable } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
import { PropsWithChildren } from 'react';

// 定义接口
interface UpdateModalProps {
  oldData: PostType.Post;
  modalVisible: boolean;
  columns: ProColumns<PostType.Post>[];
  onSubmit: () => void;
  onCancel: () => void;
}

// 处理修改用户属性的函数
/**
 * 更新数据模态框
 * @param fields
 */
const handleUpdate = async (fields: PostType.Post) => {
  const hide = message.loading('正在修改');
  try {
    await updatePost(fields);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

/**
 * 创建数据模态框
 */
const UpdateModal: React.FC<PropsWithChildren<UpdateModalProps>> = (props) => {
  const { oldData, modalVisible, columns, onSubmit, onCancel } = props;
  return (
    /** ant design模态对话框组件 Modal */
    <Modal
      destroyOnClose
      title="修改"
      visible={modalVisible} // 根据状态调整是否显示
      onCancel={() => onCancel()} // 取消则调用 onCancel() 函数
      footer={null} // 不显示页脚
    >
      {/*procomponents 表格组件 ProTble,用于显示和操作数据 */}
      <ProTable<PostType.Post, PostType.Post>
        onSubmit={async (value) => {
          const success = await handleUpdate({
            ...value,
            id: oldData.id,
          });
          if (success) {
            onSubmit?.();
          }
        }}
        rowKey="id"
        type="form"
        columns={columns}
        form={{
          initialValues: oldData,
        }}
      />
    </Modal>
  );
};

export default UpdateModal;
