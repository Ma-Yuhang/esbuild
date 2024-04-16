export default () => ({
  name: 'my-plugin-time',
  setup: (build) => {
    // console.log(build.initialOptions);
    let time
    build.onStart(() => {
      time = performance.now()
    })
    build.onEnd((resultBuild) => {
      if(resultBuild.errors.length > 0) {
        console.log('构建出错')
        return
      }
      const timeBuild = performance.now() - time
      console.log('构建时间:', timeBuild.toFixed() + 'ms');
    })
    build.onDispose(() => {
      // console.log('Plugin is disposed...')
    })
  },
})
