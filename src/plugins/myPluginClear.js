import fs from 'fs'
export default () => ({
  name: 'my-plugin-clear',
  setup: (build) => {
    const { outdir } = build.initialOptions
    build.onStart(async () => {
      if (!fs.existsSync(outdir)) {
        console.log('文件夹不存在')
        return
      }
      await fs.promises.rm(outdir, { recursive: true })
      // console.log('删除成功')
    })
  },
})
