<template>
  <div>
    <div class="containBox" v-if="!($route.params.id || route.path == '/film/add')">
      <div class="btnsOnTop">
        <el-button class="opBtn" type="danger" @click="onBatchDeleteBtnClick">
          <el-icon>
            <Close />
          </el-icon>&nbsp;删除
        </el-button>

        <el-button class="opBtn" type="success">
          <el-icon>
            <DocumentCopy />
          </el-icon>&nbsp; 导出
        </el-button>

        <el-button class="opBtn" type="primary" @click="addFilm">
          <el-icon>
            <Plus />
          </el-icon>
          &nbsp; 添加
        </el-button>
      </div>

      <el-table :data="tableData" :default-sort="{}" height="65vh" style="width: 100%;" stripe fit :border="true"
        @selection-change="onSelectionChange">
        <el-table-column type="selection" label="全选" width="40">
        </el-table-column>
        <el-table-column type="index" :index="1 + (pageSize * (currentPage - 1))" fixed width="55" :align="'center'">
          <template #header="{ column, $index }">
            <div>
              序号
            </div>
          </template>
        </el-table-column>

        <el-table-column :align="'center'" sortable prop="filmId" label="FilmId" width="100" />
        <el-table-column :align="'center'" sortable fixed prop="name" label="片名" width="160" />
        <el-table-column :align="'center'" prop="poster" label="海报" width="60">
          <template #default="{ row: { poster }, column, $index }">
            <div class="demo-image__preview" style="display: flex; align-items: center">
              <el-image preview-teleported hide-on-click-modal style="" :src="poster.split(',')[0]"
                :preview-src-list="poster.split(',')" :initial-index="0" />
            </div>
          </template>
        </el-table-column>
        <el-table-column :align="'center'" prop="actors" :formatter="formatActors" label="主演" width="230" />
        <el-table-column :align="'center'" prop="nation" label="国家" width="160" />
        <el-table-column :align="'center'" prop="category" label="类型" width="180" />
        <el-table-column :align="'center'" sortable prop="runtime"
          :formatter="(row, column, cellValue) => cellValue + '分钟'" label="片长" width="110" />
        <el-table-column :align="'center'" sortable prop="grade" label="评分" width="80" />
        <el-table-column :align="'center'" sortable prop="premiereAt" :formatter="formatPremierAt" label="首映日期"
          width="130" />

        <el-table-column :align="'center'" label="操作" width="100" fixed="right">
          <template #default="{ row: { _id, name } }">
            <div class="operation">
              <el-button @click="onDetailBtnClick(_id)" type="primary" :icon="Edit" circle />
              <el-button @click="deleteItem(_id, name)" type="danger" :icon="Delete" circle />

              <el-dialog v-model="dialogVisible" title="提醒" width="30%" :modal='false'>
                <span>是否确认删除 "{{ filmName }}"</span>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="onDeleteCencel">取消</el-button>
                    <el-button type="primary" @click="onDeleteComfirm(deleteId)">
                      确认
                    </el-button>
                  </span>
                </template>
              </el-dialog>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination :hide-on-single-page="tableData.length <= 5" background :page-size="pageSize" :pager-count="5"
          layout="prev, pager, next, jumper, total" :total="total" v-model:current-page="currentPage" />
      </div>
    </div>
    <router-view :blank="temp" @updateData="updateData"></router-view>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, onUpdated, ref, watch } from 'vue';
import { getPlayings, deletePlaying } from '../../api/filmApi';
import {
  Plus,
  Close,
  DocumentCopy,
  Edit,
  Delete
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';


const pageSize = 10;
const tableData = ref([]);
const total = ref(0);
let films = [];
onMounted(async () => {
  films = await getPlayings();
  total.value = films.length;
  tableData.value = films.slice(0, pageSize);
});

const route = useRoute();
const router = useRouter();

const formatPremierAt = (row, column, cellValue, index) => new Date(cellValue * 1000).toLocaleDateString().replaceAll('/', '-').split('-').map((item, index, arr) => item.length == 1 ? arr[index] = '0' + item : item).join('-');

const formatActors = (row, column, cellValue, index) => cellValue.filter(item => item.role !== '导演').map(actor => actor.name).slice(0, 3).join('，') + ' 等';

const currentPage = ref(1);
const unwatch = watch(currentPage, (newPage, oldPage) => {
  tableData.value = films.slice(pageSize * (newPage - 1), pageSize * newPage);
});
onUnmounted(() => { unwatch(); });

const updateData = async (isUpdated) => {
  if (isUpdated) {
    console.log('数据已更新过，重新获取数据');
    films = await getPlayings();
    tableData.value = films.slice(pageSize * (currentPage.value - 1), pageSize * currentPage.value);
    total.value = films.length;
    // window.location.reload();
  }
};
// const unwatch2 = watch(route, () => {
//   if (route.path == '/film/nowPlaying') {
//     // window.location.reload();
//     // console.log('页面刷新了');
//   }
// });

const dialogVisible = ref(false);
const filmName = ref('');
const deleteId = ref(null);
const deleteItem = (id, name) => {
  // 先别删太快，弹出对话框让用户确认。
  filmName.value = name;
  dialogVisible.value = true;
  deleteId.value = id;
};
const onDeleteCencel = () => {
  dialogVisible.value = false;
};
const onDeleteComfirm = async (id) => {
  dialogVisible.value = false;
  const { msg, deletedCount } = await deletePlaying(id);
  // window.location.reload();
  updateData(true)
  ElMessage({
    message: `${msg}`,
    type: deletedCount ? "success" : "error",
    center: true,
    offset: 100
  });
};

const selectionArr = ref([]);
const onSelectionChange = (selection) => {
  console.log(selection);
  selectionArr.value = selection;
};

const onBatchDeleteBtnClick = () => {
  ElMessageBox.confirm(
    `删除${selectionArr.value.length}条电影数据，是否继续？`,
    '确认操作',
    {
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => Promise.all(selectionArr.value.map(item => {
      deletePlaying(item._id);
    }))
    )
    .then(async () => {
      // window.location.reload();
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
      updateData(true)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除已取消',
      });
    });
};

const temp = ref({});
const template = {
  name: "",
  poster: "/favicon.ico",
  actors: [
    {
      name: "",
      role: '',
      avatarAddress: "/favicon.ico",
    },
  ],
  category: '',
  director: '',
  synopsis: "",
  filmType: {
    name: "2D",
  },
  nation: "其它",
  premiereAt: 0,
  runtime: 0,
  isPresale: false,
  isSale: false,
  grade: "0",
};
const addFilm = () => {
  temp.value = template;
  router.push('/film/add');
}

const onDetailBtnClick = (_id) => { 
  temp.value = {}
  router.push(`/film/${_id}`); 
};

</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}

.btnsOnTop {
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  background-color: #fff;
}

.el-table {
  border-radius: 8px;

  .operation {
    display: flex;
    justify-content: space-evenly;
  }
}

.pagination {
  margin-top: 12px;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
}
</style>