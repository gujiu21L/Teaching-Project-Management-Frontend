<template>
  <footer class="footer">
    <p>&copy; 2024 教学项目管理系统</p>
    <p>本实践为 数据库课程设计：课程设计教学项目管理系统数据库的设计与实现</p>
    <div class="links">
      <strong>GitHub 地址：</strong>
      <ul>
        <li><a href="https://github.com/gujiu21L/Teaching-Project-Management-Frontend" target="_blank">前端代码</a></li>
        <li><a href="https://github.com/gujiu21L/Teaching-Project-Management-Backend" target="_blank">后端代码</a></li>
        <li><a href="https://github.com/gujiu21L/" target="_blank">前往我(孤酒21L)的 GitHub</a></li>
      </ul>
    </div>
    <div class="links">
      <strong>相关链接：</strong>
      <ul>
        <li><a href="https://inmerealm.com" target="_blank">主站：inMeRealm</a></li>
      </ul>
    </div>
    <div class="certificates">
      <a class="settings-footer_color" href="http://beian.miit.gov.cn" target="_blank">鲁ICP备2024092678号</a>
      <br>
      <a class="settings-footer_color" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37150302000163" target="_blank">
        <img src="https://asset.ibanquan.com/common/img/safe/gongan.png" alt="安全备案" /> 鲁公网安备 37150302000163号
      </a>
    </div>
    <p>自证：付兴顺</p>
    <div class="powered-by">
      <p>Powered by <a href="https://inmerealm.com" target="_blank">inMeRealm</a></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style>
.footer {
  text-align: center;
  padding: 20px;
  background: #f2f2f2;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
}

.footer p {
  margin: 10px 0;
}

.links {
  margin: 20px 0;
}

.links strong {
  display: block;
  margin-bottom: 10px;
}

.links ul {
  list-style: none;
  padding: 0;
}

.links ul li {
  display: inline;
  margin: 0 10px;
}

.links a {
  color: #337ab7;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

.certificates {
  margin: 20px 0;
}

.certificates a {
  color: #337ab7;
  text-decoration: none;
  font-size: 12px;
}

.certificates img {
  width: 19px;
  height: auto;
  margin-right: 8px;
  margin-left: 8px;
  display: inline-block;
  vertical-align: middle;
}

.certificates a:hover {
  text-decoration: underline;
}

.powered-by {
  margin-top: 20px;
}

.powered-by a {
  color: #337ab7;
  text-decoration: none;
  font-weight: bold;
}

.powered-by a:hover {
  text-decoration: underline;
}
</style>
