<template>
    <div class="loginpage">
        <!-- img禁止拖拽 有点 -->
        <div class="login1"><img src="@/assets/login_bg.png" alt="" class="unselectable" draggable="false"
                oncontextmenu="return false;"></div>
        <div class="login2"></div>
        <div class="logincontent">
            <div class="title">XXX后台管理系统</div>
            <div class="img"></div>
            <div class="loginform">
                <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                    autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                    <a-form-item label="用户名：" name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
                        <a-input v-model:value="formState.username" />
                    </a-form-item>

                    <a-form-item label="密码：" name="password" :rules="[{ required: true, message: '请输入密码！' }]">
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>

                    <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
                        <a-button type="primary" html-type="submit" style="width: 300px;">登录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
interface FormState {
    username: string;
    password: string;
}
const router = useRouter()
const formState = reactive<FormState>({
    username: 'a',
    password: 'a',
});
//验证通过
const onFinish = (values: any) => {
    console.log('Success:', values);

    window.sessionStorage.setItem("routes", JSON.stringify([1, 2, 3, 4, 5]))
    window.sessionStorage.setItem("user", 'admin')

    router.push("/home")
};
//验证失败
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
</script>

<style scoped lang="less">
.loginpage {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100vh;

    .login1 {
        width: 100%;
        height: 50%;
        background-color: rgb(42, 100, 214);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 0 -350px;

        img {
            width: 100%;
            height: 100%;
            opacity: 0.1;
        }
    }

    .login2 {
        width: 100%;
        height: 50%;
        background-color: rgb(213, 213, 213);
    }

    .logincontent {
        position: absolute;
        display: flex;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -30%);
        width: 900px;
        height: 295px;
        background-color: rgba(255, 255, 255);
        box-shadow: 2px 2px 5px 0 rgb(178, 178, 178);

        .img {
            width: 50%;
            height: 100%;
            background-image: url("@/assets/login_left.png");
            background-repeat: no-repeat;
            background-size: contain;
            background-position: 0;
        }

        .loginform {
            padding-top: 80px;
            text-align: center;
            width: 50%;
            height: 100%;
        }

        .title {
            position: absolute;
            top: -25%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 30px;
            color: aliceblue;
        }
    }
}

.unselectable {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    user-select: none;
}
</style>