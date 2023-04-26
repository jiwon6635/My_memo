let allMemo = JSON.parse(localStorage.getItem('allMemo'));

// 로컬스토리지에 값이있으면 그값을 쓰고 아니면 빈배열 사용
allMemo = allMemo ?? []; 
render();

// render => 새로고침이나 창을 껐다가 다시 켰을때 로컬스토리지에 있는 아이템을 화면에 뜨게하기위해 사용

function saveNote() {
    const titleId = document.getElementById('title');
    const contentId = document.getElementById('content');
    const title = titleId.value;
    const content = contentId.value;

    allMemo.push({ title, content, len: allMemo.length });

    localStorage.setItem('allMemo', JSON.stringify(allMemo));
    render();

    titleId.value = "";
    contentId.value = "";
}

function render() {
    
    const output = document.getElementById('output');
    output.innerHTML = "";

    allMemo.forEach((memo) => {
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const span = document.createElement('span');
        const p = document.createElement('p');
        const btn = document.createElement('button');
        
        article.setAttribute('class', 'memo');
        h2.textContent = `📌 ` + memo.title ;
        span.textContent = memo.len + 1;
        p.textContent = memo.content;
        btn.textContent = 'Delete';
        btn.setAttribute('id', memo.len);
        btn.setAttribute('onclick', 'removeMemo()');
        
        article.appendChild(h2);
        article.appendChild(span);
        article.appendChild(p);
        article.appendChild(btn);
        
        output.appendChild(article);
    });
}
    
    function removeMemo() {
        const check = confirm('메모를 삭제하시겠습니까?');
        if (check) {
            // 두개의 값이 같으면
            const idx = allMemo.find((item) => item.len == event.srcElement.id);
            console.log(idx);
            
            if (idx) {
                allMemo.splice(
                    allMemo.findIndex((item) => item.len == idx.len),
                1
                );
            }
            // 삭제하고 남은것은 그대로 업로드됨
            localStorage.setItem('allMemo', JSON.stringify(allMemo));
            render();
        } else return;
            
    }


    