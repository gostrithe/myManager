<template>
    <div class="bodyBox">
        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
            class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="请输入密码"
                    show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input show-password v-model="ruleForm.checkPass" type="password" autocomplete="off"
                    placeholder="再次输入密码" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                    @click="submitForm(ruleFormRef, ruleForm.username, ruleForm.password)">登录</el-button>
                <el-button type="info"
                    @click="register(ruleFormRef, ruleForm.username, ruleForm.password)">注册</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { registerUser, login } from '@api/userApi.js';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import store from '../store'
import Router from "../router/index";
import adminRoutes from "../router/routes/adminRoutes";

const ruleFormRef = ref(null);
const router = useRouter()

const usernameReg = /^[\w-]{4,16}$/;
const passwordReg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/;
const checkusername = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入用户名！'));
    }
    setTimeout(() => {
        if (!usernameReg.test(value)) {
            callback(new Error('用户名为4~16位（字母、数字、下划线、减号）'));
        } else {
            callback();
        }
    }, 1000);
};

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return;
            ruleFormRef.value.validateField('checkPass', () => null);
        }
        setTimeout(() => {
            if (!passwordReg.test(value)) {
                callback(new Error('密码不合法或密码错误'));
            } else {
                callback();
            }
        }, 1000);
    }
};
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请确认密码'));
    } else if (value !== ruleForm.password) {
        callback(new Error("请输入相同的密码"));
    } else {
        callback();
    }
};

const ruleForm = reactive({
    password: '',
    checkPass: '',
    username: '',
});

const rules = reactive({
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    username: [{ validator: checkusername, trigger: 'blur' }],
});

const submitForm = (formEl, username, password) => {
    if (!formEl) return;
    formEl.validate(async (isValid) => {
        if (isValid) {
            const { msg, user, token } = await login({ username, password });
            ElMessage({
                message: msg,
                type: user ? "success" : "error",
                center: true,
                offset: 100
            });
            store.dispatch('saveUserInfo', { user, token })
            formEl.resetFields();
            router.push('/')
        } else {
            console.log('error submit!');
            return false;
        }
    });
};

const register = (formEl, username, password) => {
    if (!formEl) return;
    formEl.validate((isValid) => {
        if (isValid) {
            registerUser({ username, password }).then(({ msg, insertedId }) => {
                ElMessage({
                    message: insertedId ? `${msg}` : "注册失败或用户已存在",
                    type: insertedId ? "success" : "error",
                    center: true,
                    offset: 100
                });
            });
        } else {
            ElMessage({
                message: "用户名或密码不合法",
                type: "error",
                center: true,
                offset: 100
            });
            return false;
        }
    });

};

const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.bodyBox {
    width: 100%;
    height: 90vh;
    background-image: url('/jack2-ghostRider.jpg');
    background-size: cover;

    .el-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        height: 300px;
        padding: 50px 70px 0 0;
        background: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4));
        border-radius: 20px;
        border: 1px solid #000;

        :deep(.el-form-item__label) {
            color: #ddd;
        }
    }
}
</style>