<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
    <el-menu-item index="2"><router-link to="/teachers">教师</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/students">学生</router-link></el-menu-item>
    <el-menu-item index="4"><router-link to="/projects">项目</router-link></el-menu-item>
    <el-menu-item index="5"><router-link to="/participation">项目参与情况</router-link></el-menu-item>

    <div class="menu-right">
      <a href="https://inmerealm.com" target="_blank" class="inmerealm-link">
        <img src="https://inmerealm.com/img/favicon.png" alt="inMeRealm" class="inmerealm-logo">
        inMeRealm
      </a>
    </div>
  </el-menu>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      activeIndex: '1'
    };
  }
};
</script>

<style>
.el-menu-demo {
  background-color: #545c64;
  color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-menu-item {
  color: #fff;
}

.el-menu-item a {
  color: #fff;
  text-decoration: none;
}

.el-menu-item a:hover {
  color: #ffd04b;
}

.menu-right {
  display: flex;
  align-items: center;
}

.inmerealm-link {
  color: #262222;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.inmerealm-link:hover {
  color: #ffd04b;
}

.inmerealm-logo {
  width: 20px;
  height: auto;
  margin-right: 8px;
}
</style>
