const git = {}
const modes = require('js-git/lib/modes')
const db = require('js-git/mixins/indexed-db')

// Browser only: we need to initialize the indexeddb
db.init(function (err) {
  if (err) throw err
})

function initRepo () {
  require('js-github/mixins/github-db')(git, 'chumakov-azoft/azoft-tk', localStorage['githubToken'])
  // localStorage.githubToken);

  // Github has this built-in, but it's currently very buggy so we replace with
  // the manual implementation in js-git.
  // require('js-git/mixins/create-tree')(git)

  // Cache github objects locally in indexeddb
  require('js-git/mixins/add-cache')(git, db)

  // Cache everything except blobs over 100 bytes in memory.
  // This makes path-to-hash lookup a sync operation in most cases.
  require('js-git/mixins/mem-cache')(git)

  // This combines parallel requests for the same resource for effeciency under load.
  require('js-git/mixins/read-combiner')(git)

  // This makes the object interface less strict.  See its docs for details
  require('js-git/mixins/formats')(git)

  // axios.defaults.headers.common = { 'Authorization': `token ${localStorage['githubToken']}` }
}

git.saveState = function (base, files, contents) {
  if (!git.readRef) initRepo()
  git.readRef('refs/heads/master', (e, headHash) => {
    if (e) console.warn(e)
    git.loadAs('commit', headHash, (e, commit) => {
      if (e) console.warn(e)
      git.loadAs('tree', commit.tree, (e, tree) => {
        if (e) console.warn(e)
        const changes = files.map((item, index) => {
          return {
            path: base + files[index],
            mode: modes.file,
            content: contents[index],
          }
        })
        changes.base = commit.tree
        console.log(changes)
        git.createTree(changes, (e, treeHash) => {
          if (e) console.warn(e)
          git.saveAs('commit', {
            tree: treeHash,
            author: {
              name: 'chumakov-azoft',
              email: 'chumakov@azoft.com'
            },
            parent: headHash,
            message: 'update'
          }, (e, commitHash) => {
            if (e) console.warn(e)
            git.updateRef('refs/heads/master', commitHash, (e, ref) => {
              if (e) console.warn(e)
              console.log('done!', ref)
            }, true)
          })
        })
      })
    })
  })
}

git.saveFile = function (fileName, content) {
  var a = document.createElement('a')
  var file = new Blob([content], { type: 'text/plain' })
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}

export default git
