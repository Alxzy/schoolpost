import { updateUser } from '@/services/userService';
import { ProColumns, ProTable } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
import { PropsWithChildren } from 'react';

// 定义接口
interface UpdateModalProps {
  oldData: UserType.User;
  modalVisible: boolean;
  columns: ProColumns<UserType.User>[];
  onSubmit: () => void;
  onCancel: () => void;
}

// 处理修改用户属性的函数
/**
 * 修改节点
 * @param fields
 */
const handleUpdate = async (fields: UserType.User) => {
  const hide = message.loading('正在修改');
  try {
    await updateUser({
      id: fields.id ?? 0,
      ...fields,
    } as UserType.UserUpdateRequest);
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
      <ProTable<UserType.User, UserType.User>
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
