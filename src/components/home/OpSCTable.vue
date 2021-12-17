<template>
  <el-container>
    <el-header  style="margin-top: 20px;">数据库操作</el-header>
    <el-container>
      <el-main>
        <el-col style="margin: 0 10px 20px 0"
                :span="3">
          <div class="grid-content bg-purple">
            <el-input placeholder="班级号"
                      v-model="sclass_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col style="margin: 0 10px 20px 0"
                :span="3">
          <div class="grid-content bg-purple">
            <el-input placeholder="学号"
                      v-model="sno_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col style="margin: 0 10px 20px 0"
                :span="3">
          <div class="grid-content bg-purple">
            <el-input placeholder="课程号"
                      v-model="cno_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col style="margin: 0 10px 20px 0"
                :span="3">
          <div class="grid-content bg-purple">
            <el-input placeholder=" 成绩"
                      v-model="grade_search"
                      clearable>
            </el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type="primary"
                       @click="searchInfo">查询选课</el-button>
            <el-button type="primary"
                       @click="addSC">添加选课</el-button>
          </div>
        </el-col>
        <template>
          <el-table :data="tableData"
                    border
                    style="width: 100%">
            <el-table-column prop="sclass"
                             label="班级号">
            </el-table-column>
            <el-table-column prop="sno"
                             label="学号">
            </el-table-column>
            <el-table-column prop="cno"
                             label="课程号">
            </el-table-column>
            <el-table-column prop="grade"
                             label="成绩">
            </el-table-column>
            <el-table-column label="操作"
                             width="180px">
              <template slot-scope="scope">
                <el-button @click="deleteSC(scope.row)"
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
            <div class="grid-content bg-purple">班级号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="sc_input.sclass_input"
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
              <el-input v-model="sc_input.sno_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">课程号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="sc_input.cno_input"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">成绩</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="sc_input.grade_input"
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
            <div class="grid-content bg-purple">班级号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="sc_add.sclass_add"
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
              <el-input v-model="sc_add.sno_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">课程号</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="sc_add.cno_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">成绩</div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple">
              <el-input v-model="sc_add.grade_add"
                        placeholder="请输入内容"></el-input>
            </div>
          </el-col>
        </el-row>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dia">取 消</el-button>
          <el-button type="primary"
                     @click="addSCMain">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'OpSCTable',
  data () {
    return {
      isCollapse: true,
      dialogVisible: false,
      dialogAddVisible: false,
      sc_input: {
        sclass_input: 4,
        sno_input: '测试课程',
        cno_input: 0,
        grade_input: 1,
      },
      sc_add: {
        sclass_add: 4,
        sno_add: 2,
        cno_add: 0,
        grade_add: 1,
      },
      sclass_search: 0,
      sno_search: 0,
      cno_search: 0,
      grade_search: 0,
      tableData: [{
        sclass: 4,
        sno: '测试课程',
        cno: 0,
        grade: 1
      }],
      deleteSclass: 0,
      deleteSno: 0,
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
    deleteSC (row) {
      this.deleteSclass = row.sclass
      this.deleteSno = row.sno
      this.deleteCno = row.cno
      this.$confirm('此操作将永久删除该选课记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var _this = this
        this.$axios
          .post('/deleteSC', { sclass: this.deleteSclass, sno: this.deleteSno, cno: this.deleteCno }).then(resp => {
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
        .post('/querySCs', { sclass: this.sclass_search, sno: this.sno_search, cno: this.cno_search, grade: this.grade_search }).then(resp => {
          if (resp && resp.status === 200) {
            _this.tableData = resp.data
          }
        }).catch((failResponse) => { })
    },
    dia(){
      this.dialogAddVisible = false
    },
    edit (row) {
      this.dialogVisible = true
      this.sc_input.sclass_input = row.sclass
      this.sc_input.sno_input = row.sno
      this.sc_input.cno_input = row.cno
      this.sc_input.grade_input = row.grade
    },
    addSC () {
      this.dialogAddVisible = true
    },
    addSCMain () {
      var _this = this
      this.$axios
        .post('/addSC', {
          sclass: _this.sc_add.sclass_add,
          sno: _this.sc_add.sno_add,
          cno: _this.sc_add.cno_add,
          grade: _this.sc_add.grade_add
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
        .post('/updateSC', {
          sclass: _this.sc_input.sclass_input,
          sno: _this.sc_input.sno_input,
          cno: _this.sc_input.cno_input,
          grade: _this.sc_input.grade_input
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
