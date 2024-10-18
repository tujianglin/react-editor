import eventStore from '@/Editor/store/eventStore';
import { Button, Flex, Form, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import { DraggableRequestParam } from 'react-moveable';

const Group = observer(() => {
  const { moveableRef } = eventStore!;

  /** 顶对齐 */
  const alignTop = () => {
    const rect = moveableRef!.getRect();
    const moveables = moveableRef!.getMoveables();
    if (moveables.length <= 1) {
      return;
    }
    moveables.forEach((child) => {
      child.request<DraggableRequestParam>(
        'draggable',
        {
          y: Math.round(rect.top),
        },
        true,
      );
    });
    moveableRef?.updateRect();
  };
  /** 底对齐 */
  const alignBottom = () => {
    const rect = moveableRef!.getRect();
    const moveables = moveableRef!.getMoveables();

    if (moveables.length <= 1) {
      return;
    }
    moveables.forEach((child) => {
      child.request<DraggableRequestParam>(
        'draggable',
        {
          y: Math.round(rect.top + rect.height),
        },
        true,
      );
    });

    moveableRef?.updateRect();
  };

  /** 左对齐 */
  const alignLeft = () => {
    const rect = moveableRef!.getRect();
    const moveables = moveableRef!.getMoveables();

    if (moveables.length <= 1) {
      return;
    }
    moveables.forEach((child) => {
      child.request<DraggableRequestParam>(
        'draggable',
        {
          x: Math.round(rect.left),
        },
        true,
      );
    });

    moveableRef?.updateRect();
  };
  /** 右对齐 */
  const alignRight = () => {
    const rect = moveableRef!.getRect();
    const moveables = moveableRef!.getMoveables();

    if (moveables.length <= 1) {
      return;
    }
    moveables.forEach((child) => {
      child.request<DraggableRequestParam>(
        'draggable',
        {
          x: Math.round(rect.left + rect.width - (child.props?.target ? (child.props.target as any).offsetWidth : 0)),
        },
        true,
      );
    });

    moveableRef?.updateRect();
  };
  /** 水平居中对齐 */
  const alignVerticalCenter = () => {
    const rect = moveableRef!.getRect();
    const moveables = moveableRef!.getMoveables();

    if (moveables.length <= 1) {
      return;
    }
    moveables.forEach((child, i) => {
      child.request<DraggableRequestParam>(
        'draggable',
        {
          y: Math.round(rect.top + rect.height / 2 - rect.children![i].height / 2),
        },
        true,
      );
    });

    moveableRef?.updateRect();
  };

  /** 垂直居中对齐 */
  const alignHorizontalCenter = () => {
    const rect = moveableRef!.getRect();
    const moveables = moveableRef!.getMoveables();

    if (moveables.length <= 1) {
      return;
    }
    moveables.forEach((child, i) => {
      child.request<DraggableRequestParam>(
        'draggable',
        {
          x: Math.round(rect.left + rect.width / 2 - rect.children![i].width / 2),
        },
        true,
      );
    });

    moveableRef?.updateRect();
  };
  /** 垂直居中对齐 */
  const arrangeVerticalSpacing = () => {
    const groupRect = moveableRef!.getRect();
    const moveables = moveableRef!.getMoveables();
    let top = groupRect.top;

    if (moveables.length <= 1) {
      return;
    }
    const gap =
      (groupRect.height -
        groupRect.children!.reduce((prev, cur) => {
          return prev + cur.height;
        }, 0)) /
      (moveables.length - 1);

    moveables.sort((a, b) => {
      return a.state.top - b.state.top;
    });
    moveables.forEach((child) => {
      const rect = child.getRect();
      child.request<DraggableRequestParam>(
        'draggable',
        {
          y: Math.round(top),
        },
        true,
      );

      top += rect.height + gap;
    });

    moveableRef?.updateRect();
  };
  /** 垂直居中对齐 */
  const arrangeHorizontalSpacing = () => {
    const groupRect = moveableRef!.getRect();
    const moveables = moveableRef!.getMoveables();
    let left = groupRect.left;

    if (moveables.length <= 1) {
      return;
    }
    const gap =
      (groupRect.width -
        groupRect.children!.reduce((prev, cur) => {
          return prev + cur.width;
        }, 0)) /
      (moveables.length - 1);

    moveables.sort((a, b) => {
      return a.state.left - b.state.left;
    });
    moveables.forEach((child) => {
      const rect = child.getRect();
      child.request<DraggableRequestParam>(
        'draggable',
        {
          x: Math.round(left),
        },
        true,
      );

      left += rect.width + gap;
    });

    moveableRef?.updateRect();
  };
  return (
    <Form labelAlign="left" colon={false} labelCol={{ span: 6 }}>
      <Form.Item label={'对齐方式'}>
        <Flex gap={6} wrap>
          <Flex gap={6}>
            <Tooltip title="左对齐">
              <Button type="primary" onMouseDown={alignLeft}>
                <i className="iconfont icon-align-left-two" />
              </Button>
            </Tooltip>
            <Tooltip title="右对齐">
              <Button type="primary" onMouseDown={alignRight}>
                <i className="iconfont icon-align-right-two" />
              </Button>
            </Tooltip>
            <Tooltip title="水平居中">
              <Button type="primary" onMouseDown={alignVerticalCenter}>
                <i className="iconfont icon-align-vertical-center-two" />
              </Button>
            </Tooltip>
            <Tooltip title="水平等分">
              <Button type="primary" onMouseDown={arrangeVerticalSpacing}>
                <i className="iconfont icon-vertical-spacing-between-items" />
              </Button>
            </Tooltip>
          </Flex>
          <Flex gap={6}>
            <Tooltip title="顶对齐">
              <Button type="primary" onMouseDown={alignTop}>
                <i className="iconfont icon-align-top-two" />
              </Button>
            </Tooltip>
            <Tooltip title="底对齐">
              <Button type="primary" onMouseDown={alignBottom}>
                <i className="iconfont icon-align-bottom-two" />
              </Button>
            </Tooltip>
            <Tooltip title="垂直居中">
              <Button type="primary" onMouseDown={alignHorizontalCenter}>
                <i className="iconfont icon-align-horizontal-center-two" />
              </Button>
            </Tooltip>
            <Tooltip title="垂直等分">
              <Button type="primary" onMouseDown={arrangeHorizontalSpacing}>
                <i className="iconfont icon-horizontal-spacing-between-items" />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
      </Form.Item>
    </Form>
  );
});
export default Group;
