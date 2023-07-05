
    fetch ("https://api.github.com/users/NeonGamerBot-QK/repos?per_page=100").then(r => r.json()).then(d => {
    let cardsDiv = document.getElementById("cards");
    const length =  d.filter(e => !e.fork && !e.archived && e.description).length
cardsDiv.innerHTML = ""
cardsDiv.className = "grid grid-cols-2  lg:grid-cols-3 p-5 mt-2 p-2 border-20 rounded-lg shadow-xl"
cardsDiv.style.overflow = 'hidden'
       d.filter(e => !e.fork && !e.archived && e.description).forEach(repo => {
        let card = document.createElement("div");
        const body = document.createElement("div");
        const title = document.createElement("h2");
        const description = document.createElement("p");
        const actions = document.createElement("div");
        const openRepo = document.createElement('button')
    //     let template = `<div class="card w-96 bg-base-100 shadow-xl">

    //     <div class="card-body">
    //       <h2 class="card-title">
        
    //         <div class="badge badge-secondary">NEW</div>
    //       </h2>
    //       <p>If a dog chews shoes whose shoes does he choose?</p>
    //       <div class="card-actions justify-end">
    //         <div class="badge badge-outline">Fashion</div> 
    //         <div class="badge badge-outline">Products</div>
    //       </div>
    //     </div>
    //   </div>`
      card.className = "card  bg-base-100 shadow-xl lg:m-10 md:m-5 m-2 transition duration-500 ease-in-out transform hover:-translate-y-1 lg:hover:scale-110 hover:scale-105"
      card.style.overflow = 'hidden'
        body.className = "card-body"
        title.className = "card-title"
actions.className = "card-actions justify-end"
openRepo.className = "btn btn-primary"


openRepo.innerText = "Open Repo"
openRepo.addEventListener("click", () => {
    window.open(repo.html_url, '_blank')
 })

title.innerText = repo.name
description.innerText = repo.description
actions.appendChild(openRepo)

body.appendChild(title)
body.appendChild(description)
body.appendChild(actions)
card.appendChild(body)
cardsDiv.appendChild(card)
       })
    })
