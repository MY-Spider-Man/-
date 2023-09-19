<template>
    <div class="box">
        <div style="width: 100%; display: flex; justify-content: space-between; align-content: center;">
            <div style="margin-bottom: 50px;">共{{ total }}条记录</div>

            <div>
                <el-button type="primary" @click="myadd">添加面经</el-button>
            </div>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="stem" label="标题" />
            <el-table-column prop="creator" label="作者" />
            <el-table-column prop="likeCount" label="点赞" />
            <el-table-column prop="views" label="浏览数" />
            <el-table-column prop="createdAt" label="更新时间" />
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button :icon="View" @click="xiang(scope.$index)" />
                    <el-button :icon="Share" @click="edit(scope.row)" />
                    <el-button :icon="Delete" />
                </template>
            </el-table-column>
        </el-table>
        <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>







        <el-drawer v-model="drawer" title="预览面经" :direction="direction">
            <div v-html="tableData[index].content"></div>
        </el-drawer>



        <el-drawer v-model="drawer1" :title="title" :direction="direction1" size="40%">
            <el-form :model="ruleForm" :rules="rules" class="demo-ruleForm" status-icon>
                <el-form-item label="标题" prop="name">
                    <el-input v-model="ruleForm.name" />
                </el-form-item>
                <el-form-item label="内容" prop="pad">
                    <quill-editor theme="snow" v-model:content="ruleForm.pad"
                        style="width: 100%; height: 400px;"></quill-editor>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="add">确定</el-button>
            <el-button>取消</el-button>


        </el-drawer>

    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { queryAPI, createAPI, updateAPI } from "@/api/api";
import { View, Share, Delete } from '@element-plus/icons-vue'




const ruleForm = reactive({
    name: '',
    pad: ''
})
const rules = reactive({
    name: [
        { required: true, message: '请输入标题', trigger: 'blur' },

    ],
    pad: [
        { required: true, message: '请输入标题', trigger: 'blur' },

    ],
})
const total = ref(0)
const tableData = ref([] as any)
const page = reactive({
    pagefize: 3,
    pagenum: 1
})
const title = ref('添加面经')
const index = ref(0)
const drawer = ref(false)
const direction = ref('rtl')
const drawer1 = ref(false)
const direction1 = ref('rtl')
const id = ref(0)
// const drawer = ref(false)
const route = useRoute();
const router = useRouter();
const edit = (val: any) => {
    drawer1.value = true
    title.value = '编辑面经'
    console.log(val);
    id.value = val.id
    ruleForm.name = val.stem
    // ruleForm.pad = val.content

}
const xiang = (i: number) => {
    drawer.value = true
    index.value = i
}
const myadd = () => {
    drawer1.value = true
    // console.log(drawer1.value);
    title.value = '添加面经'
}
const handleSizeChange = (val: any) => {
    page.pagefize = val
    mycreated()
}
const handleCurrentChange = (val: any) => {
    page.pagenum = val
    mycreated()
}
const add = () => {
    // console.log(ruleForm.pad.ops[0].insert);
    if (title.value == '添加面经') {
        createAPI({ stem: ruleForm.name, content: ruleForm.pad.ops[0].insert }).then((res: any) => {
            // console.log(res);
            ruleForm.name = ''
            mycreated()

        })
        console.log(111);

    } else {

        updateAPI({ id: id.value, stem: ruleForm.name, content: ruleForm.pad.ops[0].insert }).then((res: any) => {
            // console.log(res);
            ruleForm.name = ''
            mycreated()
        })
    }
}
const mycreated = () => {
    queryAPI({ current: page.pagenum, pageSize: page.pagefize }).then((res: any) => {
        // console.log(res.data.rows);
        total.value = res.data.total
        tableData.value = res.data.rows
    })
}
mycreated()
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 83vh;
    padding: 20px;
    box-sizing: border-box;
}

.ql-editor {
    height: 300px !important;
}
</style>