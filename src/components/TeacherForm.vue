<template>
    <el-form :model="teacher" @submit.prevent="handleSubmit">
      <el-form-item label="姓名">
        <el-input v-model="teacher.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="teacher.email"></el-input>
      </el-form-item>
      <el-form-item label="系别">
        <el-input v-model="teacher.department"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    name: 'TeacherForm',
    data() {
      return {
        teacher: {
          name: '',
          email: '',
          department: ''
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', this.teacher);
        this.teacher.name = '';
        this.teacher.email = '';
        this.teacher.department = '';
      }
    }
  };
  </script>
  