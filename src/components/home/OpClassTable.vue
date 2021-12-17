<template>
  <el-container>
    <el-header style="margin-top: 20px;">数据库操作</el-header>
    <el-container>
      <el-main>
        <el-col style="margin: 0 10px 20px 0"
                :span="5">
          <div class="grid-content bg-purple">
            <el-input placeholder="课程号"
                      v-model="cno_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-input placeholder="课程名"
                      v-model="cname_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type="primary"
                       @click="searchInfo">查询课程</el-button>
            <el-button type="primary"
                       @click="addClass">添加课程</el-button>
          </div>
        </el-col>
        <template>
          <el-table :data="tableData"
                    border
                    style="width: 100%">
            <el-table-column prop="cno"
                             label="课程号">
            </el-table-column>
            <el-table-column prop="cname"
                             label="姓名">
            </el-table-column>
            <el-table-column prop="cpno"
                             label="先修课号">
            </el-table-column>
            <el-table-column prop="ccredit"
                             label="学分">
            </el-table-column>
            <el-table-column label="操作"
                             width="180px">
              <template slot-scope="scope">
                <el-button @click="deleteClass(scope.row)"
                           type="danger"
                           size="small">删除</el-button>
                <el-button @click="edit(scope.row)"
                           type="primary"
                           size="small">编辑</el-button>
              </template>

            </el-table-column>
          </el-table>
        </template>

      </el-main>
      <el-dialog title="修改数据"
                 :visible.sync="dialogVisible"
                 width="30%"
                 :before-close="handleDialogClose">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">课程号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="class_input.cno_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">课程名</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="class_input.cname_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">先修课号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="class_input.cpno_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">学分</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="class_input.ccredit_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="changeInfo">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="添加数据"
                 :visible.sync="dialogAddVisible"
                 width="30%"
                 :before-close="handleDialogClose">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">课程号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="class_add.cno_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">课程名</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="class_add.cname_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">先修课号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="class_add.cpno_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">学分</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="class_add.ccredit_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addClassMain">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'OpClassTable',
  data () {
    return {
      isCollapse: true,
      dialogVisible: false,
      dialogAddVisible: false,
      class_input: {
        cno_input: 4,
        cname_input: '测试课程',
        cpno_input: 0,
        ccredit_input: 1,
      },
      class_add: {
        cno_add: 4,
        cname_add: '测试课程',
        cpno_add: 0,
        ccredit_add: 1,
      },
      cno_search: 0,
      cpno_search: -1,
      ccredit_search: 0,
      cname_search: '',
      tableData: [{
        cno: 4,
        cname: '测试课程',
        cpno: 0,
        ccredit: 1
      }],
      deleteCno: 0
    }
  },
  created: function(){
    this.searchInfo()
  },
  methods: {
    handleClick (row) {
      console.log(row);
    },
    handleDialogClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    deleteClass (row) {
      this.deleteCno = row.cno
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var _this = this
        this.$axios
          .post('/deleteClass', { cno: this.deleteCno }).then(resp => {
            if (resp && resp.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          }).catch((failResponse) => {
            this.$message.error(
              '删除失败!'
            )
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    searchInfo () {
      var _this = this
      this.$axios
        .post('/queryClasses', { cno: this.cno_search, cname: this.cname_search, cpno: this.cpno_search, ccredit: this.ccredit_search }).then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
          }
        }).catch((failResponse) => { })
    },
    edit (row) {
      this.dialogVisible = true
      this.class_input.cno_input = row.cno
      this.class_input.cname_input = row.cname
      this.class_input.cpno_input = row.cpno
      this.class_input.ccredit_input = row.ccredit
    },
    addClass () {
      this.dialogAddVisible = true
    },
    addClassMain () {
      var _this = this
      this.$axios
        .post('/addClass', {
          cno: _this.class_add.cno_add,
          cname: _this.class_add.cname_add,
          cpno: _this.class_add.cpno_add,
          ccredit: _this.class_add.ccredit_add
        }).then(resp => {
          if (resp && resp.status === 200) {
          }
        }).catch((failResponse) => {
          this.$message.error(
            '添加失败!'
          )
        })
      this.dialogAddVisible = false
      this.searchInfo()
    },
    changeInfo () {
      var _this = this
      this.$axios
        .post('/updateClass', {
          cno: _this.class_input.cno_input,
          cname: _this.class_input.cname_input,
          cpno: _this.class_input.cpno_input,
          ccredit: _this.class_input.ccredit_input
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
          }
        }).catch((failResponse) => {
          this.$message.error(
            '更新失败!'
          )
        })
      this.dialogVisible = false
      this.searchInfo()
    }
  }
}
</script>

<style scoped>
</style>
