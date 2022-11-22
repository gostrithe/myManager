<template>
  <div>
    <p>err {{ err }}</p>

    <p v-if="!form">Loading...</p>
    <!-- <p>data {{ data }}</p> -->

    <el-card v-else class="box-card">
      <template #header>
        <div class="card-header">
          <span>电影详情</span>
          <el-button class="button" text>Operation button</el-button>
        </div>
      </template>

      <!-- 表格 -->
      <el-form :model="form" label-width="120px">
        <el-form-item label="影片名称">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="片长">
          <el-col :span="7">
            <el-input v-model="form.runtime" />
          </el-col>
          &nbsp;&nbsp;分钟
        </el-form-item>

        <el-form-item label="评分">
          <el-col :span="7">
            <el-input v-model="form.grade" />
          </el-col>
        </el-form-item>

        <el-form-item label="视觉效果">
          <el-select v-model="form.filmType.name" placeholder="请选择视觉效果">
            <el-option label="2D" value="shanghai" />
            <el-option label="3D" value="beijing" />
            <el-option label="4D" value="beijing" />
          </el-select>
        </el-form-item>

        <el-form-item label="上映日期">
          <el-col :span="11">
            <el-date-picker
              v-model="form.premiereAt"
              type="date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>

        <el-form-item label="在映">
          <el-switch v-model="form.isSale" />
        </el-form-item>

        <el-form-item label="类型">
          <el-checkbox-group v-model="form.category">
            <el-checkbox label="爱情" name="爱情" />
            <el-checkbox label="动作" name="动作" />
            <el-checkbox label="科幻" name="科幻" />
            <el-checkbox label="历史" name="历史" />
            <el-checkbox label="悬疑" name="悬疑" />
            <el-checkbox label="战争" name="战争" />
            <el-checkbox label="喜剧" name="喜剧" />
            <el-checkbox label="剧情" name="剧情" />
            <el-checkbox label="犯罪" name="犯罪" />
            <el-checkbox label="纪录片" name="纪录片" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="国家">
          <el-radio-group v-model="form.nation">
            <el-radio label="中国大陆" />
            <el-radio label="欧美" />
            <el-radio label="日韩" />
            <el-radio label="其它地区" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="演职人员">
          <!-- 
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          -->
          <el-upload
            v-model:file-list="form.actors"
            class="upload-demo"
            action="/api/file/upload"
            list-type="picture"
            :on-success="onActorUploadSuccess"
            :on-error="onError"
          >
            <el-button type="primary">Click to upload</el-button>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with name-role format and a size less than 500kb
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <!-- 
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="onBeforeUpload"
        :on-change="onChange"
         -->
        <el-form-item label="剧照">
          <el-upload
            v-model:file-list="form.poster"
            multiple
            action="/api/file/upload"
            :auto-upload="true"
            list-type="picture-card"
            :on-success="onPosterUploadSuccess"
            :on-error="onError"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <!-- <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog> -->
        </el-form-item>

        <el-form-item label="影片摘要">
          <el-input v-model="form.synopsis" type="textarea" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

import { getFilmDetail, updateFilmDetail, getFilmDetailTemplate,addFilm } from "@api/filmApi";
import useAxios from "@hooks/useAxios";

const route = useRoute();
const router = useRouter();

const {
  data: form,
  err,
  loading,
} = useAxios(getFilmDetailTemplate, [], (data) => formatData(data));

/* 将数据库中的数据加工为组件所需 */
const formatData = (data) => {
  data.category = data.category.split("|").filter(c=>c.trim()!=="");

  data.premiereAt *= 1000;

  data.poster = [
    {
      name: "",
      url: data.poster,
    },
  ];
  console.log("data.poster", data.poster);

  data.actors = data.actors.map((actor) => ({
    name: `${actor.name}-${actor.role}`,
    url: actor.avatarAddress,
  }));
};

/* 将组件中的数据还原为数据库所需 */
const deformatData = (data) => {
  const _data = {};

  // data.category = data.category.split("|");
  _data.category = data.category.join("|");

  // data.premiereAt *= 1000;
  _data.premiereAt = data.premiereAt / 1000;

  // data.poster = [
  //   {
  //     name: "",
  //     url: data.poster,
  //   },
  // ];
  _data.poster = data.poster[0]["url"];

  // data.actors = data.actors.map((actor) => ({
  //   name: `${actor.name}-${actor.role}`,
  //   url: name.avatarAddress,
  // }));
  _data.actors = data.actors.map((actor) => {
    console.log("actor.name=", actor.name);
    if (actor.name.includes(".")) {
      actor.name = actor.name.slice(0, actor.name.indexOf("."));
    }
    const [name, role] = actor.name.split("-");

    return {
      name,
      role,
      avatarAddress: actor.url,
    };
  });

  return Object.assign({}, data, _data);
};

const onSubmit = async () => {
  console.log("onSubmit0", form.value);
  let data = deformatData(form.value);
  console.log("onSubmit1", data);

  /* 发起通信 */
  const result = await addFilm(data);
  console.log("result=", result);
  router.back();
  ElMessage({
    message: result.msg,
    type: "success",
  });
};

const onActorUploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log("onActorUploadSuccess", response, uploadFile, uploadFiles);
  // form.value.actors.push({
  //   name: uploadFile.name.slice(0, uploadFile.name.indexOf(".")),
  //   url: `http://localhost:8002/upload/${uploadFile.name}`,
  // });
  const lastActor = form.value.actors[form.value.actors.length - 1];
  lastActor.url = `http://localhost:8002/upload/${uploadFile.name}`;
  lastActor.name = uploadFile.name.slice(0, uploadFile.name.indexOf("."));

  ElMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};

const onPosterUploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log("onPosterUploadSuccess", response, uploadFile, uploadFiles);
  form.value.poster[0].url = `http://localhost:8002/upload/${uploadFile.name}`;

  ElMessage({
    message: "Congrats, this is a success message.",
    type: "success",
  });
};

const onError = (error, uploadFile, uploadFiles) => {
  console.log("onError", error, uploadFile, uploadFiles);
  ElMessage.error("Oops, this is a error message.");
};
</script>
