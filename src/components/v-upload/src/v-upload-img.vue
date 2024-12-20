<template>
  <div class="v-upload-img">
    <!-- 图片上传组件 -->
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      :limit="1"
      :on-change="handleFileChange"
      list-type="picture-card"
      :file-list="fileList"
      class="avatar-uploader"
      :disabled="uploadDisabled"
      :style="{ '--upload-display': imageUrl ? 'none' : 'block' }"
    >
      <template #trigger>
        <transition name="el-fade-in-linear">
          <div
            v-show="!imageUrl"
            class="upload-content"
            style="width: 148px; height: 148px"
          >
            <el-icon class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </div>
        </transition>
      </template>

      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="isPreview = true"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span class="el-upload-list__item-delete" @click="handleDownload">
              <el-icon><Download /></el-icon>
            </span>
            <span class="el-upload-list__item-delete" @click="handleRemove">
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>

      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 1mb
        </div>
      </template>
    </el-upload>

    <transition name="el-fade-in-linear">
      <div class="perview" v-show="isPreview">
        <div class="perview-mask"></div>
        <img :src="imageUrl" alt="Preview Image" />
        <div class="image-viewer__close" @click="isPreview = false">
          <el-icon><Close /></el-icon>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from "vue";
  import { ElUpload, UploadFile, UploadRawFile } from "element-plus";
  import {
    Plus,
    Delete,
    Download,
    ZoomIn,
    Close
  } from "@element-plus/icons-vue";
  import { uploadImage } from "@/service/main/system/system.service";
  import message from "@/utils/message";

  interface IProps {
    modelValue: string;
  }
  const props = defineProps<IProps>();
  const emit = defineEmits(["update:modelValue"]);

  const imgType = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  const uploadDisabled = ref(false);
  const isPreview = ref(false);
  const imageUrl = ref();
  const blobUrl = ref("");
  const imageName = ref("");
  const fileList = ref<any[]>([
    // {
    //   name: "test",
    //   url: "http://192.168.31.58:8000/uploads/imgs/24637108_p0_1733057703222.jpg"
    // }
  ]);
  const uploadRef = ref<InstanceType<typeof ElUpload>>();

  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue) {
        imageUrl.value = newValue;
        fileList.value[0] = { url: newValue };
      } else {
        imageUrl.value = "";
        fileList.value = [];
      }
    },
    {
      immediate: true
    }
  );

  const clearFiles = (interval = 1000) =>
    setTimeout(() => {
      uploadRef.value?.clearFiles();
      uploadDisabled.value = false;
      emit("update:modelValue", "");
    }, interval);

  const handleBeforeUpload = (rawFile: UploadRawFile) => {
    const M = 1024 * 1024;
    if (rawFile.size / M > 1) {
      message.warning("请上传小于 1M 的图片");
      return false;
    }

    if (!imgType.includes(rawFile.type)) {
      message.warning("请上传 jpg/png/jpeg/webp 等格式的图片");
      return false;
    }

    return true;
  };

  const handleFileChange = async (uploadFile: UploadFile) => {
    uploadDisabled.value = true;
    // 上传前的判断校验
    const result = handleBeforeUpload(uploadFile.raw!);
    if (!result) {
      clearFiles();
      return;
    }

    // 请求接口，上传图片
    const formData = new FormData();
    formData.append("avatar", uploadFile.raw!);
    try {
      // 文件过大，在上传的过程中被判断无权限，后端返回 403 并关闭了连接
      // 前端这边捕获不到 403 而是会捕获到 ERR_CONNECTION_RESET 错误；
      const result = await uploadImage(formData);
      if (result && result.code === 0) {
        setTimeout(() => {
          imageUrl.value = result.data.url;
          imageName.value = result.data.filename;
          emit("update:modelValue", imageUrl.value);
          blobUrl.value = uploadFile.url!;
          uploadDisabled.value = false;
        }, 500);
      } else {
        clearFiles();
        message.error(result.message);
      }
    } catch (error: any) {
      clearFiles();
      error.response && message.error(error.response.data.message);
      console.log("上传出错");
    }
  };

  const handleDownload = async () => {
    const link = document.createElement("a") as HTMLAnchorElement;
    const proxyUrl =
      "/httpProxy/uploads/" + imageUrl.value.split("uploads").at(-1);
    // 创建 Blob 对象
    fetch(proxyUrl)
      .then((response) => response.blob()) // 通过 Fetch 获取图片的 Blob
      .then((blob) => {
        const url = URL.createObjectURL(blob); // 创建 Blob 对象的 URL
        link.href = url; // 设置下载链接的 href
        link.download = imageName.value; // 设置下载文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 清理 URL 对象
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("下载图片失败:", error);
      });
  };

  const handleRemove = () => {
    imageUrl.value = "";
    clearFiles(0);
  };
</script>

<style scoped lang="less">
  .avatar-uploader {
    .avatar {
      width: 100%;
      height: 100%;
      display: block;
    }
    .upload-content {
      width: 100%;
      height: 100%;
      background-color: var(--el-fill-color-lighter);
      &:hover {
        border-color: var(--el-color-primary);
      }
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        text-align: center;
      }
    }

    /deep/ .el-upload-list__item {
      margin: 0;
    }
    /deep/.el-upload {
      display: var(--upload-display);
      border: 0;
      background: transparent;
    }
  }

  .v-upload-img {
    position: relative;
    .perview {
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      .perview-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0.5;
        background: var(--el-text-color-bold);
        z-index: 1;
      }

      img {
        position: absolute;
        z-index: 2;
        width: 800px;
        height: 533px;
      }
      .image-viewer__close {
        position: absolute;
        top: 40px;
        right: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        font-size: 24px;
        color: #fff;
        background-color: var(--el-text-color-regular);
        border-color: #fff;
        border-radius: 50%;
        opacity: 0.8;
        cursor: pointer;
        box-sizing: border-box;
        z-index: 2;
      }
    }
  }
</style>
