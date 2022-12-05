<template>
    <el-scrollbar height="82vh">
        <template #default>
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>影片详情</span>
                        <el-button @click="onCloseBtnClick" class="button" text>关闭
                        </el-button>
                    </div>
                </template>

                <template #default>
                    <el-form v-if="formData.name !== undefined" :model="formData">
                        <el-form-item label="片名:">
                            <el-input v-model="formData.name" input-style="width: auto;" />
                        </el-form-item>

                        <el-form-item label="片长(分钟):" class="runtime">
                            <!-- <el-col :span="5"> -->
                            <el-input-number v-model="formData.runtime" :min="0" />
                            <!-- <el-input v-model="formData.runtime" type="number">
                            <template #suffix>
                                <div class="suffix">
                                    分钟
                                </div>
                            </template>
                        </el-input> -->
                            <!-- </el-col> -->
                        </el-form-item>

                        <el-form-item label="评分:">
                            <el-col :span="3">
                                <el-input v-model="formData.grade" input-style="text-align: center;" />
                            </el-col>
                        </el-form-item>

                        <el-form-item label="影片类型:">
                            <el-col :span="2">
                                <el-select v-model="formData.filmType.name">
                                    <el-option label="2D" value="2D" />
                                    <el-option label="3D" value="3D" />
                                    <el-option label="4D" value="4D" />
                                </el-select>
                            </el-col>
                        </el-form-item>

                        <el-form-item label="首映日期:">
                            <el-col :span="5">
                                <el-date-picker v-model="formData.premiereAt" type="date" placeholder="Pick a date"
                                    style="width: 100%" />
                            </el-col>
                        </el-form-item>

                        <el-form-item label="预售:">
                            <el-switch v-model="formData.isPresale" />
                            <span style="margin-left: 20px;">在映:</span>
                            <el-switch v-model="formData.isSale" />
                        </el-form-item>

                        <el-form-item label="影片类型:">
                            <el-checkbox-group v-model="formData.category">
                                <el-checkbox label="爱情" name="爱情" />
                                <el-checkbox label="动作" name="动作" />
                                <el-checkbox label="科幻" name="科幻" />
                                <el-checkbox label="历史" name="历史" />
                                <el-checkbox label="悬疑" name="悬疑" />
                                <el-checkbox label="喜剧" name="喜剧" />
                                <el-checkbox label="战争" name="战争" />
                                <el-checkbox label="剧情" name="剧情" />
                                <el-checkbox label="犯罪" name="犯罪" />
                                <el-checkbox label="纪录片" name="纪录片" />
                            </el-checkbox-group>
                        </el-form-item>

                        <el-form-item label="影片类型:">
                            <el-radio-group v-model="formData.nation">
                                <el-radio label="中国大陆" />
                                <el-radio label="欧美" />
                                <el-radio label="日韩" />
                                <el-radio label="其它" />
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="演职人员:">
                            <div class="actors">
                                <el-upload v-model:file-list="fileList" class="upload-demo" action="/api/file/upload"
                                    list-type="picture" auto-upload drag show-file-list
                                    :on-success="onActorUploadSuccess" :on-remove="onActorRemove">
                                    <el-button type="primary">添加人员</el-button>
                                </el-upload>
                            </div>
                        </el-form-item>

                        <el-form-item label="海报:">
                            <el-upload v-model:file-list="fileList2" action="/api/file/upload" list-type="picture-card"
                                :on-preview="handlePictureCardPreview" :on-success="onPosterUploadSuccess"
                                :on-remove="onPosterRemove">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                                <div>添加海报</div>
                            </el-upload>

                            <el-dialog v-model="dialogVisible" width="25%">
                                <img w-full :src="dialogImageUrl" style="width: 100%;" alt="Preview Image" />
                            </el-dialog>
                        </el-form-item>

                        <el-form-item label="剧情摘要:">
                            <el-input v-model="formData.synopsis" autosize type="textarea" />
                        </el-form-item>

                        <el-divider style="border-top: 2px #aaa var(--el-border-style)" />

                        <el-form-item>
                            <div class="centerWrapper" style="width: 100%; text-align: center;">
                                <el-button class="opBtn" @click="onSubmit" type="primary">更新</el-button>
                                <el-button class="opBtn" @click="router.go(0)">重置</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-card>
        </template>
    </el-scrollBar>


</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDetail, updateDetail, addFilm } from '../../api/filmApi';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const emit = defineEmits(['updateData']);
let isUpdated = false;
const onCloseBtnClick = () => {
    emit('updateData', isUpdated);
    router.back();
};

const { blank } = defineProps({ 'blank': Object });

const formData = reactive({});

const fileList = ref([]);
const fileList2 = ref([]);
onMounted(async () => {
    let temp;
    if (blank.name !== undefined) {
        temp = blank;
    }
    else {
        const data = await getDetail(route.params.id);
        // console.log(data);
        temp = data;
    }
    fileList.value = temp.actors.map(({ name, role, avatarAddress }) => ({
        name: `${name}-${role}`,
        url: avatarAddress
    }));
    temp.poster.split(',').forEach(url => {
        fileList2.value.push({ url: url });
    });
    // formData = data;
    Object.assign(formData, temp, {
        premiereAt: temp.premiereAt * 1000,
        category: temp.category.split('|'),
        nation: temp.nation.split(',')[0]
    });

});

const dialogVisible = ref(false);
const dialogImageUrl = ref('');
const handlePictureCardPreview = (uploadFile) => {
    // console.log(uploadFile);
    dialogImageUrl.value = uploadFile.url;
    dialogVisible.value = true;
};

const onSubmit = async () => {
    isUpdated = true;

    // 更新提交的数据需要和之前的结构格式一样
    const updateObject = Object.assign({}, formData, {
        category: formData.category.join('|'),
        premiereAt: formData.premiereAt / 1000
    });
    // 删除deformatedForm中的id（修改id对于数据库来说是非法操作）
    delete updateObject._id;

    console.log(updateObject);
    let msgText, typeCondition;
    if (blank.name !== undefined) {
        updateObject.filmId = "" + (Date.now() % 10000);
        const { msg, insertedId } = await addFilm(updateObject);
        msgText = msg;
        typeCondition = insertedId;
    }
    else {
        const { msg, modifiedCount } = await updateDetail(formData._id, updateObject);
        msgText = msg;
        typeCondition = modifiedCount;
    }

    ElMessage({
        message: `${msgText}`,
        type: typeCondition ? "success" : "error",
        center: true,
        offset: 100
    });
};

const onPosterUploadSuccess = (response, uploadFile, uploadFiles) => {
    // console.log(response, uploadFile, uploadFiles);
    console.log(response.msg);
    // console.log(uploadFile.url);
    const url = `http://localhost:7777/upload/${uploadFile.name}`;
    formData.poster == '' ? formData.poster += `${url}` : formData.poster += `,${url}`;
    // formData.poster += `,${url}`;
    // console.log(formData);
};

const onPosterRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile.url);
    if (formData.poster == uploadFile.url) {
        formData.poster = '';
    } else if (formData.poster.indexOf(uploadFile.url) == 0) {
        formData.poster = formData.poster.replace(`${uploadFile.url},`, '');
    } else {
        formData.poster = formData.poster.replace(`,${uploadFile.url}`, '');
    }
    // console.log(formData);
};

const onActorUploadSuccess = (response, uploadFile, uploadFiles) => {
    console.log(uploadFile);
    // 不支持中文
    const [fileName, fileRole] = uploadFile.name.split('-');
    formData.actors.push({
        name: `${fileName}`,
        role: `${fileRole}`,
        avatarAddress: `http://localhost:7777/upload/${uploadFile.name}`
    });
    console.log(formData.actors);
};

const onActorRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile);
    formData.actors = formData.actors.filter(actor => actor.avatarAddress !== uploadFile.url);
    console.log(formData.actors);
};


</script>

<style lang="scss">
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-weight: 700;
    }

    .button {
        font-size: 12px;
    }
}

// .runtime .el-input .el-input__wrapper {
//     padding-right: 4px;
//     padding-left: 25px;
// }

.suffix {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 13px;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.box-card {
    // max-height: 82vh;
    // overflow: auto;

    .el-input-number {
        width: 120px;
    }

    .actors {
        .upload-demo {
            display: flex;
            flex-direction: column;
        }

        .el-upload-list {
            display: flex;
            // justify-content: space-between;
            flex-wrap: wrap;

            .el-upload-list__item {
                width: auto;
                margin-right: 10px;
            }
        }

        .el-upload {
            .el-upload-dragger {
                padding: 0;
                border: 0;
                text-align: left;
            }
        }
    }

    .el-upload--picture-card {
        flex-direction: column;
    }
}
</style>