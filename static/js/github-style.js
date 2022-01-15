const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const now = new Date();
let contributions;

(() => {
  setRelativeTime();
  const dom = document.querySelector('#contributions');
  if (!dom) {
    return;
  }

  contributions = JSON.parse(dom.getAttribute('data'));
  let year = 0;
  for (const item of contributions) {
    item.publishDate = decodeURI(item.publishDate).replace(' ', 'T');
    item.date = new Date(item.publishDate);
    if (item.date.getFullYear() > year) {
      year = item.date.getFullYear();
    }
    item.title = decodeURI(item.title);
  }

  yearList();
  switchYear(year.toString());
})();

function switchYear(year) {
  let startDate;
  let endDate;
  if (year !== now.getFullYear().toString()) {
    const date = new Date(Number(year), 0, 1, 0, 0, 0, 0);
    startDate = new Date(date.getFullYear(), 0, 1);
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
      const time = item.date.getFullYear().toString() + "-" + item.date.getMonth().toString();
      if (!ms.includes(time)) {
        ms.push(time);
      }
    }
  }
  posts.sort((a, b) => { return b - a });
  document.querySelector('#posts-activity').innerHTML = '';
  for (const time of ms) {
    const node = document.createElement('div');
    const array = time.split("-");
    node.innerHTML = monthly(array[0], Number(array[1]), posts);
    document.querySelector('#posts-activity').appendChild(node);
  }

  graph(year, posts, startDate, endDate);

  const yearList = document.querySelectorAll('.js-year-link');
  for (const elem of yearList) {
    if (elem.innerText === year) {
      elem.classList.add('selected');
    } else {
      elem.classList.remove('selected');
    }
  }
}

function monthly(year, month, posts) {
  const monthPosts = posts.filter(post =>
    post.date.getFullYear().toString() === year && post.date.getMonth() === month
  );
  let liHtml = '';
  for (const post of monthPosts) {
    liHtml += `<li class="ml-0 py-1 d-flex">
    <div
      class="col-8 css-truncate css-truncate-target lh-condensed width-fit flex-auto min-width-0">
      <a href="${post.link}">${post.title}</a>
    </div>
    <time  title="This post was made on ${months[post.date.getMonth()]} ${post.date.getDate()}"
      class="col-2 text-right f6 text-gray-light pt-1">
      ${months[post.date.getMonth()]} ${post.date.getDate()}
    </time>
  </li>`;
  }
  return `
  <div class="contribution-activity-listing float-left col-12 col-lg-10">
    <div class="width-full pb-4">
      <h3 class="h6 pr-2 py-1 border-bottom mb-3" style="height: 14px;">
        <span class="color-bg-canvas pl-2 pr-3">${monthsFull[month]} <span
            class="text-gray">${monthPosts.length > 0 ? monthPosts[0].date.getFullYear() : year}</span></span>
      </h3>

      <div class="TimelineItem ">
        <div class="TimelineItem-badge ">
          <svg class="octicon octicon-repo-push" viewBox="0 0 16 16" version="1.1" width="16" height="16">
            <path fill-rule="evenodd"
              d="M1 2.5A2.5 2.5 0 013.5 0h8.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V1.5h-8a1 1 0 00-1 1v6.708A2.492 2.492 0 013.5 9h3.25a.75.75 0 010 1.5H3.5a1 1 0 100 2h5.75a.75.75 0 010 1.5H3.5A2.5 2.5 0 011 11.5v-9zm13.23 7.79a.75.75 0 001.06-1.06l-2.505-2.505a.75.75 0 00-1.06 0L9.22 9.229a.75.75 0 001.06 1.061l1.225-1.224v6.184a.75.75 0 001.5 0V9.066l1.224 1.224z">
            </path>
          </svg>
        </div>
        <div class="TimelineItem-body ">
          <details class="Details-element details-reset" open>
            <summary role="button" class="btn-link f4 muted-link no-underline lh-condensed width-full">
              <span class="color-text-primary ws-normal text-left">
                Created ${monthPosts.length} post${monthPosts.length > 1 ? 's' : ''}
              </span>
              <span class="d-inline-block float-right color-icon-secondary">
                <span class="Details-content--open float-right">
                  <svg class="octicon octicon-fold" viewBox="0 0 16 16" version="1.1" width="16" height="16">
                    <path fill-rule="evenodd"
                      d="M10.896 2H8.75V.75a.75.75 0 00-1.5 0V2H5.104a.25.25 0 00-.177.427l2.896 2.896a.25.25 0 00.354 0l2.896-2.896A.25.25 0 0010.896 2zM8.75 15.25a.75.75 0 01-1.5 0V14H5.104a.25.25 0 01-.177-.427l2.896-2.896a.25.25 0 01.354 0l2.896 2.896a.25.25 0 01-.177.427H8.75v1.25zm-6.5-6.5a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 016 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0112 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z">
                    </path>
                  </svg></span>
                <span class="Details-content--closed float-right"><svg class="octicon octicon-unfold"
                    viewBox="0 0 16 16" version="1.1" width="16" height="16">
                    <path fill-rule="evenodd"
                      d="M8.177.677l2.896 2.896a.25.25 0 01-.177.427H8.75v1.25a.75.75 0 01-1.5 0V4H5.104a.25.25 0 01-.177-.427L7.823.677a.25.25 0 01.354 0zM7.25 10.75a.75.75 0 011.5 0V12h2.146a.25.25 0 01.177.427l-2.896 2.896a.25.25 0 01-.354 0l-2.896-2.896A.25.25 0 015.104 12H7.25v-1.25zm-5-2a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM6 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 016 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5zM12 8a.75.75 0 01-.75.75h-.5a.75.75 0 010-1.5h.5A.75.75 0 0112 8zm2.25.75a.75.75 0 000-1.5h-.5a.75.75 0 000 1.5h.5z">
                    </path>
                  </svg>
                </span>
              </span>
            </summary>
            <div>
              <ul class="list-style-none mt-1">
                ${liHtml}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </div>
  </div>`;
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
    node.innerHTML = `<li><a class="js-year-link filter-item px-3 mb-2 py-2" onclick="switchYear('${year}')">${year}</a></li>`;
    document.querySelector('#year-list').appendChild(node);
  }
}

function graph(year, posts, startDate, endDate) {
  const postsStr = posts.length === 1 ? "post" : "posts";
  if (year === now.getFullYear().toString()) {
    document.querySelector('#posts-count').innerText = `${posts.length}  ${postsStr} in the last year`;
  } else {
    document.querySelector('#posts-count').innerText = `${posts.length}  ${postsStr} in ${year}`;
  }

  let html = ``;
  const count = {};
  for (const post of posts) {
    const date = `${post.date.getFullYear()}-${(post.date.getMonth() + 1).toString().padStart(2, '0')}-${post.date.getDate().toString().padStart(2, '0')}`;
    if (count[date] === undefined) {
      count[date] = 1;
    } else {
      count[date]++;
    }
  }
  const monthPos = [];
  let startMonth = -1;
  const weekday = startDate.getDay();
  for (let i = 0; i < 53; i++) {
    html += `<g transform="translate(${i * 16}, 0)">`;
    for (let j = 0; j < 7; j++) {
      const date = new Date(startDate.getTime() + (i * 7 + j - weekday) * 24 * 60 * 60 * 1000);
      const dataDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      if (date < startDate || date > endDate) {
        continue;
      }

      if (j === 0) {
        if (i <= 51) {
          if (startMonth !== date.getMonth()) {
            monthPos.push(i);
            startMonth = date.getMonth();
          }
        }
      }

      let c;
      if (count[dataDate] === undefined) {
        c = 0;
      } else {
        c = count[dataDate];
      }
      let color;
      switch (c) {
        case 0:
          color = "var(--color-calendar-graph-day-bg)";
          break;
        case 1:
          color = "var(--color-calendar-graph-day-L1-bg)";
          break;
        case 2:
          color = "var(--color-calendar-graph-day-L2-bg)";
          break;
        case 3:
          color = "var(--color-calendar-graph-day-L3-bg)";
          break;
        default:
          color = "var(--color-calendar-graph-day-L4-bg)";
      }
      html += `<rect class="day" width="11" height="11" x="${16 - i}" y="${j * 15}"
      fill="${color}" onmouseover="svgTip(this, ${c}, '${dataDate}')" onmouseleave="hideTip()"></rect>`;
    }
    html += '</g>';
  }
  if (monthPos[1] - monthPos[0] < 2) {
    monthPos[0] = -1;
  }
  for (let i = 0; i < monthPos.length; i++) {
    const month = monthPos[i];
    if (month === -1) {
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
}

let svgElem = document.createElement('div');
svgElem.style.cssText = 'pointer-events: none; display: none;';
svgElem.classList.add(...["svg-tip", "svg-tip-one-line"]);
document.body.appendChild(svgElem);

function svgTip(elem, count, dateStr) {
  if (window.screen.width < 768) {
    return;
  }
  const rect = getCoords(elem);
  const date = new Date(dateStr);
  const dateFmt = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  if (count) {
    svgElem.innerHTML = `<strong>${count} posts</strong> on ${dateFmt}`;
  } else {
    svgElem.innerHTML = `<strong>No posts</strong> on ${dateFmt}`;
  }
  svgElem.style.display = 'block';
  const tipRect = svgElem.getBoundingClientRect();
  svgElem.style.top = `${rect.top - 50}px`;
  svgElem.style.left = `${rect.left - tipRect.width / 2 + rect.width / 2}px`;
}

function hideTip() {
  svgElem.style.display = 'none';
}

function getCoords(elem) {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top, left, width: box.width, height: box.height };
}

function relativeTime(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  const seconds = Math.floor(diff);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 60 / 60);
  const days = Math.floor(diff / 60 / 60 / 24);
  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return `${hours} hours ago`;
  }
  if (days < 30) {
    return `${days} days ago`;
  }
  if (date.getFullYear() === now.getFullYear()) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function setRelativeTime() {
  document.querySelectorAll('relative-time').forEach(elem => {
    const dateStr = elem.getAttribute('datetime');
    elem.innerHTML = relativeTime(dateStr);
    elem.setAttribute('title', new Date(dateStr).toLocaleString());
  });
}
