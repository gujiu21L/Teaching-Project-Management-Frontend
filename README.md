# 教学项目管理系统

本项目为数据库课程设计，旨在实现一个教学项目管理系统，包括教师、学生、项目及其参与情况的管理。

## 项目简介

教学项目管理系统旨在帮助教师和学生更有效地管理教学项目。教师可以创建、更新和删除项目，学生可以查看和参与项目，并管理自己的参与情况。

## 功能特性

- **项目管理**：教师可以创建、更新、删除项目，并查看项目详细信息。
- **参与管理**：管理学生参与项目的情况，包括角色分配。
- **数据展示**：通过前端页面展示教师、学生、项目和参与信息。

## 技术栈

- 前端：Vue.js, Element UI
- 后端：Java, Servlet, JDBC
- 数据库：MySQL
- 工具：Maven, Lombok

## 安装与运行

### 前端

1. 克隆前端代码库：
    ```sh
    git clone https://github.com/gujiu21L/Teaching-Project-Management-Frontend.git
    cd Teaching-Project-Management-Frontend
    ```

2. 安装依赖：
    ```sh
    npm install
    ```

3. 运行开发服务器：
    ```sh
    npm run dev
    ```

### 后端

1. 克隆后端代码库：
    ```sh
    git clone https://github.com/gujiu21L/Teaching-Project-Management-Backend.git
    cd Teaching-Project-Management-Backend
    ```

2. 配置数据库：
    - 创建数据库并导入 `schema.sql` 文件。
    - 在 `resources/jdbc.properties` 中配置数据库连接信息。
      
## 目录结构

### 前端

```
Teaching-Project-Management-Frontend
├── public
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── router
│   ├── store
│   ├── views
│   ├── App.vue
│   ├── main.js
│   └── ...
├── package.json
└── ...
```

### 后端

[后端项目地址](https://github.com/gujiu21L/Teaching-Project-Management-Backend)

## 关于作者

- **GitHub**: [孤酒21L](https://github.com/gujiu21L)
- **主站**: [inMeRealm](https://inmerealm.com)
