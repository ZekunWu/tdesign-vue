import props from './sticky-item-props';
import { TdStickyItemProps } from './type';
import { ClassName, Styles } from '../common';
import Popup from '../popup';
import { renderTNodeJSX } from '../utils/render-tnode';
import mixins from '../utils/mixins';
import getConfigReceiverMixins, { getGlobalIconMixins } from '../config-provider/config-receiver';

export default mixins(getConfigReceiverMixins('sticky-item'), getGlobalIconMixins()).extend({
  name: 'TStickyItem',
  props: {
    ...props,
    type: String,
    shape: String,
    placement: String,
    basePopupProps: Object,
    baseWidth: String,
    onClick: Function,
    onHover: Function,
  },
  computed: {
    baseClass(): ClassName {
      return [`${this.componentName}`, `${this.componentName}--${this.type}`, `${this.componentName}--${this.shape}`];
    },
    labelClass(): ClassName {
      return [`${this.componentName}__label`];
    },
    popupPlacement(): String {
      return this.placement.indexOf('right') !== -1 ? 'left' : 'right';
    },
    styles(): Styles {
      const styles: Styles = {};
      if (this.baseWidth) {
        const size = `calc(${this.baseWidth} - 8px)`;
        styles.width = size;
        styles.height = size;
      }
      return styles;
    },
  },
  render() {
    const icon = renderTNodeJSX(this, 'icon');
    const label = renderTNodeJSX(this, 'label');
    // const on = { ...this.$listeners };
    // if (typeof this.onClick === 'function') {
    //   on.click = this.onClick;
    // }
    return (
      <Popup
        trigger={this.trigger}
        hideEmptyPopup={true}
        placement={this.popupPlacement}
        content={this.popup}
        props={this.popupProps || this.basePopupProps}
      >
        <div class={this.baseClass} style={this.styles} onClick={this.handleItemClick}>
          {icon}
          {this.type === 'normal' ? <div class={this.labelClass}>{label}</div> : null}
        </div>
      </Popup>
    );
  },
  methods: {
    handleItemClick(e: MouseEvent, item: TdStickyItemProps) {
      this.onClick(e, item);
    },
  },
});
