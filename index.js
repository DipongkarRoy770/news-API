function dataLoad() {

    const tanContainer = document.getElementById('tab-cantainer')
    fetch(' https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data =>
            (data.data.news_category.slice(0, 4)).forEach(element => {
                // console.log(element)
                const div = document.createElement('div')
                div.innerHTML = `
                <a onclick={handleId('${element.category_id}')} class="tab text-xl ">${element.category_name}</a>
                `
                tanContainer.appendChild(div)
            }))


}
const handleId = (id) => {
    //console.log('id clik now', element)
    const newsContainer = document.getElementById('news-container')
    newsContainer.innerHTML=''
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)

        .then(res => res.json())
        .then(data =>
            data.data.forEach(news => {
                //console.log(news)
                const div = document.createElement('div')
                div.innerHTML = `
                <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src="${news.image_url}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">
                    ${news.author?.name}
                </h2>
                <p>${news.details.slice(0, 150)}</p>
                <div class="card-actions justify-center"> 
                   <button onclick={modalShow('${news._id}')} class="btn btn-secondary">discription</button>
                   
                </div>
            </div>
        </div> 
              `
                newsContainer.appendChild(div)
            }))

}
const modalShow = (id) => {
    //console.log('modal kaj kore', id)
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML=''
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
     .then(res =>res.json())
      .then(data=>{
        const newsData = data.data[0]
        console.log(newsData)
        const div = document.createElement('div')
        div.innerHTML = `   
    <button class="btn" onclick="my_modal_1.showModal()">open modal</button>
    <dialog id="my_modal_1" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">${newsData.title}</h3>
        <p class="py-4">${newsData.details}</p>
        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>
        `
        modalContainer.appendChild(div)
        const modal = document.getElementById('my_modal_1')
        modal.showModal()
      })
   
   
}
dataLoad()