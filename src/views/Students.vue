<template>
  <div>
    <h1>学生管理</h1>
    <StudentForm @submit="addStudent"></StudentForm>
    <el-input
      placeholder="请输入关键词进行查找"
      v-model="searchKeyword"
      @input="searchStudents"
      style="margin-bottom: 20px;"
    />
    <el-table :data="students">
      <el-table-column prop="studentID" label="学生ID"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="editStudent(scope.row)">编辑</el-button>
          <el-button @click="deleteStudent(scope.row.studentID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑学生" v-model="editDialogVisible">
      <el-form :model="editStudentForm">
        <el-form-item label="学生ID">
          <el-input v-model="editStudentForm.studentID" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editStudentForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editStudentForm.email"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="editStudentForm.major"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEditStudent">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import StudentForm from '../components/StudentForm.vue';
import api from '../api/index.js';

export default {
  name: 'Students',
  components: {
    StudentForm
  },
  data() {
    return {
      students: [],
      searchKeyword: '',
      editDialogVisible: false,
      editStudentForm: {
        studentID: '',
        name: '',
        email: '',
        major: ''
      }
    };
  },
  methods: {
    async fetchStudents() {
      const response = await api.get('/student/getAllStudents');
      this.students = response.data.data;
    },
    async addStudent(student) {
      await api.post('/student/addStudent', student);
      this.fetchStudents();
    },
    async deleteStudent(id) {
      await api.delete(`/student/deleteStudent?studentId=${id}`);
      this.fetchStudents();
    },
    editStudent(student) {
      this.editStudentForm = { ...student };
      this.editDialogVisible = true;
    },
    async submitEditStudent() {
      await api.post('/student/updateStudent', this.editStudentForm);
      this.editDialogVisible = false;
      this.fetchStudents();
    },
    async searchStudents() {
      const response = await api.get(`/student/searchStudents?keyword=${this.searchKeyword}`);
      this.students = response.data.data;
    }
  },
  created() {
    this.fetchStudents();
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
