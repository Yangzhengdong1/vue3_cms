<template>
  <el-dialog
    :model-value="visible"
    :show-close="false"
    width="750px"
    :fullscreen="isFullscreen"
    :class="['edit-user-info-dialog', isFullscreen ? 'fullscreen-dialog' : '']"
    :close-on-click-modal="false"
  >
    <div class="dialog-content">
      <div class="content-layout">
        <!-- 左侧头像区域 -->
        <div class="avatar-section">
          <el-upload
            class="avatar-uploader"
            action="#"
            ref="uploadRef"
            :show-file-list="false"
            :auto-upload="false"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :http-request="uploadFile"
            :accept="accept"
          >
            <div class="avatar-wrapper">
              <img
                v-if="userInfoForm.avatarUrl"
                :src="userInfoForm.avatarUrl"
                class="avatar"
              />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </div>
          </el-upload>
          <!-- <span class="upload-text">点击上传头像</span> -->
        </div>

        <!-- 右侧信息区域 -->
        <div class="info-section">
          <div class="info-header">
            <span>基本信息</span>
            <div>
              <!-- <el-icon><Minus /></el-icon> -->

              <el-icon @click="isFullscreen = !isFullscreen">
                <component :is="isFullscreen ? 'Aim' : 'FullScreen'"
              /></el-icon>
              <el-icon><Close @click="handleClose" /></el-icon>
            </div>
          </div>
          <div class="info-body">
            <div class="info-body-content">
              <el-collapse v-model="activeNames">
                <el-collapse-item title="基础信息" name="1">
                  <div class="info-content">
                    <EditInfoForm :userInfo="userInfoForm" />
                  </div>
                </el-collapse-item>
                <el-collapse-item title="账号安全" name="2">
                  <div class="info-content">
                    <EditAccountForm
                      :userInfo="userInfoForm"
                      ref="editAccountFormRef"
                    />
                  </div>
                </el-collapse-item>
                <el-collapse-item title="偏好设置" name="3" disabled>
                  <div class="info-content"></div>
                </el-collapse-item>
              </el-collapse>
              <div class="info-body-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="handleConfirm"
                  >确认</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, withDefaults, computed } from "vue";
  import { UploadRawFile, UploadRequestOptions, ElUpload } from "element-plus";
  import { IUserInfoResult } from "@/service/types/login";
  import EditInfoForm from "./edit-info-form.vue";
  import EditAccountForm from "./edit-account-form.vue";
  import message from "@/utils/message";
  import { uploadImage } from "@/service/main/system/system.service";
  import { useStore } from "@/store";

  interface IFormData {
    userInfo: Partial<IUserInfoResult>;
  }

  const props = withDefaults(
    defineProps<{
      visible: boolean;
      formData: IFormData;
    }>(),
    {
      visible: false,
      formData: () => ({
        userInfo: {}
      })
    }
  );
  const emits = defineEmits(["update:visible"]);
  const store = useStore();

  const imageTypes = ["jpg", "png", "jpeg", "svg"];
  const accept = imageTypes.map((type: string) => `.${type}`).join(",");
  const userPermissions = computed(() => store.state.login.userPermissions);

  // 文件上传
  const uploadRef = ref<InstanceType<typeof ElUpload>>();
  const beforeUpload = (rawFile: UploadRawFile) => {
    // 判断是否有上传权限
    if (!userPermissions.value.includes("upload_img")) {
      message.warning("暂无上传权限");
      return false;
    }

    // 限制上传类型
    if (!imageTypes.includes(rawFile.type.split("/").pop() as string)) {
      message.warning(`仅允许上传${accept}类型文件`);
      return false;
    }

    // 限制上传大小
    if (rawFile.size > 1000) {
      message.warning("仅允许上传小于 1M 的图片");
      return false;
    }
  };

  const handleChange = () => uploadRef.value?.submit();

  const uploadFile = async (options: UploadRequestOptions) => {
    const file: UploadRawFile = options.file;
    const onSuccess = options.onSuccess;
    const onError = options.onError;
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const { code, data, message: msg } = await uploadImage(formData);
      if (code !== 0) return message.error(msg);
      userInfoForm.value.avatarUrl = data.url;
      onSuccess(data);
    } catch (error: any) {
      onError(error);
    }
  };

  const handleClose = () => {
    emits("update:visible", false);
  };
  const activeNames = ref(["1"]);
  const isFullscreen = ref(false);

  const userInfoForm = ref<Partial<IUserInfoResult>>(props.formData.userInfo);

  const editAccountFormRef = ref<InstanceType<typeof EditAccountForm>>();
  const handleConfirm = async () => {
    message.warning("个人资料修改功能正在努力开发中(ง•_•)ง~");
    const { password, username } = editAccountFormRef.value!.formData;
    const { avatarUrl } = userInfoForm.value;
    const params = {
      password,
      username,
      avatarUrl
    };
    console.log(params, "--------------");
  };
</script>

<style lang="less">
  .edit-user-info-dialog {
    padding: 0 !important;
    .el-dialog__header {
      padding: 0 !important;
    }
    .el-dialog__body {
      height: 100%;
      .dialog-content {
        height: 100%;
      }
      .content-layout {
        height: 100%;
      }
    }
  }
  .fullscreen-dialog {
    .el-upload {
      margin: 0px !important;
    }
  }
</style>
<style scoped lang="less">
  .content-layout {
    display: flex;
    // gap: 40px;
    position: relative;
  }

  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
    background-color: #eff3f6;
    padding: 10px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .avatar-uploader {
    /deep/.el-upload {
      width: 110px;
      height: 110px;
      margin-top: -45px;
      border-radius: 50%;
      background-color: var(--el-bg-color);
      padding: 10px;
    }
    .avatar-wrapper {
      width: 100%;
      height: 100%;
      border: 2px dashed var(--el-color-primary);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.3s;
      background-color: var(--el-bg-color);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      &:hover {
        border-color: var(--el-color-primary-light-3);
        transform: translateY(-2px);
      }
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: var(--el-color-primary);
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-text {
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }

  .info-section {
    flex: 1;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    background-color: #ecedef;

    .info-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      padding: 15px 20px;
      background-color: #fff;

      > div {
        display: flex;
        gap: 10px;
        color: var(--el-text-color-secondary);
        cursor: pointer;

        .el-icon {
          font-size: 18px;
          transition: all 0.3s;

          &:hover {
            color: var(--el-color-primary);
            transform: scale(1.2);
          }
        }
      }
    }
    .info-body {
      padding: 20px 15px;
      background-color: #ecedef;
      .info-body-content {
        background-color: #fff;
        padding: 15px;
        border-radius: 5px;

        /deep/ .el-collapse {
          overflow: auto;
          height: 400px;
          border: none;
        }
        .info-body-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 10px;
        }
      }
    }
  }

  .info-content {
    min-height: 50px;
  }
</style>
