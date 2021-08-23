// 画布组件
import TextComponent from '../components/TextComponent';
import ButtonComponent from '../components/ButtonComponent';
import ImgComponent from '../components/ImgComponent';

import { isTextComponent, isButtonComponent, isImgComponent } from './index';

export const getMapComponent = (comp) => {
  const { data } = comp;
  switch (data.type) {
    case isTextComponent:
      return <TextComponent {...data} />;
    case isButtonComponent:
      return <ButtonComponent {...data} />;
    case isImgComponent:
      return <ImgComponent {...data} />;
    default:
      break;
  }
};
