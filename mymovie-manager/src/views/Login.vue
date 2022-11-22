<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h4 style="text-align: center; width: 100%">{{ $route.meta.title }}</h4>
      </div>
    </template>

    <el-form
      ref="stateRef"
      :model="state"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-state"
    >
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="state.username" />
      </el-form-item>

      <!-- 密码 -->
      <el-form-item label="密码" prop="pass">
        <el-input v-model="state.pass" type="password" autocomplete="off" />
      </el-form-item>

      <!-- 确认 -->
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="state.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <!-- 登录 -->
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm(stateRef)"
          >登录</el-button
        >
        <el-button class="btn" @click="resetForm(stateRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";

const router = useRouter();
const store = useStore();

const stateRef = ref();

const regUsername = /^\w{5,20}$/;
const checkUsername = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("Please input the username"));
  }

  setTimeout(() => {
    if (!regUsername.test(value)) {
      callback(new Error("用户名必须是5~20个单词字符"));
    } else {
      callback();
    }
  }, 1000);
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (state.checkPass !== "") {
      if (!stateRef.value) return;
      stateRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== state.pass) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const state = reactive({
  pass: "",
  checkPass: "",
  username: "",
});

const rules = reactive({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  username: [{ validator: checkUsername, trigger: "blur" }],
});

const submitForm = (formEl) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    if (valid) {
      console.log("submit!");
      console.log(state.username, state.pass);

      // const { msg, user, token } = await login({
      //   username: state.username,
      //   password: state.pass,
      // });
      const { msg, user, token } = await store.dispatch("login", {
        username: state.username,
        password: state.pass,
      });
      console.log(msg, user, token);

      ElNotification({
        title: user ? "登录成功" : "登录失败",
        message: msg,
        type: user ? "success" : "error",
      });

      user && router.push("/");

    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 600px;
  margin: 50px auto;
}

.btn {
  width: 100px;
}
</style>
