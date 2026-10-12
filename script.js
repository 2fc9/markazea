const defaultNews = [
  {date:"2026-10-12", category:"إعلان", title:"الإعلانات المدرسية الرسمية", body:"تُضاف هنا الإعلانات المعتمدة من إدارة المدرسة، مثل مواعيد الامتحانات والتنبيهات المهمة. يرجى متابعة هذا القسم باستمرار."},
  {date:"2026-10-12", category:"تنويه", title:"متابعة أخبار المدرسة", body:"لضمان وصول المعلومة الصحيحة، يُرجى اعتماد الإعلانات المنشورة من إدارة المدرسة وعدم تداول الأخبار غير المؤكدة."},
  {date:"2026-10-12", category:"للطلبة", title:"الاستعداد للامتحانات", body:"ننصح الطلبة بتنظيم وقت الدراسة ومراجعة المواد بانتظام، ومراجعة الإدارة أو المدرسين لمعرفة أي تعليمات رسمية."}
];
let news = defaultNews;
const grid = document.getElementById('newsGrid');
const empty = document.getElementById('emptyNews');
const showAll = document.getElementById('showAllBtn');
let expanded = false;
function formatDate(dateStr){
  const d = new Date(dateStr + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat('ar-IQ',{year:'numeric',month:'long',day:'numeric'}).format(d);
}
function renderNews(){
  const list = expanded ? news : news.slice(0,3);
  grid.innerHTML = '';
  empty.hidden = list.length > 0;
  list.forEach(item=>{
    const card=document.createElement('article');
    card.className='news-card';
    const meta=document.createElement('div'); meta.className='news-meta';
    const date=document.createElement('span'); date.textContent=formatDate(item.date);
    const cat=document.createElement('span'); cat.className='news-category'; cat.textContent=item.category;
    meta.append(date,cat);
    const title=document.createElement('h3'); title.textContent=item.title;
    const body=document.createElement('p'); body.textContent=item.body;
    const more=document.createElement('span'); more.className='read-more'; more.textContent='إعلان مدرسي · اقرأ التفاصيل';
    card.append(meta,title,body,more); grid.append(card);
  });
  showAll.textContent = expanded ? 'عرض أقل ↑' : 'عرض جميع الإعلانات ←';
  showAll.style.display = news.length <= 3 ? 'none' : 'inline-block';
}
showAll.addEventListener('click',()=>{expanded=!expanded;renderNews()});
document.getElementById('menuToggle').addEventListener('click',()=>{
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('today').textContent = new Intl.DateTimeFormat('ar-IQ',{weekday:'long',year:'numeric',month:'long',day:'numeric'}).format(new Date());
renderNews();
