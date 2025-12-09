const state = { lang: 'cn' }
const S2T = {
  '画': '畫',
  '社': '社',
  '规': '規',
  '则': '則',
  '员': '員',
  '活': '活',
  '动': '動',
  '联': '聯',
  '系': '繫',
  '风': '風',
  '格': '格',
  '业': '業',
  '务': '務',
  '音': '音',
  '乐': '樂',
  '游': '遊',
  '戏': '戲',
  '写': '寫',
  '动': '動',
  '画': '畫',
  '联': '聯',
  '绘': '繪',
  '简': '簡',
  '介': '介',
  '欢': '歡',
  '迎': '迎',
  '暂': '暫',
  '无': '無',
  '关': '關',
  '问': '問',
  '题': '題',
  '加': '加',
  '入': '入',
  '示': '示',
  '例': '例',
  '图': '圖',
  '廊': '廊',
  '价': '價',
  '补': '補',
  '充': '充',
  '关': '關',
  '于': '於',
  '维': '維',
  '码': '碼',
  '国': '國',
  '语': '語',
  '日': '日',
  '方': '方',
  '言': '言',
  '星': '星',
  '盘': '盤',
  '灵': '靈',
  '摆': '擺',
  '纸': '紙',
  '雕': '雕',
  '羊': '羊',
  '毛': '毛',
  '毡': '氈',
  '剪': '剪',
  '辑': '輯',
  '问': '問',
  '鉴': '鑒',
  '观': '觀',
  '罗': '羅',
  '扩': '擴'
}
const originalTextMap = new Map(); // 新增：存储原始简体文本的Map
function toTraditional(str) { return str.split('').map(c => S2T[c] || c).join('') }
function transEl(el) {
  if (!el) return;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  texts.forEach(node => {
    if (!originalTextMap.has(node)) {
      originalTextMap.set(node, node.nodeValue); // 首次遍历时存储原始文本
    }
    node.nodeValue = state.lang === 'cn' ? originalTextMap.get(node) : toTraditional(originalTextMap.get(node));


  });
}

function initNav() {
  const h = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  if (h) {
    h.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
  const lt = document.getElementById('lang-toggle');
  if (lt) {
    lt.addEventListener('click', () => {
      state.lang = state.lang === 'cn' ? 'tw' : 'cn';
      transEl(document.body);
    });
  }
}

function spawnSakura() {
  const container = document.getElementById('sakura-container');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const s = document.createElement('span');
    s.className = 'petal';
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = (8 + Math.random() * 8) + 's';
    s.style.animationDelay = (Math.random() * 5) + 's';
    s.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
    container.appendChild(s);
  }
}

const TAGS = {
  '绘画': {
    title: '绘画',
    groups: [
      { key: '风格', title: '风格', tags: ['平涂', '伪厚涂', '厚涂', '线稿', '草稿', '纸绘'] },
      { key: '业务', title: '业务', tags: ['头像', '胸像', '半身', '立绘', 'Q版', "横插", "竖插", "模板"] }
    ]
  },
  '美工设计': {
    title: '美工设计',
    groups: [
      { key: '设计', title: '设计', tags: ['ID水印设计',] },
      { key: '美工', title: '美工', tags: ['设卡'] }
    ]
  },
  '写文': {
    title: '写文',
    groups: [
      { key: '类型', title: '类型', tags: ['OC文', '世界观', '印象鉴', '短句'] }
    ]
  },
  '拆分': {
    title: '拆分',
    groups: [
      // { key: '类型', title: '类型', tags: ['对称', '不对称', '粗拆', '细拆'] }
    ]
  },
  'Live2D建模': {
    title: 'Live2D建模',
    groups: [
      { key: '业务', title: '业务', tags: ['全图动图', '仅眨眼动图', '虚拟皮套'] }
    ]
  },
  // '占卜': {
  //   title: '占卜',
  //   groups: [
  //     { key: '类型', title: '类型', tags: ['塔罗', '灵摆', '星盘', '东玄'] }
  //   ]
  // },
  // '手作': {
  //   title: '手工',
  //   groups: [
  //     { key: '类型', title: '类型', tags: ['黏土', '纸雕', '羊毛毡', '不织布'] }
  //   ]
  // },
  // '配音': {
  //   title: '配音服务',
  //   groups: [
  //     { key: '类型', title: '类型', tags: ['国语', '日语', '方言', '歌唱'] }
  //   ]
  // },
  // '游戏': {
  //   title: '游戏制作',
  //   groups: [
  //     { key: '类型', title: '类型', tags: ['糖果消消乐', '视觉小说'] }
  //   ]
  // }
}

const MEMBERS = [
  {
    id: '001',
    name: '咪噜喵',
    role: '绘画/美工设计/拆分/Live2D建模师/3D建模师/游戏编程师',
    avatar: 'assets/avatars/avatar1.png',
    bio: '雨露均沾的工具人，网站的制作运营者',
    mainTags: ['绘画', '美工设计', '拆分', 'Live2D建模'],

    services: [{
      name: '对称QQ头',
      price: '¥8r+',
      note: '-工期：3-6天\u3000\u3000-复杂设：+2r-6r',
      gallery: [{
        type: 'image',
        src: 'assets/gallery/001_artwork1_1.png'
      }, {
        type: 'image',
        src: 'assets/gallery/001_artwork1_2.png'
      }, {
        type: 'image',
        src: 'assets/gallery/001_artwork1_3.png'
      }],
      tags: ['平涂', 'Q版', '头像']
    }, {
      name: '正比大头',
      price: '¥22r',
      note: '-含简单背景\u3000\u3000-工期：3-6天\u3000\u3000-复杂设+4r-8r',
      gallery: [{
        type: 'image',
        src: 'assets/gallery/001_artwork2_1.jpg'
      }, {
        type: 'image',
        src: 'assets/gallery/001_artwork2_2.png'
      }],
      tags: ['平涂', '正比', '头像']
    }, {
      name: '动图拆分',
      price: '¥30r-50r+',
      note: '-粗拆：￥30r+\u3000\u3000-细拆：￥50r+\n-价格根据复杂度浮动',
      gallery: [{
        type: 'image',
        src: 'assets/gallery/001_artwork3_1.png'
      }],
      tags: ['拆分']
    }, {
      name: 'Live2D动图建模',
      price: '¥30r-50r+',
      note: '-仅眨眼动图（包拆分）：￥20r+\n-头发飘动+￥8r\u3000\u3000-嘴巴变形+￥4r\n-整张图：￥40r+\n价格根据复杂度浮动\n-约包拆分，拆分费可打八折',
      gallery: [{
        type: 'video',
        src: 'assets/gallery/001_artwork4_1.mp4'
      }, {
        type: 'video',
        src: 'assets/gallery/001_artwork4_2.mp4'
      }],
      tags: ['Live2D建模', '仅眨眼动图', '全图动图']
    }], 
  }
  // {
  //   id: '',
  //   name: '',
  //   role: '',
  //   avatar: '',
  //   bio: '',
  //   mainTags: [''],

  //   services: [{
  //     name: '',
  //     price: '',
  //     note: '',
  //     gallery: [{
  //       type: '',
  //       src: ''
  //     }, {
  //       type: '',
  //       src: ''
  //     }],
  //     tags: ['']
  //   }]
  // },

]

function initMembers() {
  const grid = document.getElementById('members-grid');
  if (!grid) return;
  const search = document.getElementById('search-input');
  const toggle = document.getElementById('toggle-filter');
  const panel = document.getElementById('filter-panel');
  const mainTags = document.getElementById('main-tags');
  const subTags = document.getElementById('sub-tags');
  const selectedBar = document.getElementById('selected-tags');
  const noResults = document.getElementById('no-results');

  // Pagination elements
  const pageSelect = document.getElementById('page-select');
  const prevPageBtn = document.getElementById('prev-page');
  const nextPageBtn = document.getElementById('next-page');
  const pageInfoSpan = document.getElementById('page-info');

  const MEMBERS_PER_PAGE = 4;
  let currentPage = 1;
  let filteredMembers = [];

  const selected = { main: new Set(), sub: new Map() };

  toggle.addEventListener('click', () => {
    panel.classList.toggle('hidden');
  });

  function renderMembers(page = 1) {
    currentPage = page;
    const q = (search.value || '').trim();
    filteredMembers = MEMBERS.filter(m => {
      if (selected.main.size > 0) {
        for (const mt of selected.main) {
          if (!m.mainTags?.includes(mt)) return false; // Check if member has the main tag
          const subs = selected.sub.get(mt) || new Set();
          if (subs.size > 0) {
            if (!m.services.some(s => s.tags.some(st => subs.has(st)))) return false; // Check if any service has the sub tag
          }
        }
      }
      if (q) {
        const t = (m.name + m.role + m.bio + m.services.map(s => s.name + s.note + s.tags.join(' ')).join(' ')).toLowerCase();
        if (!t.includes(q.toLowerCase())) return false;
      }
      return true;
    });

    const totalPages = Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE);
    updatePaginationControls(totalPages);

    const start = (currentPage - 1) * MEMBERS_PER_PAGE;
    const end = start + MEMBERS_PER_PAGE;
    const membersToRender = filteredMembers.slice(start, end);

    grid.innerHTML = '';
    const hasTagSelection = selected.main.size > 0;
    const shouldShowNoResults = hasTagSelection && filteredMembers.length === 0;
    if (shouldShowNoResults) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
    membersToRender.forEach(m => {
      const card = document.createElement('div');
      card.className = 'member-card';
      const cover = document.createElement('div');
      cover.className = 'cover';
      const img = document.createElement('img');
      img.src = m.avatar;
      img.alt = m.name;
      cover.appendChild(img);
      const info = document.createElement('div');
      info.className = 'info';
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = m.name;
      const id = document.createElement('div');
      id.className = 'badge';
      id.textContent = m.id;
      const role = document.createElement('div');
      role.className = 'role';
      role.textContent = m.role;
      const bio = document.createElement('div');
      bio.className = 'bio';
      bio.textContent = m.bio;
      info.append(name, id, role, bio);
      card.append(cover, info);
      card.addEventListener('click', () => openDetail(m));
      grid.appendChild(card);
    });
    if (state.lang === 'tw') transEl(grid);
  }

  function updatePaginationControls(totalPages) {
    pageSelect.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `第 ${i} 页`;
      pageSelect.appendChild(option);
    }
    pageSelect.value = currentPage;
    pageInfoSpan.textContent = `${currentPage} / ${totalPages}`;

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  // Event Listeners for pagination
  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      renderMembers(currentPage - 1);
    }
  });

  nextPageBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredMembers.length / MEMBERS_PER_PAGE);
    if (currentPage < totalPages) {
      renderMembers(currentPage + 1);
    }
  });

  pageSelect.addEventListener('change', (e) => {
    renderMembers(parseInt(e.target.value));
  });

  // Initial render
  renderMembers();

  search.addEventListener('input', () => {
    renderMembers(); // Reset to page 1 on search
  });

  toggle.addEventListener('click', () => {
    panel.classList.toggle('hidden');
  });

  function renderMain() {
    mainTags.innerHTML = '';
    Object.keys(TAGS).forEach(k => {
      const b = document.createElement('button');
      b.className = 'tag-btn';
      b.textContent = TAGS[k].title || k;
      b.dataset.main = k;
      b.addEventListener('click', () => {
        if (selected.main.has(k)) {
          selected.main.delete(k);
          selected.sub.delete(k);
        } else {
          selected.main.add(k);
        }
        renderSelected();
        renderSub();
        renderMembers(); // Re-render members after filter change
        b.classList.toggle('active');
      });
      mainTags.appendChild(b);
    });
  }
  function renderSub() {
    subTags.innerHTML = '';
    selected.main.forEach(k => {
      const config = TAGS[k];
      const groups = Array.isArray(config.groups) && config.groups.length > 0
        ? config.groups
        : [{ key: '分类', title: config.subtitle || (k + ' 子分类'), tags: [...(config.子 || []), ...((config.业) || [])] }];
      groups.forEach(g => {
        if (!g.tags || g.tags.length === 0) {
          return; // Skip rendering if no sub-tags
        }
        const wrap = document.createElement('div');
        wrap.className = 'sub-wrap';
        const title = document.createElement('div');
        title.className = 'badge';
        title.textContent = g.title;
        wrap.appendChild(title);
        (g.tags || []).forEach(s => {
          const b = document.createElement('button');
          b.className = 'tag-btn';
          b.textContent = s;
          b.dataset.main = k;
          b.dataset.tag = s;
          const set = selected.sub.get(k) || new Set();
          if (set.has(s)) b.classList.add('active');
          b.addEventListener('click', () => {
            const curr = selected.sub.get(k) || new Set();
            if (curr.has(s)) curr.delete(s);
            else curr.add(s);
            selected.sub.set(k, curr);
            renderSelected();
            renderMembers();
            b.classList.toggle('active');
          });
          wrap.appendChild(b);
        });
        subTags.appendChild(wrap);
      });
    });
  }
  function renderSelected() {
    selectedBar.innerHTML = '';
    selected.main.forEach(k => {
      const chip = document.createElement('div');
      chip.className = 'tag-chip';
      const txt = document.createElement('span');
      txt.textContent = k;
      const x = document.createElement('button');
      x.textContent = '×';
      x.addEventListener('click', () => {
        selected.main.delete(k);
        selected.sub.delete(k);
        renderSelected();
        renderSub();
        renderMembers();
        const btn = mainTags.querySelector(`.tag-btn[data-main="${k}"]`);
        if (btn) btn.classList.remove('active');
      });
      chip.append(txt, x);
      selectedBar.appendChild(chip);

      const subs = selected.sub.get(k) || new Set();
      subs.forEach(s => {
        const chip2 = document.createElement('div');
        chip2.className = 'tag-chip';
        const t2 = document.createElement('span');
        t2.textContent = s;
        const x2 = document.createElement('button');
        x2.textContent = '×';
        x2.addEventListener('click', () => {
          const curr = selected.sub.get(k) || new Set();
          curr.delete(s);
          selected.sub.set(k, curr);
          renderSelected();
          renderMembers();
          const btn = subTags.querySelector(`.tag-btn[data-main="${k}"][data-tag="${s}"]`);
          if (btn) btn.classList.remove('active');
        });
        chip2.append(t2, x2);
        selectedBar.appendChild(chip2);
      });
    });
    if (state.lang === 'tw') transEl(selectedBar);
  }
  toggle.addEventListener('click', () => { panel.classList.toggle('hidden') });
  search.addEventListener('input', renderMembers);
  renderMain(); renderMembers()
}

let galleryIndex = 0; let currentGallery = []
function openDetail(m) {
  const modal = document.getElementById('member-detail');
  const avatar = document.getElementById('detail-avatar');
  const name = document.getElementById('detail-name');
  const id = document.getElementById('detail-id');
  const role = document.getElementById('detail-role');
  const bio = document.getElementById('detail-bio');
  const services = document.getElementById('services');

  avatar.src = m.avatar;
  name.textContent = m.name;
  id.textContent = m.id;
  role.textContent = m.role;
  bio.textContent = m.bio;
  services.innerHTML = '';

  m.services.forEach(sv => {
    const card = document.createElement('div');
    card.className = 'service-card';

    const head = document.createElement('div');
    head.className = 'service-head';
    const title = document.createElement('h3');
    title.textContent = sv.name;
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = sv.price;
    head.append(title, price);

    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = sv.note;

    let page = 0;
    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    const prev = document.createElement('button');
    prev.className = 'carousel-arrow';
    prev.textContent = '‹';
    const stage = document.createElement('div');
    stage.className = 'carousel-stage';
    const next = document.createElement('button');
    next.className = 'carousel-arrow';
    next.textContent = '›';
    const dots = document.createElement('div');
    dots.className = 'carousel-dots';

    function computePageSize() {
      const gap = parseFloat(getComputedStyle(stage).gap || '8');
      const itemWidth = window.matchMedia('(max-width: 420px)').matches ? 60 :
        (window.matchMedia('(max-width: 768px)').matches ? 70 : 100);
      const available = stage.clientWidth;
      const per = Math.max(1, Math.floor((available + gap) / (itemWidth + gap)));
      return Math.min(per, sv.gallery.length);
    }

    function updateDots(currentIdx) {
      dots.querySelectorAll('.dot').forEach((d, di) => {
        if (di === currentIdx) d.classList.add('active'); else d.classList.remove('active');
      });
    }

    function renderSlide() {
      stage.innerHTML = '';
      const size = sv.gallery.length;
      const pages = Math.max(1, Math.ceil(sv.gallery.length / size));
      if (page >= pages) page = pages - 1;
      for (let i = 0; i < size; i++) {
        const globalIndex = page * size + i;
        const item = document.createElement('div');
        item.className = 'item';
        if (globalIndex < sv.gallery.length) {
          const g = sv.gallery[globalIndex];
          if (g.type === 'image') {
            const img = document.createElement('img');
            img.src = g.src;
            item.appendChild(img);
          } else {
            const v = document.createElement('video');
            v.src = g.src;
            v.muted = true;
            v.loop = true;
            v.autoplay = true;
            item.appendChild(v);
          }
          item.addEventListener('click', () => openLightbox(sv.gallery, globalIndex));
        } else {
          item.classList.add('empty'); // 添加一个空状态的class
        }
        stage.appendChild(item);
      }
    }
    function buildDots() {
      dots.innerHTML = '';
      const size = sv.gallery.length;
      const pages = Math.max(1, Math.ceil(sv.gallery.length / size));
      if (page >= pages) page = pages - 1;
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.addEventListener('click', () => { page = i; renderSlide(); updateDots(page); });
        dots.appendChild(dot);
      }
      updateDots(page);
    }

    prev.addEventListener('click', () => {
      const size = computePageSize();
      const pages = Math.max(1, Math.ceil(sv.gallery.length / size));
      page = (page - 1 + pages) % pages;
      renderSlide();
      updateDots(page);
    });
    next.addEventListener('click', () => {
      const size = computePageSize();
      const pages = Math.max(1, Math.ceil(sv.gallery.length / size));
      page = (page + 1) % pages;
      renderSlide();
      updateDots(page);
    });

    carousel.append(prev, stage, next);
    card.append(head, note, carousel, dots);
    services.appendChild(card);

    function onResize() {
      renderSlide();
      buildDots();
    }
    window.addEventListener('resize', onResize);

    renderSlide();
    buildDots();
    if (sv.tags && sv.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'service-tags';
      sv.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'service-tag-item';
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
      });
      card.appendChild(tagsContainer);
    }
  });

  modal.classList.remove('hidden');
  if (state.lang === 'tw') transEl(modal);
}
function closeDetail() { document.getElementById('member-detail').classList.add('hidden') }
function openLightbox(list, idx) {
  currentGallery = list;
  galleryIndex = idx;
  const lb = document.getElementById('lightbox');
  lb.classList.remove('hidden');
  renderLightbox();
}
function closeLightbox() { document.getElementById('lightbox').classList.add('hidden') }
function renderLightbox() {
  const stage = document.getElementById('lightbox-content');
  stage.innerHTML = '';
  const g = currentGallery[galleryIndex];
  if (!g) return;
  if (g.type === 'image') {
    const img = document.createElement('img');
    img.src = g.src;
    stage.appendChild(img);
  } else {
    const v = document.createElement('video');
    v.src = g.src;
    v.controls = true;
    v.autoplay = true;
    v.loop = true;
    stage.appendChild(v);
  }
}
function galleryPrev() {
  galleryIndex = (galleryIndex - 1 + currentGallery.length) % currentGallery.length;
  renderLightbox();
}
function galleryNext() {
  galleryIndex = (galleryIndex + 1) % currentGallery.length;
  renderLightbox();
}

function initModal() {
  const back = document.getElementById('back-to-list');
  const lbClose = document.getElementById('lightbox-close');
  const gp = document.getElementById('gallery-prev');
  const gn = document.getElementById('gallery-next');
  if (back) back.addEventListener('click', closeDetail);
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (gp) gp.addEventListener('click', galleryPrev);
  if (gn) gn.addEventListener('click', galleryNext);
}

function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(b => {
    b.addEventListener('click', () => {
      b.parentElement.classList.toggle('open');
      const body = b.nextElementSibling;
      body.style.display = body.style.display === 'block' ? 'none' : 'block';
    });
  });

  const toggleChangelogButton = document.getElementById('toggle-changelog');
  const changelogContent = document.getElementById('changelog-content');

  if (toggleChangelogButton && changelogContent) {
    toggleChangelogButton.addEventListener('click', () => {
      changelogContent.classList.toggle('collapsed');
      toggleChangelogButton.textContent = changelogContent.classList.contains('collapsed') ? '展开' : '收起';
    });
    changelogContent.classList.add('collapsed');
    toggleChangelogButton.textContent = '展开';
  }
}

function initQrLightbox() {
  const cards = document.querySelectorAll('.qr-card');
  const lb = document.getElementById('qr-lightbox');
  const img = document.getElementById('lightbox-qr-img');
  if (!lb || !img || cards.length === 0) return;
  cards.forEach(c => {
    c.addEventListener('click', () => {
      const src = c.dataset.src || '';
      if (!src) return;
      img.src = src;
      lb.classList.remove('hidden');
    });
  });
  lb.addEventListener('click', e => {
    if (e.target === lb) {
      lb.classList.add('hidden');
      img.src = '';
    }
  });
}

function init() { initNav(); spawnSakura(); initModal(); const page = document.body.dataset.page; if (page === 'members') initMembers(); if (page === 'activities') initAccordion(); if (page === 'contact') initQrLightbox(); transEl(document.body) }
document.addEventListener('DOMContentLoaded', init)
