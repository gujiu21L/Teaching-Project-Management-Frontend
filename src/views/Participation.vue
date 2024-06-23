<template>
    <div>
      <h1>参与管理</h1>
  
      <!-- 查看项目的参与学生 -->
      <el-select v-model="selectedProject" placeholder="选择项目" @change="fetchParticipationsByProject">
        <el-option
          v-for="project in projects"
          :key="project.projectID"
          :label="project.projectName"
          :value="project.projectID"
        ></el-option>
      </el-select>
      <el-table :data="participations" style="margin-bottom: 20px;">
        <el-table-column prop="studentID" label="学生ID"></el-table-column>
        <el-table-column prop="studentName" label="学生姓名"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="editParticipation(scope.row)">编辑</el-button>
            <el-button @click="deleteParticipation(scope.row.participationID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 学生参与项目 -->
      <el-select v-model="selectedStudent" placeholder="选择学生" @change="fetchParticipationsByStudent">
        <el-option
          v-for="student in students"
          :key="student.studentID"
          :label="student.name"
          :value="student.studentID"
        ></el-option>
      </el-select>
      <el-table :data="studentParticipations" style="margin-bottom: 20px;">
        <el-table-column prop="projectID" label="项目ID"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="editParticipation(scope.row)">编辑</el-button>
            <el-button @click="deleteParticipation(scope.row.participationID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 学生加入或退出项目 -->
      <el-form @submit.prevent="handleAddParticipation">
        <el-form-item label="选择学生">
          <el-select v-model="newParticipation.studentID" placeholder="选择学生">
            <el-option
              v-for="student in students"
              :key="student.studentID"
              :label="student.name"
              :value="student.studentID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择项目">
          <el-select v-model="newParticipation.projectID" placeholder="选择项目">
            <el-option
              v-for="project in projects"
              :key="project.projectID"
              :label="project.projectName"
              :value="project.projectID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="newParticipation.role" placeholder="输入角色"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddParticipation">加入项目</el-button>
        </el-form-item>
      </el-form>
  
      <!-- 编辑参与信息 -->
      <el-dialog title="编辑参与" v-model="editDialogVisible">
        <el-form :model="editParticipationForm">
          <el-form-item label="学生ID">
            <el-input v-model="editParticipationForm.studentID" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="editParticipationForm.role"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitEditParticipation">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import api from '../api/index.js';
  
  export default {
    name: 'Participation',
    data() {
      return {
        projects: [],
        students: [],
        selectedProject: '',
        selectedStudent: '',
        participations: [],
        studentParticipations: [],
        newParticipation: {
          studentID: '',
          projectID: '',
          role: ''
        },
        editDialogVisible: false,
        editParticipationForm: {
          participationID: '',
          studentID: '',
          role: ''
        }
      };
    },
    methods: {
      async fetchProjects() {
        const response = await api.get('/project/getAllProjects');
        this.projects = response.data.data;
      },
      async fetchStudents() {
        const response = await api.get('/student/getAllStudents');
        this.students = response.data.data;
      },
      async fetchParticipationsByProject(projectID) {
        const response = await api.get(`/participation/getParticipationsByProjectId?projectId=${projectID}`);
        this.participations = response.data.data;
        await this.addStudentNamesToParticipations(this.participations);
      },
      async fetchParticipationsByStudent(studentID) {
        const response = await api.get(`/participation/getParticipationsByStudentId?studentId=${studentID}`);
        this.studentParticipations = response.data.data;
        await this.addProjectNamesToParticipations(this.studentParticipations);
      },
      async addStudentNamesToParticipations(participations) {
        for (let participation of participations) {
          const student = this.students.find(s => s.studentID === participation.studentID);
          if (student) {
            participation.studentName = student.name;
          }
        }
      },
      async addProjectNamesToParticipations(participations) {
        for (let participation of participations) {
          const project = this.projects.find(p => p.projectID === participation.projectID);
          if (project) {
            participation.projectName = project.projectName;
          }
        }
      },
      async handleAddParticipation() {
        await api.post('/participation/addParticipation', this.newParticipation);
        this.newParticipation = {
          studentID: '',
          projectID: '',
          role: ''
        };
        if (this.selectedProject) {
          this.fetchParticipationsByProject(this.selectedProject);
        }
        if (this.selectedStudent) {
          this.fetchParticipationsByStudent(this.selectedStudent);
        }
      },
      editParticipation(participation) {
        this.editParticipationForm = { ...participation };
        this.editDialogVisible = true;
      },
      async submitEditParticipation() {
        await api.post('/participation/updateParticipation', this.editParticipationForm);
        this.editDialogVisible = false;
        if (this.selectedProject) {
          this.fetchParticipationsByProject(this.selectedProject);
        }
        if (this.selectedStudent) {
          this.fetchParticipationsByStudent(this.selectedStudent);
        }
      },
      async deleteParticipation(participationID) {
        await api.post(`/participation/deleteParticipation?participationId=${participationID}`);
        if (this.selectedProject) {
          this.fetchParticipationsByProject(this.selectedProject);
        }
        if (this.selectedStudent) {
          this.fetchParticipationsByStudent(this.selectedStudent);
        }
      }
    },
    created() {
      this.fetchProjects();
      this.fetchStudents();
    }
  };
  </script>
  
  <style scoped>
  .dialog-footer {
    text-align: right;
  }
  </style>
  