

```

import { ProFormSelect, ProFormText } from '@ant-design/pro-form';

<ProFormDependency name={['country']}>
  {({ country }) => {
    // 假设有一个函数 getCapital 可以根据国家名称返回首都
    const capital = getCapital(country);
    return (
      <ProFormText name="capital" label="Capital" value={capital} readOnly />
    );
  }}
</ProFormDependency>

<ProFormSelect
  name="country"
  label="Country"
  options={[
    { label: 'China', value: 'China' },
    { label: 'USA', value: 'USA' },
    // ...
  ]}
/>

// 当用户选择不同的国家时，ProFormDependency 会自动调用 getCapital 函数并更新首都输入框的值。
```