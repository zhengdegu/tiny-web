<template> 
<div class="app-container">
  <el-card class="filter-container" shadow="never">
    <div>
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button
        style="float:right"
        type="primary"
        @click="handleSearchList()"
        size="small">
        查询搜索
      </el-button>
      <el-button
        style="float:right;margin-right: 15px"
        @click="handleResetSearch()"
        size="small">
        重置
      </el-button>
    </div>
    <div style="margin-top: 15px">
      <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
        <el-form-item label="输入搜索：">
          <el-input v-model="listQuery.keyword" class="input-width" placeholder="用户" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <div class="table-container">
    <el-table ref="logTable"
              :data="list"
              style="width: 100%;"
              v-loading="listLoading" border>
      <el-table-column label="编号" width="100" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="用户" width="160" align="center">
        <template slot-scope="scope">{{scope.row.username}}</template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">{{scope.row.description}}</template>
      </el-table-column>
      <!--
      <el-table-column label="日志类型" align="center">
        <template slot-scope="scope">{{scope.row.logType}}</template>
      </el-table-column>
      -->
      <!--
      <el-table-column label="方法" align="center">
        <template slot-scope="scope">{{scope.row.method}}</template>
      </el-table-column>
      <el-table-column label="参数" width="160" align="center">
        <template slot-scope="scope">{{scope.row.params}}</template>
      </el-table-column>
      -->
      <el-table-column label="请求IP" width="140" align="center">
        <template slot-scope="scope">{{scope.row.requestIp}}</template>
      </el-table-column>
      <el-table-column label="耗时(毫秒)" width="160" align="center">
        <template slot-scope="scope">{{scope.row.time}}</template>
      </el-table-column>
      <el-table-column label="地址" width="160" align="center">
        <template slot-scope="scope">{{scope.row.address}}</template>
      </el-table-column>
      <el-table-column label="浏览器" width="160" align="center">
        <template slot-scope="scope">{{scope.row.browser}}</template>
      </el-table-column>
      <!--
      <el-table-column label="异常信息" width="160" align="center">
        <template slot-scope="scope">{{scope.row.exceptionDetail}}</template>
      </el-table-column>
      -->
      <el-table-column label="请求URL" width="160" align="center">
        <template slot-scope="scope">{{scope.row.url}}</template>
      </el-table-column>
      <el-table-column label="时间" width="160" align="center">
        <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
      </el-table-column>

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="pagination-container">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes,prev, pager, next,jumper"
      :current-page.sync="listQuery.pageNum"
      :page-size="listQuery.pageSize"
      :page-sizes="[10,15,20]"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>
<script>
  import {fetchList,deleteLog} from '@/api/log';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null
  };
  const defaultLog = {
    id: null,
    username: null,
    description: null,
    logType: null,
    method: null,
    params: null,
    requestIp: null,
    time: null,
    address: null,
    browser: null,
    exceptionDetail: null,
    createTime: null,
    url: null
  };
  export default {
    name: 'logList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        log: Object.assign({}, defaultLog),
        isEdit: false,
        allocDialogVisible: false,
        allocRoleIds:[],
        allRoleList:[],
        allocAdminId:null
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },

      handleDelete(index, row) {
        this.$confirm('是否要删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteLog(row.id).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style></style>




