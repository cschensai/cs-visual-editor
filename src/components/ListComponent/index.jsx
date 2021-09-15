import { useEffect, useState } from 'react';
import { formatStyle } from '../../utils';
import styles from './index.less';

export default function ListComponent(data) {
  const [compList, setCompList] = useState([]);

  const { style, requestUrl } = data;
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
  }, [data]);

  return (
    <div className={styles.main} style={formatStyle(style, false)}>
      {compList.map((comp) => (
        <p key={comp.id}>ListComponent</p>
      ))}
    </div>
  );
}
