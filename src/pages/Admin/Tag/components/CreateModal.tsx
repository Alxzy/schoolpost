import { addTag } from '@/services/tagService';
import { ProColumns, ProTable } from '@ant-design/pro-table';
import { message, Modal } from 'antd';
import { PropsWithChildren } from 'react';

// 定义接口
interface CreateModalProps {
  modalVisible: boolean;
  columns: ProColumns<TagType.Tag>[];
  onSubmit: () => void;
  onCancel: () => void;
}

// 处理添加用户的函数
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TagType.Tag) => {
  const hide = message.loading('正在添加');
  try {
    await addTag({ ...fields } as TagType.TagAddRequest);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 创建数据模态框
 */
const CreateModal: React.FC<PropsWithChildren<CreateModalProps>> = (props) => {
  const { modalVisible, columns, onSubmit, onCancel } = props;
  return (
    /** ant design模态对话框组件 Modal */
    <Modal
      destroyOnClose
      title="新建"
      visible={modalVisible} // 根据状态调整是否显示
      onCancel={() => onCancel()} // 取消则调用 onCancel() 函数
      footer={null} // 不显示页脚
    >
      {/*procomponents 表格组件 ProTble,用于显示和操作数据 */}
      <ProTable<TagType.Tag, TagType.Tag>
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            onSubmit?.();
          }
        }}
        rowKey="id"
        type="form"
        columns={columns}
      />
    </Modal>
  );
};

export default CreateModal;
