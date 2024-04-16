import esbuild from 'esbuild'
import path from 'path'
import myPluginTime from './src/plugins/myPluginTime.js'
import myPluginClear from './src/plugins/myPluginClear.js'
import myPluginHtml from './src/plugins/myPluginHtml.js'
import myPluginTxt from './src/plugins/myPluginTxt.js'
const isProduction = process.env.NODE_ENV === 'production'
// console.log('isProduction', isProduction)

const config = {
  // 工作目录
  absWorkingDir: process.cwd(),
  // 输出环境(默认 browser) node browser
  platform: 'browser',
  // 输出格式(默认 iife)：iife cjs esm(如果platform为node则默认cjs)
  format: 'iife',
  // 指定静态文件名字
  assetNames: 'assets/[name]-[hash]',
  // 指定入口文件名字
  entryNames: '[dir]/[name]-[hash]',
  // tree shaking
  treeShaking: true,
  // external: ['lodash'],
  // 日志级别 'verbose' | 'debug' | 'info' | 'warning' | 'error' | 'silent' 默认silent
  // 只有在build()函数才会打印日志
  // logLevel: 'info',
  // 代码删除
  drop: isProduction ? ['console', 'debugger'] : undefined,
  // 入口列表
  entryPoints: ['src/App.tsx'],
  // 是否需要打包
  bundle: true,
  // 输出文件
  // outfile: './dist/App.js',
  // 输出目录
  outdir: 'dist',
  // 输出基础路径
  // outbase: 'src',
  // 目标环境
  target: ['es2020'],
  // 是否压缩
  minify: false,
  // 是否开启sourcemap
  sourcemap: true,
  // 是否生成元信息文件
  metafile: true,
  // publicPath: '/dist',
  // 指定loader
  loader: {
    // '.html': 'copy',
    '.js': 'jsx',
    '.png': 'file', // dataurl
  },
  plugins: [
    // 插件列表
    // imageInline(),
    // time(),
    myPluginTime(),
    myPluginClear(),
    myPluginHtml({
      template: './index.html'
    }),
    myPluginTxt({
      source: path.join(process.cwd(), '/src/assets/1.txt')
    })
  ],
}
if (isProduction) {
  const result = await esbuild.build(config)
  // 打印详细的元信息
  const text = await esbuild.analyzeMetafile(result.metafile, {
    verbose: true,
  })
  // console.log(text)
} else {
  const ctx = await esbuild.context(config)
  await ctx.watch()
  const server = await ctx.serve({
    port: 8000,
    host: 'localhost',
    servedir: 'dist',
  })
  console.log(`服务已启动: http://${server.host}:${server.port}`)
}
