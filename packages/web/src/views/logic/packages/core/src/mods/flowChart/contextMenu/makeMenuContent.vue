<script>
  import {
    Graph
  } from '@antv/x6';

  export default {
    props: {
      flowChart: {
        type: Graph
      },
      menuConfig: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    render(createElement) {
      const loop = (config) => {
        return config.map((item) => {
          let content = null;

          let {
            key,
            title,
            icon,
            children,
            disabled = false,
            showDividerBehind,
          } = item;

          if (typeof disabled === 'function') {
            disabled = disabled(this.flowChart);
          }

          if (children && children.length > 0) {
            content = createElement('el-menu-item-group', title, {
              props: {
                index: key,
                disabled
              }
            }, loop(children));
          } else {
            const itemChildren = [createElement('i', {
                attrs: {
                  class: icon,
                }
              }),
              createElement('span', title)
            ];

            if (showDividerBehind) {
              itemChildren.push(createElement('el-divider'));
            }

            content = createElement('el-menu-item', {
              props: {
                index: key,
                disabled
              }
            }, itemChildren);
          }

          return content;
        });
      };

      return createElement('div', loop(this.menuConfig));
    }
  }
</script>