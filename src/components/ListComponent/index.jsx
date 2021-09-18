/**
 * 列表1：https://www.fastmock.site/mock/3b83adfdb4747ac5f286e201f1410110/visual/img/list
 * 列表2：https://www.fastmock.site/mock/3b83adfdb4747ac5f286e201f1410110/visual/update/img/list
 *
 */

import { useEffect, useState } from 'react';
import { formatStyle } from '../../utils';
import styles from './index.less';

export default function ListComponent(data) {
  const { style, value: requestUrl } = data;
  const [compList, setCompList] = useState([]);

  const getData = async () => {
    const res = await fetch(requestUrl);
    const resJson = await res.json();
    const { code, data = {} } = resJson;
    if (code === 0) {
      const { list = [] } = data;
      setCompList(list);
    }
  };
  useEffect(() => {
    getData();
  }, [data.value]);

  return (
    <div className={styles.main} style={formatStyle(style, false)}>
      {compList.map((comp) => (
        <img key={comp.id} src={comp.url} alt="img" className={styles.img} />
      ))}
    </div>
  );
}
