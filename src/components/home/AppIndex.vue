<template>
  <el-container>
    <el-header style="margin-top: 20px;">数据库操作</el-header>
    <el-container>
      <el-main>
        <el-col style="margin: 0 10px 20px 0"
                :span="5">
          <div class="grid-content bg-purple">
            <el-input placeholder="班级号"
                      v-model="sclass_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col style="margin: 0 10px 20px 0"
                :span="5">
          <div class="grid-content bg-purple">
            <el-input placeholder="学号"
                      v-model="sno_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-input placeholder="姓名"
                      v-model="name_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type="primary"
                       @click="searchInfo">查询学生</el-button>
            <el-button type="primary"
                       @click="addStudent">添加学生</el-button>
          </div>
        </el-col>
        <template>
          <el-table :data="tableData"
                    border
                    style="width: 100%"
                    max-height="750">
            <el-table-column prop="sclass"
                             label="班级">
            </el-table-column>
            <el-table-column prop="sno"
                             label="学号">
            </el-table-column>
            <el-table-column prop="sname"
                             label="姓名">
            </el-table-column>
            <el-table-column prop="ssex"
                             label="性别">
            </el-table-column>
            <el-table-column prop="sage"
                             label="年龄">
            </el-table-column>
            <el-table-column prop="sdept"
                             label="系别">
            </el-table-column>
            <el-table-column label="操作"
                             width="180px">
              <template slot-scope="scope">
                <el-button @click="deleteStu(scope.$index, scope.row)"
                           type="danger"
                           size="small">删除</el-button>
                <el-button @click="edit(scope.$index, scope.row)"
                           type="primary"
                           size="small">编辑</el-button>
              </template>

            </el-table-column>
          </el-table>
        </template>

      </el-main>
      <el-dialog title="修改学生数据"
                 :visible.sync="dialogVisible"
                 width="30%"
                 :before-close="handleDialogClose">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">班级号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_input.sclass_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">学号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_input.sno_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">姓名</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_input.sname_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">性别</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_input.sex_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">年龄</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_input.age_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">系别</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_input.dept_input"
                        placeholder='{student_input.dept_input}'></el-input>
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
      <el-dialog title="添加学生"
                 :visible.sync="dialogAddVisible"
                 width="30%"
                 :before-close="handleDialogClose">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">班级号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_add.sclass_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">学号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_add.sno_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">姓名</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_add.sname_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">性别</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_add.sex_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">年龄</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_add.age_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">系别</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="student_add.dept_add"
                        placeholder='请输入内容'></el-input>
            </div>
          </el-col>
        </el-row>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addStudentMain">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'AppIndex',
  data () {
    return {
      isCollapse: true,
      dialogVisible: false,
      dialogAddVisible: false,
      student_input: {
        sclass_input: 0,
        sno_input: 0,
        sname_input: '',
        sex_input: '',
        age_input: 0,
        dept_input: '',
      },
      student_add: {
        sclass_add: 1,
        sno_add: 4,
        sname_add: '测试人物',
        sex_add: '男',
        age_add: 22,
        dept_add: 'CS',
      },
      sclass_search: new Number,
      sno_search: new Number,
      name_search: new String,
      tableData: [{
        sclass: new Number,
        sno: new Number,
        sname: '李勇',
        ssex: '男',
        sage: 15,
        sdept: "CS"
      }],
      deleteSno: new Number,
      deleteSclass: new Number,
      changeindex: 0
    }
  },
  created: function () {
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
    deleteStu (index, row) {
      console.log(row)
      this.deleteSno = row.sno
      this.deleteSclass = row.sclass
      var deleteName = row.sname
      this.$confirm('此操作将永久删除[' + deleteName+']学生信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var _this = this
        this.$axios
          .post('/deleteStudent', { sno: this.deleteSno, sclass: this.deleteSclass }).then(resp => {
            if (resp && resp.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.tableData.splice(index, 1)
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
        .post('/queryStudents', { sno: this.sno_search, sname: this.name_search, sclass: this.sclass_search }).then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
          }
        }).catch((failResponse) => { })
    },
    edit (index, row) {
      this.dialogVisible = true
      this.student_input.sclass_input = row.sclass
      this.student_input.sno_input = row.sno
      this.student_input.sname_input = row.sname
      this.student_input.sex_input = row.ssex
      this.student_input.age_input = row.sage
      this.student_input.dept_input = row.sdept
      this.changeindex = index
    },
    addStudent () {
      this.dialogAddVisible = true
    },
    addStudentMain () {
      console.log(this.student_input)
      var _this = this
      this.$axios
        .post('/addStudent', {
          sno: _this.student_add.sno_add,
          sname: _this.student_add.sname_add,
          sclass: _this.student_add.sclass_add,
          ssex: _this.student_add.sex_add,
          sage: _this.student_add.age_add,
          Sdept: _this.student_add.dept_add
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.tableData.push({
              sno: _this.student_add.sno_add,
              sname: _this.student_add.sname_add,
              sclass: _this.student_add.sclass_add,
              ssex: _this.student_add.sex_add,
              sage: _this.student_add.age_add,
              sdept: _this.student_add.dept_add
            })
          }
        }).catch((failResponse) => {
          this.$message.error(
            '添加失败!'
          )
        })
      console.log(this.student_input)
      this.dialogAddVisible = false

      // this.searchInfo()
    },
    changeInfo () {
      console.log(this.student_input)
      var _this = this
      this.$axios
        .post('/updateStudent', {
          sno: _this.student_input.sno_input,
          sname: _this.student_input.sname_input,
          sclass: _this.student_input.sclass_input,
          ssex: _this.student_input.sex_input,
          sage: _this.student_input.age_input,
          Sdept: _this.student_input.dept_input
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
            this.tableData.splice(this.changeindex, 1, {
              sno: _this.student_input.sno_input,
              sname: _this.student_input.sname_input,
              sclass: _this.student_input.sclass_input,
              ssex: _this.student_input.sex_input,
              sage: _this.student_input.age_input,
              sdept: _this.student_input.dept_input
            })
          }
        }).catch((failResponse) => {
          this.$message.error(
            '更新失败!'
          )
        })
      console.log(this.student_input)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
</style>
