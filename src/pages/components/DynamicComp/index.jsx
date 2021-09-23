// dynamic import components
import { memo, useMemo } from 'react';
import { dynamic } from 'umi';
import {
  isTextComponent,
  isButtonComponent,
  isImgComponent,
  isListComponent,
  isTabsComponent,
} from '@/utils/index';

const getMapComponent = (data) => {
  return dynamic({
    loader: async function () {
      let Component = null;
      switch (data.type) {
        case isTextComponent:
          const { default: TextComponent } = await import(
            '@/components/TextComponent'
          );
          Component = TextComponent;
          break;
        case isButtonComponent:
          const { default: ButtonComponent } = await import(
            '@/components/ButtonComponent'
          );
          Component = ButtonComponent;
          break;
        case isImgComponent:
          const { default: ImgComponent } = await import(
            '@/components/ImgComponent'
          );
          Component = ImgComponent;
          break;
        case isListComponent:
          const { default: ListComponent } = await import(
            '@/components/ListComponent'
          );
          Component = ListComponent;
          break;
        case isTabsComponent:
          const { default: TabsComponent } = await import(
            '@/components/TabsComponent'
          );
          Component = TabsComponent;
          break;
        default:
          break;
      }
      return () => <Component {...data} />;
    },
    loading: () => <div style={{ textAlign: 'center' }}>操作中...</div>,
  });
};

const DynamicComp = memo((props) => {
  const { comp } = props;
  const Dynamic = useMemo(() => {
    return getMapComponent(comp.data);
  }, [comp?.data]);
  return <Dynamic />;
});

export default DynamicComp;
