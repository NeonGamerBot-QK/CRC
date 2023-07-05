setTimeout(async () => {
  console.log("load form module")
  const editor = await   ClassicEditor
  .create( document.getElementsByTagName('textarea')[0] )

  const form = document.querySelector("#sendemail");
  console.log("form bef", form, document.getElementById('submit_button'))
  document.getElementById('submit_button').addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("#form")

    const submitToken = await fetch("/token", { method: "POST"}).then(r => r.json()).then(d => d.token)
       
      const data = Object.fromEntries(new FormData(form));
      const html = editor.getData()
      data.body = html
  console.log(data)
      fetch("/submit", {
          method: "POST",
          body: JSON.stringify(data),
          //  headers
          headers: {
              "Content-Type": "application/json",
              // "X-CSRF-TOKEN": submitToken
              "Authorization": submitToken
          }

      }).then(r => r.json()).then((data) => {
      //  ...
if(data.status === 201) {
alert("Email sent successfully")
}
    })
  }) 
}, 1000)
