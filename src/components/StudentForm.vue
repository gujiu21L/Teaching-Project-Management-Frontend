<template>
    <el-form :model="student" @submit.prevent="handleSubmit">
      <el-form-item label="姓名">
        <el-input v-model="student.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="student.email"></el-input>
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="student.major"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  export default {
    name: 'StudentForm',
    data() {
      return {
        student: {
          name: '',
          email: '',
          major: ''
        }
      };
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', this.student);
        this.student.name = '';
        this.student.email = '';
        this.student.major = '';
      }
    }
  };
  </script>
  