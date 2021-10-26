// // dynamic import components
// import { memo, useMemo } from 'react';
// import { dynamic } from 'umi';
// import {
//   isTextComponent,
//   isButtonComponent,
//   isImgComponent,
//   isListComponent,
//   isTabsComponent,
// } from '@/utils/index';

// const getMapComponent = (data) => {
//   return dynamic({
//     loader: async function () {
//       let Component = null;
//       switch (data.type) {
//         case isTextComponent:
//           const { default: TextComponent } = await import(
//             '@/components/TextComponent'
//           );
//           Component = TextComponent;
//           break;
//         case isButtonComponent:
//           const { default: ButtonComponent } = await import(
//             '@/components/ButtonComponent'
//           );
//           Component = ButtonComponent;
//           break;
//         case isImgComponent:
//           const { default: ImgComponent } = await import(
//             '@/components/ImgComponent'
//           );
//           Component = ImgComponent;
//           break;
//         case isListComponent:
//           const { default: ListComponent } = await import(
//             '@/components/ListComponent'
//           );
//           Component = ListComponent;
//           break;
//         case isTabsComponent:
//           const { default: TabsComponent } = await import(
//             '@/components/TabsComponent'
//           );
//           Component = TabsComponent;
//           break;
//         default:
//           break;
//       }
//       return () => <Component {...data} />;
//     },
//     loading: () => <div style={{ textAlign: 'center' }}>loading...</div>,
//   });
// };

// const DynamicComp = memo((props) => {
//   const { comp } = props;
//   const currComp = getMapComponent(comp?.data);
//   const Dynamic = useMemo(() => currComp, [comp?.data]);
//   return <Dynamic />;
// });

// export default DynamicComp;

import { Suspense, lazy } from 'react';
const ButtonComponent = lazy(() => import('@/components/ButtonComponent'));
const ImgComponent = lazy(() => import('@/components/ImgComponent'));
const ListComponent = lazy(() => import('@/components/ListComponent'));
const TabsComponent = lazy(() => import('@/components/TabsComponent'));
const TextComponent = lazy(() => import('@/components/TextComponent'));
import {
  isTextComponent,
  isButtonComponent,
  isImgComponent,
  isListComponent,
  isTabsComponent,
} from '@/utils/index';
const map_comp = {
  [isTextComponent]: TextComponent,
  [isButtonComponent]: ButtonComponent,
  [isImgComponent]: ImgComponent,
  [isListComponent]: ListComponent,
  [isTabsComponent]: TabsComponent,
};
export default (props) => {
  const { comp } = props;
  const { data = {} } = comp;
  const Comp = map_comp[data.type];
  return (
    <Suspense fallback={<span>loading...</span>}>
      <Comp {...data} />;
    </Suspense>
  );
};
