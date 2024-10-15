import { MoveableManagerInterface } from 'react-moveable';

export const DimensionViewable = {
  name: 'dimensionViewable',
  props: ['dimensionViewable'],
  render(moveable: MoveableManagerInterface) {
    const rect = moveable.getRect();

    return (
      <div
        key="dimension-viewer"
        style={{
          position: 'absolute',
          left: `${rect.width / 2}px`,
          top: `${rect.height + 6}px`,
          background: '#4af',
          borderRadius: '2px',
          padding: '2px 4px',
          color: 'white',
          fontSize: '13px',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          willChange: 'transform',
          transform: `translate(-50%, 0px)`,
        }}
      >
        {Math.round(rect.offsetWidth)} x {Math.round(rect.offsetHeight)}
      </div>
    );
  },
} as const;
