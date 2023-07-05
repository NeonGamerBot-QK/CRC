let theme = localStorage.getItem("theme")
if(theme) {
    document.querySelector("html").setAttribute("data-theme", theme)
}
const app = document.querySelector("#app")
app.innerHTML = loading

console.log("INIT")
const date = Date.now()
window.onload = () => {
    console.log("window#load", Date.now() - date)
fetch("/request", { method: "POST"}).then((r) => {
console.log(r.status)
setTimeout(() => {
app.style.opacity = 0;

setTimeout(() => {
app.innerHTML = atob(content);

// const childs = [...app.children].filter(x => {
//     // console.debug(x.nodeName)
//     return x.nodeName === 'SCRIPT'
//     })

// console.debug('e', childs)
app.style.opacity = 1;
setTimeout(() => {
    [...app.children].filter(x => {
        console.debug(x.nodeName)
        return x.nodeName === 'SCRIPT'
        }).forEach(x => {
    console.log("executing script ", x)
    if(x.src) {
        console.log("WHAT AM I GONNA DO!", x.src)
        const script = document.createElement('script')
        script.src = x.src 
        document.body.append(script)
    }   else {
        eval(x.innerText)
    
    }
    });
}, 700)
}, 500)
}, 1_500)
}) 
 if(localStorage.getItem('theme')) document.querySelector('html').setAttribute('data-theme', localStorage.getItem('theme'))
}
function changeTheme(theme) {
    localStorage.setItem('theme', theme);
    document.querySelector(
        "html"
    ).setAttribute("data-theme", theme)
    document.querySelector('html').setAttribute('data-theme', localStorage.getItem('theme'))
}
console.log("THEME")