const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const now = new Date();
let contributions;

(() => {
  const dom = document.querySelector('#contributions');
  if (!dom) {
    return;
  }

  contributions = JSON.parse(dom.getAttribute('data'));
  let year = 0;
  for (const item of contributions) {
    item.publishDate = decodeURI(item.publishDate);
    item.date = new Date(item.publishDate);
    if (item.date.getFullYear() > year) {
      year = item.date.getFullYear();
    }
    item.title = decodeURI(item.title);
  }

  yearList();
  yearly(year.toString());
})();

function yearly(year) {
  let startDate;
  let endDate;
  if (year != now.getFullYear().toString()) {
    const date = new Date(year);
    startDate = new Date(date.getTime() - date.getDay() * 24 * 60 * 60 * 1000);
    endDate = new Date(date.getFullYear(), 11, 31);
  } else {
    endDate = now;
    startDate = new Date(endDate.getTime() - 364 * 24 * 60 * 60 * 1000 - endDate.getDay() * 24 * 60 * 60 * 1000);
  }
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  const posts = [];
  const ms = [];
  for (const item of contributions) {
    if (item.date >= startDate && item.date <= endDate) {
      posts.push(item);
      if (!ms.includes(item.date.getMonth())) {
        ms.push(item.date.getMonth());
      }
    }
  }
  posts.sort((a, b) => { return b - a });
  document.querySelector('#posts-activity').innerHTML = '';
  for (const month of ms) {
    const node = document.createElement('div');
    node.innerHTML = monthly(year, month, posts);
    document.querySelector('#posts-activity').appendChild(node);
  }

  graph(year, posts, startDate, endDate);

  const yearList = document.querySelectorAll('.js-year-link');
  for (const elem of yearList) {
    if (elem.innerText == year) {
      elem.classList.add('selected');
    } else {
      elem.classList.remove('selected');
    }
  }
}

function monthly(year, month, posts) {
  const monthPosts = posts.filter(post => post.date.getMonth() === month);
  let liHtml = '';
  for (const post of monthPosts) {
    liHtml += `<li class="d-flex mt-1 py-1 flex-row flex-nowrap flex-justify-between"><span class="flex-auto css-truncate css-truncate-target">
  <span class="profile-rollup-icon">
    <svg class="octicon octicon-repo v-align-middle text-gray-light mr-1" viewBox="0 0 12 16" version="1.1"
      width="12" height="16" aria-hidden="true">
      <path fill-rule="evenodd"
        d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z">
      </path>
    </svg>
  </span>
  <a class="mr-2 " data-hovercard-type="repository" href="${post.link}">${post.title}</a>
</span>
<time title="This post was made on ${months[post.date.getMonth()]} ${post.date.getDate()}" class="f6 text-gray-light pt-1">
  ${months[post.date.getMonth()]} ${post.date.getDate()}
</time></li>`;
  }
  let html = `
  <div class="contribution-activity-listing float-left col-12 col-lg-10">
    <div class="profile-timeline discussion-timeline width-full pb-4">
      <h3 class="profile-timeline-month-heading bg-white d-inline-block h6 pr-2 py-1">
        ${months[month]} <span class="text-gray">${monthPosts.length > 0 ? monthPosts[0].date.getFullYear() : year}</span>
      </h3>
      <div class="profile-rollup-wrapper py-4 pl-4 position-relative ml-3 js-details-container Details open">
        <span class="discussion-item-icon"><svg class="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width="12"
            height="16" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z">
            </path>
          </svg></span>
        <button type="button" class="btn-link f4 muted-link no-underline lh-condensed width-full js-details-target "
          aria-expanded="false">
          <span class="float-left ws-normal text-left">
            Created ${monthPosts.length} post${monthPosts.length > 1 ? 's' : ''}
          </span>
          <span class="d-inline-block float-right">
            <span class="profile-rollup-toggle-closed float-right" aria_label="Collapse"><svg class="octicon octicon-fold"
                viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M7 9l3 3H8v3H6v-3H4l3-3zm3-6H8V0H6v3H4l3 3 3-3zm4 2c0-.55-.45-1-1-1h-2.5l-1 1h3l-2 2h-7l-2-2h3l-1-1H1c-.55 0-1 .45-1 1l2.5 2.5L0 10c0 .55.45 1 1 1h2.5l1-1h-3l2-2h7l2 2h-3l1 1H13c.55 0 1-.45 1-1l-2.5-2.5L14 5z">
                </path>
              </svg></span>
            <span class="profile-rollup-toggle-open float-right" aria_label="Expand"><svg class="octicon octicon-unfold"
                viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                <path fill-rule="evenodd"
                  d="M11.5 7.5L14 10c0 .55-.45 1-1 1H9v-1h3.5l-2-2h-7l-2 2H5v1H1c-.55 0-1-.45-1-1l2.5-2.5L0 5c0-.55.45-1 1-1h4v1H1.5l2 2h7l2-2H9V4h4c.55 0 1 .45 1 1l-2.5 2.5zM6 6h2V3h2L7 0 4 3h2v3zm2 3H6v3H4l3 3 3-3H8V9z">
                </path>
              </svg></span>
          </span>
        </button>
        <ul class="profile-rollup-content mt-1" data-repository-hovercards-enabled="" id="posts-activity-ul">
        ${liHtml}
        </ul>
      </div>
    </div>
  </div>
  `;
  return html;
}

function yearList() {
  const years = [];
  for (const item of contributions) {
    const year = item.date.getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
  }
  years.sort((a, b) => { return b - a });

  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    const node = document.createElement('li');
    node.innerHTML = `<a class="js-year-link filter-item px-3 mb-2 py-2" aria-label="Post activity in ${year}" onclick="yearly('${year}') | event.stopPropagation()">${year}</a>`;
    document.querySelector('#year-list').appendChild(node);
  }
}

function graph(year, posts, startDate, endDate) {
  const postsStr = posts.length === 1 ? "post" : "posts";
  if (year == now.getFullYear().toString()) {
    document.querySelector('#posts-count').innerText = `${posts.length}  ${postsStr} in the last year`;
  } else {
    document.querySelector('#posts-count').innerText = `${posts.length}  ${postsStr} in ${year}`;
  }

  let html = ``;
  const count = {};
  for (const post of posts) {
    const date = `${post.date.getFullYear()}-${(post.date.getMonth() + 1).toString().padStart(2, '0')}-${post.date.getDate().toString().padStart(2, '0')}`;
    if (count[date] == undefined) {
      count[date] = 1;
    } else {
      count[date]++;
    }
  }
  const monthPos = [];
  let startMonth = -1;
  for (let i = 0; i < 53; i++) {
    html += `<g transform="translate(${i * 16}, 0)">`;
    for (let j = 0; j < 7; j++) {
      const date = new Date(startDate.getTime() + (i * 7 + j) * 24 * 60 * 60 * 1000);
      const dataDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      if (date > endDate) {
        continue;
      }

      if (j == 0) {
        if (i <= 51) {
          if (startMonth != date.getMonth()) {
            monthPos.push(i);
            startMonth = date.getMonth();
          }
        }
      }

      let c;
      if (count[dataDate] == undefined) {
        c = 0;
      } else {
        c = count[dataDate];
      }
      let color;
      switch (c) {
        case 0:
          color = "#ebedf0";
          break;
        case 1:
          color = "#c6e48b";
          break;
        case 2:
          color = "#7bc96f";
          break;
        case 3:
          color = "#239a3b";
          break;
        default:
          color = "#196127";
      }
      html += `<rect class="day" width="12" height="12" x="${16 - i}" y="${j * 15}"
      fill="${color}" data-count="${c}"
      data-date="${dataDate}"></rect>`;
    }
    html += '</g>';
  }
  if (monthPos[1] - monthPos[0] < 2) {
    monthPos[0] = -1;
  }
  for (let i = 0; i < monthPos.length; i++) {
    const month = monthPos[i];
    if (month == -1) {
      continue;
    }
    html += `<text x="${15 * month + 16}" y="-9"
    class="month">${months[(i + startDate.getMonth()) % 12]}</text>`;
  }
  html += `
<text text-anchor="start" class="wday" dx="-10" dy="8"
style="display: none;">Sun</text>
<text text-anchor="start" class="wday" dx="-10" dy="25">Mon</text>
<text text-anchor="start" class="wday" dx="-10" dy="32"
style="display: none;">Tue</text>
<text text-anchor="start" class="wday" dx="-10" dy="56">Wed</text>
<text text-anchor="start" class="wday" dx="-10" dy="57"
style="display: none;">Thu</text>
<text text-anchor="start" class="wday" dx="-10" dy="85">Fri</text>
<text text-anchor="start" class="wday" dx="-10" dy="81"
style="display: none;">Sat</text>
`;
  document.querySelector('#graph-svg').innerHTML = html;
  stopClickEvent('.day');
}
