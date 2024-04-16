import fs from 'fs'

const isDevelopment = process.env.NODE_ENV === 'development'

const createScripts = (src) => `<script src="${src}" type="module" ></script>`
const createlinks = (href) => `<link rel="stylesheet" href="${href}" />`
const generateHtml = (scripts, links) => {
  const scriptsStr = scripts.join('\n')
  const linksStr = links.join('\n')
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      ${linksStr}
    </head>
    <body>
      <div id="root"></div>
      ${scriptsStr}
      ${
        isDevelopment
          ? `<script>new EventSource('/esbuild').addEventListener('change', () => location.reload())</script>`
          : ''
      }
    </body>
  </html>`
  return html
}

export default () => ({
  name: 'my-plugin-html',
  setup: (build) => {
    build.onEnd((result) => {
      if (result.errors.length > 0) return
      // console.log(result, 'result')

      // js和css可能有多个
      const scripts = []
      const links = []

      if (result.metafile) {
        const assets = Object.keys(result.metafile.outputs)
        assets.forEach((asset) => {
          asset = asset.slice(asset.lastIndexOf('/') + 1)
          if (asset.endsWith('.js')) {
            scripts.push(createScripts(asset))
          }
          if (asset.endsWith('.css')) {
            links.push(createlinks(asset))
          }
        })

        const html = generateHtml(scripts, links)
        const basePath = build.initialOptions.outdir || process.cwd()
        fs.writeFileSync(`${basePath}/index.html`, html)
      }
    })
  },
})
