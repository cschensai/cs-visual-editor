// dynamic import components
import { memo, useMemo } from 'react';
import TextComponent from '@/components/TextComponent';
import ButtonComponent from '@/components/ButtonComponent';
import ImgComponent from '@/components/ImgComponent';
import ListComponent from '@/components/ListComponent';
import TabsComponent from '@/components/TabsComponent';
import {
  isTextComponent,
  isButtonComponent,
  isImgComponent,
  isListComponent,
  isTabsComponent,
} from '@/utils/index';

const getMapComponent = (data) => {
  switch (data.type) {
    case isTextComponent:
      return TextComponent;
    case isButtonComponent:
      return ButtonComponent;
    case isImgComponent:
      return ImgComponent;
    case isListComponent:
      return ListComponent;
    case isTabsComponent:
      return TabsComponent;
    default:
      break;
  }
};

const MapComp = memo((props) => {
  const { comp } = props;
  const Dynamic = useMemo(() => {
    return getMapComponent(comp.data);
  }, [comp?.data]);
  return <Dynamic {...comp?.data} />;
});

export default MapComp;
