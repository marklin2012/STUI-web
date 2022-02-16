# STUI

# 导航

- [技术栈](#技术栈)
- [系统必装依赖](#系统必装依赖)(安装必看 👏)
- [如何安装](#如何安装)(安装必看 👏)
- [开发常用命令](#开发常用命令)(编码必看 ⌨️)
- [项目目录结构](#项目目录结构)(编码必看 ⌨️)
- [分支规范](#分支规范)(编码必看 ⌨️)
- [代码提交](#代码提交)(编码必看 ⌨️)
- [如何开发组件](#如何开发组件)(编码必看 ⌨️)(待补充)

# 技术栈

- React
- less
- TypeScript
- dumi.js
- Koa

# 系统必装依赖

- [Node.js 16+](https://nodejs.org/zh-cn/)
- [nrm](https://github.com/Pana/nrm) (管理 node 源)
- [Yarn](https://yarnpkg.com/)

# 如何安装

1. 安装系统依赖请按照上述的清单安装，版本符合要求即可

2. 安装并配置 yarn
   > yarn 不要使用 npm!

```bash
brew install yarn
```

3. nrm 使用 淘宝源

```bash
nrm use taobao
```

4. 下载项目代码

5. 安装依赖

```bash
yarn
```

6. 启动项目

```bash
yarn start
```

# 开发常用命令

```bash
yarn start      # 开发以启动项目
```

# 项目目录结构

```bash
.
├── README.md
├── docs                        # 组件库文档目录
│   └── index.md                # 组件库文档首页目录
├── package.json
├── public                      # 公共资源目录
│   └── images
│       ├── logo.png
│       └── logo.svg
├── src                         # 组件库源码目录
│   ├── alert                   # 单个组件（示意）
│   │   ├── index.md            # 组件文档
│   │   ├── index.test.tsx      # 组件测试源码
│   │   ├── index.tsx           # 组件源码
│   │   └── style               # 组件样式目录
│   │       ├── index.less      # 组件样式源码
│   │       └── index.ts        # 组件样式入口
│   └── index.ts                # 组件库入口文件
├── .umirc.ts                   # dumi 配置文件
├── tsconfig.json
├── typings.d.ts
└── yarn.lock
```

# 分支规范

提交的格式为：`<type>: <subject>`，type 用于说明 commit 的类别，subject 是 commit 原因的简短描述，type 可以使用如下类别：

| commit 前缀   | 说明                     |
| ------------- | ------------------------ |
| **init:**     | 项目初始化               |
| **feat:**     | 增加新功能               |
| **fix:**      | 修补 bug                 |
| **doc:**      | 修改文档                 |
| **change:**   | 不影响代码功能的变动     |
| **refactor:** | 对某个功能进行了重构     |
| **test:**     | 增加测试                 |
| **chore:**    | 构建过程或辅助工具的变动 |

> 比如我在工程里新增了一个组件， commit 的格式就是 feat:新增 XX 组件

# 代码提交

（待部署提交语法检查）~~代码提交前会**自动**检查代码语法，检查不过关会提交失败。~~

需要注意：

- 检查每行被 staged 的代码，不要提交无关重要的代码！
- 不要提交无意义的 `print()`
- 合并代码时记得通过提 PR 的方式，并且 assign 给管理员：

# 如何开发组件

1. 在 src 创建组件目录，并在 `index.tsx` 文件中实现组件代码
2. 在 `style/index.less` 文件中实现组件样式
3. 在 `src/index.ts` 文件中引用组件
4. 在 `index.md` 文件中实现示例代码及使用说明

具体操作如下（以 alert 为例）:

## 1. 创建组件目录，并实习组件代码

在 `src` 目录下创建 `alert` 目录，目录结构如下:

```bash
├── src                         # 组件库源码目录
│   ├── alert                   # 单个组件（示意）
│   │   ├── index.md            # 组件文档
│   │   ├── index.test.tsx      # 组件测试源码
│   │   ├── index.tsx           # 组件源码
│   │   └── style               # 组件样式目录
│   │       ├── index.less      # 组件样式源码
│   │       └── index.ts        # 组件样式入口
```

示例代码如下：

```js
// src/alert/index.tsx

import React from 'react'
import types from 'prop-types'

export interface AlertProps {
  kind?: 'info' | 'success' | 'danger' | 'warning';
}

export type KindMap = Record<Required<AlertProps>['kind'], string>

const prefixCls = 'st-alert'

const kinds: KindMap = {
  info: '#095BF920',
  success: '#49C56420',
  danger: '#FF414120',
  warning: '#FFA92720',
}

const Alert: React.FC<AlertProps> = ({ children, kind = 'info', ...rest }) => (
  <div
    className={prefixCls}
    style={{
      background: kinds[kind],
    }}
    {...rest}
  >
    {children}
  </div>
)

Alert.propTypes = {
  kind: types.oneOf(['info', 'success', 'danger', 'warning']),
}

export default Alert
```

## 2. 实现组件样式

实现组件样式代码

```js
// src/alert/style/index.less
@popupPrefix: st-alert;

.@{popupPrefix} {
  padding: 20px;
  color: white;
  background: white;
  border-radius: 3px;
}

```

引用样式代码

```js
// src/alert/style/index.ts

import './index.less'
```

## 3. 引用组件

引用组件

```js
// src/index.ts

export { default as Alert } from './alert'
```

## 4. 实现示例代码及使用说明

````js
// src/alert/index.md

---
title: Alert 警告提示
nav:
title: 组件
order: 2
group:
title: 反馈
order: 1
---

# Alert 警告提示

警告提示，展现需要关注的信息。

## 代码演示

### 基本用法

```jsx
import React from 'react'
import { Alert } from 'stui'

export default () => <Alert kind="warning">这是一条警告提示</Alert>
```
````
