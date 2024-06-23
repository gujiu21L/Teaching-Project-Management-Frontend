<template>
  <div>
    <h1>教师管理</h1>
    <TeacherForm @submit="addTeacher"></TeacherForm>
    <el-input
      placeholder="请输入关键词进行查找"
      v-model="searchKeyword"
      @input="searchTeachers"
      style="margin-bottom: 20px;"
    />
    <el-table :data="teachers" @filter-change="handleFilterChange">
      <el-table-column prop="teacherID" label="教师ID" sortable="custom" :filters="filters.teacherID" :filter-method="filterTeacherID"></el-table-column>
      <el-table-column prop="name" label="姓名" sortable="custom" :filters="filters.name" :filter-method="filterName"></el-table-column>
      <el-table-column prop="email" label="邮箱" sortable="custom" :filters="filters.email" :filter-method="filterEmail"></el-table-column>
      <el-table-column prop="department" label="系别" sortable="custom" :filters="filters.department" :filter-method="filterDepartment"></el-table-column>
      <el-table-column label="操作">
        <template v-slot:default="scope">
          <el-button @click="editTeacher(scope.row)">编辑</el-button>
          <el-button @click="deleteTeacher(scope.row.teacherID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑教师" v-model="editDialogVisible">
      <el-form :model="editTeacherForm">
        <el-form-item label="教师ID">
          <el-input v-model="editTeacherForm.teacherID" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editTeacherForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editTeacherForm.email"></el-input>
        </el-form-item>
        <el-form-item label="系别">
          <el-input v-model="editTeacherForm.department"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditTeacher">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import TeacherForm from '../components/TeacherForm.vue';
import api from '../api/index.js';

export default {
  name: 'Teachers',
  components: {
    TeacherForm
  },
  data() {
    return {
      teachers: [],
      searchKeyword: '',
      editDialogVisible: false,
      editTeacherForm: {
        teacherID: '',
        name: '',
        email: '',
        department: ''
      },
      filters: {
        teacherID: [],
        name: [],
        email: [],
        department: []
      }
    };
  },
  methods: {
    async fetchTeachers() {
      const response = await api.get('/teacher/getAllTeachers');
      this.teachers = response.data.data;
      this.initializeFilters();
    },
    initializeFilters() {
      const keys = ['teacherID', 'name', 'email', 'department'];
      keys.forEach(key => {
        this.filters[key] = this.teachers.map(teacher => ({
          text: teacher[key],
          value: teacher[key]
        }));
      });
    },
    async addTeacher(teacher) {
      await api.post('/teacher/addTeacher', teacher);
      this.fetchTeachers();
    },
    async deleteTeacher(id) {
      api.delete(`/teacher/deleteTeacher?teacherId=${id}`)
        .then(response => {
          if (response.data.code === 200) {
            this.$message.success('删除成功');
            this.fetchTeachers();
          } else {
            this.$message.error('删除失败');
          }
        })
        .catch(error => {
          this.$message.error('删除失败');
          console.error(error);
        });
    },
    editTeacher(teacher) {
      this.editTeacherForm = { ...teacher };
      this.editDialogVisible = true;
    },
    async submitEditTeacher() {
      await api.post('/teacher/updateTeacher', this.editTeacherForm);
      this.editDialogVisible = false;
      this.fetchTeachers();
    },
    async searchTeachers() {
      const response = await api.get(`/teacher/searchTeachers?keyword=${this.searchKeyword}`);
      this.teachers = response.data.data;
      this.initializeFilters();
    },
    filterTeacherID(value, row) {
      return row.teacherID === value;
    },
    filterName(value, row) {
      return row.name === value;
    },
    filterEmail(value, row) {
      return row.email === value;
    },
    filterDepartment(value, row) {
      return row.department === value;
    },
    handleFilterChange(filters) {
      console.log(filters);
    }
  },
  created() {
    this.fetchTeachers();
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
