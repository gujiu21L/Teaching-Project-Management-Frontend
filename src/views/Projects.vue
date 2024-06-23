<template>
  <div>
    <h1>项目管理</h1>
    <ProjectForm @submit="addProject"></ProjectForm>
    <el-input
      placeholder="请输入关键词进行查找"
      v-model="searchKeyword"
      @input="searchProjects"
      style="margin-bottom: 20px;"
    />
    <el-table :data="projects">
      <el-table-column prop="projectID" label="项目ID"></el-table-column>
      <el-table-column prop="projectName" label="项目名称"></el-table-column>
      <el-table-column prop="startDate" label="开始日期" :formatter="formatDate"></el-table-column>
      <el-table-column prop="endDate" label="结束日期" :formatter="formatDate"></el-table-column>
      <el-table-column prop="teacherID" label="教师ID"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="editProject(scope.row)">编辑</el-button>
          <el-button @click="deleteProject(scope.row.projectID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑项目" v-model="editDialogVisible">
      <el-form :model="editProjectForm">
        <el-form-item label="项目ID">
          <el-input v-model="editProjectForm.projectID" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="editProjectForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="editProjectForm.startDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker v-model="editProjectForm.endDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="教师ID">
          <el-input v-model="editProjectForm.teacherID" type="number"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditProject">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import ProjectForm from '../components/ProjectForm.vue';
import api from '../api/index.js';
import { format, parseISO, isDate } from 'date-fns';

export default {
  name: 'Projects',
  components: {
    ProjectForm
  },
  data() {
    return {
      projects: [],
      searchKeyword: '',
      editDialogVisible: false,
      editProjectForm: {
        projectID: '',
        projectName: '',
        startDate: '',
        endDate: '',
        teacherID: ''
      }
    };
  },
  methods: {
    async fetchProjects() {
      const response = await api.get('/project/getAllProjects');
      this.projects = response.data.data;
    },
    async addProject(project) {
      console.log("add")
      await api.post('/project/addProject', project);
      this.fetchProjects();
    },
    async deleteProject(projectId) {
      await api.post(`/project/deleteProject?projectId=${projectId}`);
      this.fetchProjects();
    },
    editProject(project) {
      this.editProjectForm = { ...project };
      console.log(this.editProjectForm) ; 
      this.editDialogVisible = true;
    },
    async submitEditProject() {
      console.log(this.editProjectForm) ; 
      this.editProjectForm.startDate = this.formatDateForAPI(this.editProjectForm.startDate);
      this.editProjectForm.endDate = this.formatDateForAPI(this.editProjectForm.endDate);
      console.log()
      console.log(this.editProjectForm) ; 
      await api.post('/project/updateProject', this.editProjectForm);
      this.editDialogVisible = false;
      this.fetchProjects();
    },
    async searchProjects() {
      const response = await api.get(`/project/searchProjects?keyword=${this.searchKeyword}`);
      this.projects = response.data.data;
    },
    formatDate(row, column, cellValue) {
      if (!cellValue) return '';
      const date = new Date(cellValue);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },
    formatDateForAPI(date) {
      if (!date) return '';
      if (isDate(date)) {
        return format(date, 'yyyy-MM-dd');
      }
      return format(parseISO(date), 'yyyy-MM-dd');
    }
  },
  created() {
    this.fetchProjects();
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
