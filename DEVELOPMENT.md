### API 规范

设计原则

1. 尽量符合 React 对于 Component 的开发要求。
2. API 设计上参考 uxcore。
3. 优先完成一个组件的受控模式。


### 组件实现

- 尽量使用 react-component/xx 的组件, 有问题 pr 到 react-component/xx
- 尽量使用知名开源组件

### 组件规范

新组件请参考 `src/Button`, `demo/Button` 和 `docs/Button` 中对于源码，demo 和文档的要求。

## 开发流程

```bash
$ npm install
```

### 开发调试

调试单个组件使用参数 `-m component-name`

```bash
$ npm start -- -m text-field
```

### 提交代码

自己从 master 新开一个分支开发.

```bash
git checkout -b feature/xxxx
```

开发完成后。

```bash
$ git add --all
$ git commit -am "描述"
$ git pull --rebase origin master
# 解决冲突
$ git push origin xx-feature:xx-feature
```

提交 merge request 到 master