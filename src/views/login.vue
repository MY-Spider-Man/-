<template>
    <div class="box">
        <div class="mylogin">
            <div class="mytop">
                <span>积云后台</span>
            </div>
            <div class="mylist">
                <el-form :model="ruleForm" label-position="top" :rules="rules" class="demo-ruleForm" status-icon>
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="密码" prop="pad">
                        <el-input v-model="ruleForm.pad" placeholder="请输入密码" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="mybtn">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button>重置</el-button>

            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { loginAPI } from "@/api/api";
const ruleForm = reactive({
    name: 'admin',
    pad: 'admin'
})
const rules = reactive({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    pad: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})
const route = useRoute();
const router = useRouter();

const login = () => {
    loginAPI({ password: ruleForm.pad, username: ruleForm.name }).then((res: any) => {
        // console.log(res.data);
        localStorage.setItem('token', res.data.token)
        router.push({
            path: '/',
            query: {
                name: res.data.currentAuthority
            }
        })
    })
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100vh;
    background-color: #d7d7d7;
    display: flex;
    justify-content: center;
    align-items: center;

    .mylogin {
        width: 450px;
        height: 340px;
        background-color: white;
        border-radius: 5px;

        .mytop {
            width: 100%;
            height: 80px;
            background-color: #7082fb;
            text-align: center;
            line-height: 80px;
            color: white;
            box-sizing: border-box;
            font-weight: 550;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }

        .mylist {
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
        }

        .mybtn {
            width: 100%;
            text-align: center;
        }
    }
}
</style>