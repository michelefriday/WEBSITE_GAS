const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const vm = require('vm');
const https = require('https');

const app = express();
const PORT = 3010;
const REPO_ROOT = path.resolve(__dirname, '..');
const CONSTANTS_TS = path.join(REPO_ROOT, 'constants.ts');
const STILLS_DIR = path.join(REPO_ROOT, 'public', 'stills');
const HOVER_DIR = path.join(REPO_ROOT, 'public', 'hover');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, file.mimetype.startsWith('video/') ? HOVER_DIR : STILLS_DIR),
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

app.use(express.json({ limit: '50mb' }));
app.use('/assets', express.static(path.join(REPO_ROOT, 'public')));

function extractProjectsArray(content) {
  const marker = 'export const PROJECTS: Project[] = ';
  const start = content.indexOf(marker) + marker.length;
  let depth = 0, i = start, inStr = false, strChar = '';
  while (i < content.length) {
    const c = content[i];
    if (inStr) {
      if (c === '\\') i++;
      else if (c === strChar) inStr = false;
    } else {
      if (c === '"' || c === "'" || c === '`') { inStr = true; strChar = c; }
      else if (c === '[' || c === '{') depth++;
      else if ((c === ']' || c === '}') && --depth === 0) return content.slice(start, i + 1);
    }
    i++;
  }
  throw new Error('Could not find PROJECTS array in constants.ts');
}

function readProjects() {
  const content = fs.readFileSync(CONSTANTS_TS, 'utf8');
  const arrayStr = extractProjectsArray(content);
  const ctx = {};
  vm.runInNewContext('__r = ' + arrayStr, ctx);
  return ctx.__r;
}

function writeProjects(projects) {
  const content =
    'import type { Project } from "./types";\n\n' +
    'export const INITIAL_WINDOW_WIDTH = 600;\n' +
    'export const INITIAL_WINDOW_HEIGHT = 500;\n\n' +
    'export const PROJECTS: Project[] = ' + JSON.stringify(projects, null, 2) + ';\n';
  fs.writeFileSync(CONSTANTS_TS, content);
}

// --- API ---

app.get('/api/projects', (req, res) => {
  try { res.json(readProjects()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/projects', (req, res) => {
  try { writeProjects(req.body); res.json({ ok: true }); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  const isVideo = req.file.mimetype.startsWith('video/');
  res.json({ path: '/' + (isVideo ? 'hover' : 'stills') + '/' + req.file.originalname });
});

app.post('/api/deploy', (req, res) => {
  try {
    execSync(
      'cd "' + REPO_ROOT + '" && git add constants.ts public/stills public/hover && ' +
      '(git diff --cached --quiet || git commit -m "update content via admin")',
      { encoding: 'utf8' }
    );
    execSync('cd "' + REPO_ROOT + '" && git push origin draft/imagenotext_v2', { encoding: 'utf8' });
  } catch (e) {
    return res.status(500).json({ error: e.stderr || e.message });
  }

  try {
    const authPath = path.join(process.env.HOME, 'Library/Application Support/com.vercel.cli/auth.json');
    const token = JSON.parse(fs.readFileSync(authPath, 'utf8')).token;
    const body = JSON.stringify({
      name: 'website-gas',
      gitSource: { type: 'github', org: 'michelefriday', repo: 'WEBSITE_GAS', ref: 'draft/imagenotext_v2' },
      target: 'production',
    });
    const options = {
      hostname: 'api.vercel.com',
      path: '/v13/deployments?teamId=micheles-projects-f7335183',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const vreq = https.request(options, (vres) => {
      let data = '';
      vres.on('data', (d) => { data += d; });
      vres.on('end', () => {
        const parsed = JSON.parse(data);
        if (parsed.error) res.status(500).json({ error: 'Vercel: ' + parsed.error.message });
        else res.json({ ok: true, deployUrl: parsed.url });
      });
    });
    vreq.on('error', (e) => res.status(500).json({ error: e.message }));
    vreq.write(body);
    vreq.end();
  } catch (e) {
    res.status(500).json({ error: 'Vercel token error — run `vercel login` then retry. (' + e.message + ')' });
  }
});

// --- UI ---

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FRIDAY Admin</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: monospace; background: #fdfdfd; color: #000; min-height: 100vh; }

header {
  border-bottom: 1px solid #000;
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: #fdfdfd;
  z-index: 10;
}
header h1 { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; }
.header-actions { display: flex; gap: 8px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  border-left: 1px solid #000;
  border-top: 1px solid #000;
}

.card {
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  aspect-ratio: 2/3;
  background: #f5f5f5;
}
.card img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity 0.2s;
}
.card:hover img { opacity: 0.15; }
.card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.card:hover .card-overlay { opacity: 1; }
.card-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 10px 12px;
  background: white;
  border-top: 1px solid #000;
  transition: background 0.15s, color 0.15s;
}
.card:hover .card-label { background: #000; color: white; }
.card-label .client { font-size: 9px; color: #888; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.1em; }
.card:hover .card-label .client { color: #888; }
.card-label .title { font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; }

.no-image {
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  letter-spacing: 0.15em;
  color: #bbb;
  text-transform: uppercase;
}

/* Panel */
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.3);
  z-index: 50;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.overlay.visible { opacity: 1; pointer-events: all; }

.panel {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 500px;
  background: #fdfdfd;
  border-left: 1px solid #000;
  z-index: 51;
  transform: translateX(100%);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
}
.panel.open { transform: translateX(0); }

.panel-header {
  padding: 14px 20px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.panel-header-title { font-size: 11px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; }

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.section { margin-bottom: 24px; }
.section-label {
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
}

.upload-zone {
  border: 1px dashed #ccc;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  position: relative;
}
.upload-zone:hover, .upload-zone.drag-over {
  border-color: #000;
  background: #f9f9f9;
}
.upload-zone img, .upload-zone video {
  max-width: 100%;
  max-height: 140px;
  display: block;
  margin: 0 auto 10px;
  object-fit: contain;
}
.upload-hint {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #aaa;
}
.upload-filename {
  font-size: 10px;
  color: #666;
  margin-top: 6px;
  word-break: break-all;
}

.field { margin-bottom: 14px; }
.field label {
  display: block;
  font-size: 9px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 4px;
}
.field input, .field textarea, .field select {
  width: 100%;
  border: 1px solid #ddd;
  padding: 8px 10px;
  font-family: monospace;
  font-size: 12px;
  background: white;
  outline: none;
  transition: border-color 0.15s;
}
.field input:focus, .field textarea:focus, .field select:focus { border-color: #000; }
.field textarea { min-height: 70px; resize: vertical; }

.panel-footer {
  padding: 16px 20px;
  border-top: 1px solid #000;
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

/* Buttons */
button, .btn {
  font-family: monospace;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border: 1px solid #000;
  background: white;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #000;
}
button:hover, .btn:hover { background: #000; color: white; }
button.primary { background: #000; color: white; }
button.primary:hover { background: #333; }

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: #000;
  color: white;
  padding: 10px 20px;
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  z-index: 100;
  pointer-events: none;
  white-space: nowrap;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.toast.error { background: #c00; }
</style>
</head>
<body>

<header>
  <h1>Friday — Admin</h1>
  <div class="header-actions">
    <a class="btn" href="http://localhost:3009" target="_blank">Preview ↗</a>
    <button onclick="deploy()">Commit & Deploy</button>
  </div>
</header>

<div class="grid" id="grid"></div>

<div class="overlay" id="overlay" onclick="closePanel()"></div>

<div class="panel" id="panel">
  <div class="panel-header">
    <span class="panel-header-title" id="panel-title"></span>
    <button onclick="closePanel()" style="border:none;padding:4px 8px;">✕</button>
  </div>
  <div class="panel-body" id="panel-body"></div>
  <div class="panel-footer">
    <button class="primary" onclick="saveProject()">Save</button>
    <button onclick="closePanel()">Cancel</button>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
let projects = [];
let editingIdx = null;

async function init() {
  const res = await fetch('/api/projects');
  projects = await res.json();
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = projects.map((p, i) => {
    const imgSrc = p.sliceImageUrl || p.thumbnailUrl;
    return '<div class="card" onclick="openPanel(' + i + ')">' +
      (imgSrc
        ? '<img src="/assets' + imgSrc + '" onerror="this.style.display=\'none\'">'
        : '<div class="no-image">No image</div>') +
      '<div class="card-overlay">Edit</div>' +
      '<div class="card-label">' +
        '<div class="client">' + esc(p.client) + '</div>' +
        '<div class="title">' + esc(p.title) + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
}

function openPanel(idx) {
  editingIdx = idx;
  const p = projects[idx];
  document.getElementById('panel-title').textContent = p.client + ' / ' + p.title;

  const imgPath = p.sliceImageUrl || p.thumbnailUrl || '';
  const vidPath = p.windowVideoUrl || (p.hoverClips && p.hoverClips[0]) || '';
  const isContact = p.windowType === 'contact';

  let html = '';

  // Image upload
  html += '<div class="section">';
  html += '<div class="section-label">Still image</div>';
  html += '<div class="upload-zone" id="img-zone" onclick="triggerUpload(\'image\')" ' +
    'ondragover="onDragOver(event)" ondragleave="onDragLeave(event,\'img-zone\')" ondrop="onDrop(event,\'image\')">';
  if (imgPath) html += '<img id="img-preview" src="/assets' + imgPath + '">';
  html += '<div class="upload-hint">' + (imgPath ? 'Drop or click to replace' : 'Drop image or click to upload') + '</div>';
  if (imgPath) html += '<div class="upload-filename" id="img-name">' + imgPath.split('/').pop() + '</div>';
  html += '</div>';
  html += '<input type="file" id="img-input" accept="image/*" style="display:none" onchange="uploadFile(this.files[0],\'image\')">';
  html += '</div>';

  // Video upload (skip for contact window)
  if (!isContact) {
    html += '<div class="section">';
    html += '<div class="section-label">Hover / window video</div>';
    html += '<div class="upload-zone" id="vid-zone" onclick="triggerUpload(\'video\')" ' +
      'ondragover="onDragOver(event)" ondragleave="onDragLeave(event,\'vid-zone\')" ondrop="onDrop(event,\'video\')">';
    if (vidPath) html += '<video id="vid-preview" src="/assets' + vidPath + '" muted playsinline></video>';
    html += '<div class="upload-hint">' + (vidPath ? 'Drop or click to replace' : 'Drop video or click to upload') + '</div>';
    if (vidPath) html += '<div class="upload-filename" id="vid-name">' + vidPath.split('/').pop() + '</div>';
    html += '</div>';
    html += '<input type="file" id="vid-input" accept="video/*" style="display:none" onchange="uploadFile(this.files[0],\'video\')">';
    html += '</div>';
  }

  // Text fields
  html += '<div class="section">';
  html += '<div class="section-label">Details</div>';
  html += field('Title', 'f-title', p.title);
  html += field('Client', 'f-client', p.client);
  html += field('Division', 'f-division', p.division || '');
  html += field('Window title', 'f-windowtitle', p.windowTitle || '');
  if (p.description !== undefined)
    html += field('Description', 'f-desc', p.description || '', 'textarea');
  if (p.credits !== undefined)
    html += field('Credits (one per line)', 'f-credits', (p.credits || []).join('\\n'), 'textarea');
  if (p.embedUrl !== undefined)
    html += field('Embed URL', 'f-embed', p.embedUrl || '');
  if (p.videoErrorMessage !== undefined)
    html += field('Video error message', 'f-videomsg', p.videoErrorMessage || '');
  html += '</div>';

  document.getElementById('panel-body').innerHTML = html;
  document.getElementById('panel').classList.add('open');
  document.getElementById('overlay').classList.add('visible');
}

function field(label, id, value, type) {
  const tag = type === 'textarea' ? 'textarea' : 'input';
  const attrs = 'id="' + id + '" ' + (type !== 'textarea' ? 'value="' + esc(value) + '"' : '');
  const inner = type === 'textarea' ? esc(value) : '';
  return '<div class="field"><label>' + label + '</label>' +
    '<' + tag + ' ' + attrs + '>' + inner + (type === 'textarea' ? '</textarea>' : '') +
    '</div>';
}

function closePanel() {
  document.getElementById('panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
  editingIdx = null;
}

function triggerUpload(type) {
  document.getElementById(type === 'image' ? 'img-input' : 'vid-input').click();
}

function onDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}
function onDragLeave(e, id) {
  document.getElementById(id).classList.remove('drag-over');
}
function onDrop(e, type) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) uploadFile(file, type);
}

async function uploadFile(file, type) {
  const isImage = type === 'image';
  toast('Uploading...');
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  const { path: filePath } = await res.json();

  const p = projects[editingIdx];
  if (isImage) {
    p.thumbnailUrl = filePath;
    p.sliceImageUrl = filePath;
    updatePreview('img-preview', 'img-name', 'img', '/assets' + filePath, file.name, 'img-zone');
  } else {
    p.windowVideoUrl = filePath;
    p.hoverVideoUrl = filePath;
    if (p.hoverClips) p.hoverClips = [filePath];
    updatePreview('vid-preview', 'vid-name', 'video', '/assets' + filePath, file.name, 'vid-zone');
  }
  toast('Uploaded: ' + file.name);
}

function updatePreview(previewId, nameId, tag, src, name, zoneId) {
  let el = document.getElementById(previewId);
  if (!el) {
    el = document.createElement(tag);
    el.id = previewId;
    if (tag === 'video') { el.muted = true; el.playsInline = true; }
    const zone = document.getElementById(zoneId);
    zone.insertBefore(el, zone.firstChild);
  }
  el.src = src;
  const nameEl = document.getElementById(nameId);
  if (nameEl) nameEl.textContent = name;
}

function saveProject() {
  const p = projects[editingIdx];
  p.title = val('f-title');
  p.client = val('f-client');
  p.division = val('f-division');
  p.windowTitle = val('f-windowtitle');
  if (document.getElementById('f-desc')) p.description = val('f-desc');
  if (document.getElementById('f-credits')) p.credits = val('f-credits').split('\\n').filter(Boolean);
  if (document.getElementById('f-embed')) p.embedUrl = val('f-embed');
  if (document.getElementById('f-videomsg')) p.videoErrorMessage = val('f-videomsg');

  persistProjects();
}

async function persistProjects() {
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projects),
  });
  const data = await res.json();
  if (!res.ok) { toast('Error: ' + data.error, true); return; }
  renderGrid();
  closePanel();
  toast('Saved — check preview at localhost:3009');
}

async function deploy() {
  toast('Committing and deploying...');
  const res = await fetch('/api/deploy', { method: 'POST' });
  const data = await res.json();
  if (!res.ok) { toast(data.error || 'Deploy failed', true); return; }
  toast('Deployed to production');
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

let toastTimer;
function toast(msg, isError) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.toggle('error', !!isError);
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), isError ? 5000 : 2500);
}

init();
</script>
</body>
</html>`;

app.get('/', (req, res) => res.send(HTML));

app.listen(PORT, () => {
  console.log('\n  FRIDAY Admin → http://localhost:' + PORT + '\n');
});
