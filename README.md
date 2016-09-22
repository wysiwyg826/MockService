# MockService
> just for lazy

> 结合mockjs,完成前端模拟增删改查的操作.

# 地址
> git clone https://github.com/PINGFAN826/MockService.git

# 方法

```javascript

const localDatabase = new LocalDB('testDB', 1); //新建数据库

localDatabase.connect().then(function (pf) { //连接数据库
  // pf.createDocment('mock', 'uid'); //创建表 mock 和自增主键 uid
  // pf.insertItem('mock', data.list); //新增数据 array
  // pf.fetchItems('mock', 4, 10); //获取多条数据 表名, 游标, limit
  pf.updateItem('mock', 143, { //更新数据, 表名,主键值
    AMOUNT: 123,
    CUSID: 2,
    CUSPNM: 'dadasd',
    DAY: 321,
    uid: 143,
  });
});
```

# 下个版本的目标
 * 制作数据库操作面板
 * 实现xhr的拦截
 * 完成与mockjs的接口对接