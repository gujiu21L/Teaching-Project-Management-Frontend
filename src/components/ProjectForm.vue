<template>
  <el-form :model="project" @submit.prevent="handleSubmit">
    <el-form-item label="项目名称">
      <el-input v-model="project.projectName"></el-input>
    </el-form-item>
    <el-form-item label="开始日期">
      <el-date-picker v-model="project.startDate" type="date"></el-date-picker>
    </el-form-item>
    <el-form-item label="结束日期">
      <el-date-picker v-model="project.endDate" type="date"></el-date-picker>
    </el-form-item>
    <el-form-item label="教师ID">
      <el-input v-model="project.teacherID" type="number"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ProjectForm',
  data() {
    return {
      project: {
        projectName: '',
        startDate: '',
        endDate: '',
        teacherID: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.project);

      // 获取并格式化 startDate
      let startDate = new Date(this.project.startDate);
      const startYear = startDate.getFullYear();
      const startMonth = ('0' + (startDate.getMonth() + 1)).slice(-2);
      const startDay = ('0' + startDate.getDate()).slice(-2);
      this.project.startDate = `${startYear}-${startMonth}-${startDay}`;

      // 获取并格式化 endDate
      let endDate = new Date(this.project.endDate);
      const endYear = endDate.getFullYear();
      const endMonth = ('0' + (endDate.getMonth() + 1)).slice(-2);
      const endDay = ('0' + endDate.getDate()).slice(-2);
      this.project.endDate = `${endYear}-${endMonth}-${endDay}`;
      console.log(this.project);
      // 触发提交事件
      this.$emit('submit', { ...this.project });

      // 重置表单
      this.resetForm();
    },
    resetForm() {
      this.project.projectName = '';
      this.project.startDate = '';
      this.project.endDate = '';
      this.project.teacherID = '';
    }
  }
};
</script>
