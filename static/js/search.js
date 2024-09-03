(() => {
  fetch('/index.json')
  .then(response => response.json())
  .then(data => {
    const fuse = new Fuse(data, {
      keys: ['title', 'content'],
      shouldSort: true,
      includeMatches: true,
      minMatchCharLength: 2,
      threshold: 0.0,
      ignoreLocation: true,
    })
  
    document.getElementById('search-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(e.target)
      // data.entries() returns iterator, [...data.entries()] returns [["q", "input"]]
      const input = [...data.entries()][0][1]
      const results = fuse.search(input)
      displayResults(input, results)
    });
  });
})();

function displayResults(input, results) {
  const searchResults = document.getElementById('search-result');
  searchResults.setAttribute('style', 'display: block;')
  searchResults.nextElementSibling.setAttribute('style', 'display: none;')
  let html = renderResultsCountHtml(results.length, input)
  if (results.length > 0) {
    let li = renderResultsItemHtml(results)
    html += `<ul>${li}</ul>`
  }
  searchResults.innerHTML = html
}

function renderResultsCountHtml(count, input) {
  let html = `
<div class="TableObject border-gray-light py-3 mt-6">
  <div class="user-repo-search-results-summary TableObject-item TableObject-item--primary v-align-top">
    <strong>${count}</strong>
      results
      for "<strong>${input}</strong>"
  </div>
</div>
`
  return html
}

function renderResultsItemHtml(results) {
  // modified from https://github.com/brunocechet/Fuse.js-with-highlight
  var highlighter = function(resultItem){
    resultItem.matches.forEach((matchItem) => {
      var text = resultItem.item[matchItem.key];
      var result = []
      var matches = [].concat(matchItem.indices);
      var pair = matches.shift()
      
      for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i)
        if (pair && i == pair[0]) {
          result.push('<span style="color: red;">')
        }
        result.push(char)
        if (pair && i == pair[1]) {
          result.push('</span>')
          pair = matches.shift()
        }
      }
      resultItem.highlight = result.join('');
  
      if(resultItem.children && resultItem.children.length > 0){
        resultItem.children.forEach((child) => {
          highlighter(child);
        });
      }
    });
  };  

  let html = ``
  results.forEach(result => {
    highlighter(result)
    // truncated highlight content
    let truncated = result.highlight.substring(0, 2000)
    const reg = /(<span style="color: red;">[a-zA-Z0-9\u4e00-\u9fa5]+<\/span>)/g
    let array = truncated.split(reg)
    // drop unstable part
    array.pop()
    let content = ""
    if (array.length > 0) {
      content = array.join('')
    } else {
      // fallback to no highlighted truncated content
      content = result.item.content.substring(0, 2000)
    }
    html += `
<li class="col-12 d-flex width-full py-4 border-top color-border-secondary public source">
  <div class="col-12 d-inline-block">
    <div class="d-inline-block mb-1">
      <h3 class="wb-break-all">
        <a href="${result.item.permalink}">${result.item.title}</a>
      </h3>
    </div>

    <div>
      <div class="col-12 d-inline-block text-gray mb-2 pr-4">
        ${content} ...
      </div>
    </div>

  </div>
</li>
`
  })
  return html
}
