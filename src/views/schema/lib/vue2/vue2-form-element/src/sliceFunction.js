export async function httpRequest(e) {
  const fd = new FormData();

  const { file, data = {}, action = "/common/uploadFile" } = e;

  for (let [key, value] of Object.entries(data)) {
    fd.append(key, value);
  }

  fd.append("file", file);
  fd.append("crypto", true);

  try {
    this.$message.info({
      iconClass: "el-message__icon el-icon-loading",
      message: "正在上传",
      duration: 0,
    });

    const result = await this.$axios.post(action, fd);

    this.$message.closeAll();

    this.$message.success("上传成功");

    const fileList = this.fileList;

    if (Array.isArray(fileList)) {
      fileList[fileList.length - 1]["url"] = result.body;

      this.fileList = fileList;
    }
  } catch (e) {
    console.error("上传失败：", e);

    this.$message.closeAll();

    this.$message.error(e.message || e.msg);
  }
}
