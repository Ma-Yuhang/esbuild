import fs from 'fs/promises'
import path from 'path'
export default ({source}) => ({
  name: 'my-plugin-txt',
  setup(build) {
    build.onResolve({ filter: /\.txt$/ }, (args) => {
      console.log('onResolve', args)
      return {
        path: path.join(args.resolveDir, args.path),
        namespace: 'txt-namespace',
      }
    })
    build.onLoad({ filter: /.*/, namespace: 'txt-namespace' }, async (args) => {
      console.log('onLoad', args)
      const text = await fs.readFile(args.path, 'utf-8')
      const content = text.split(/\s+/).reduce((res, item) => {
        const [key, value] = item.split('=')
        res[key] = value
        return res
      }, {})
      return {
        // 这个contents就是import xxx的时候，contents是什么引入的就是什么
        contents: JSON.stringify(content),
        loader: 'json',
      }
    })
  },
})
