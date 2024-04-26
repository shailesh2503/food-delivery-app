import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()

    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">
                <input className="form-control me-2 w-75 bg-dark text-white" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-warning border-danger" onClick={() => { setSearch('') }}>Submit</button>
              </div>
            </div>

            <div className="carousel-item active" >
              <img src="https://i.pinimg.com/originals/c9/4a/ff/c94affe6bcb9fbf7d3508ba98977a1d1.jpg" className="d-block w-100  " style={{ filter: "brightness(65%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://rare-gallery.com/uploads/posts/583648-burger-4k-wallpaper.jpg" className="d-block w-100 " style={{ filter: "brightness(65%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://wallpaperaccess.com/full/1184214.jpg" className="d-block w-100 " style={{ filter: "brightness(65%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://c4.wallpaperflare.com/wallpaper/1005/1000/931/delicious-pizza-pepperoni-pizza-wallpaper-preview.jpg" className="d-block w-100 " style={{ filter: "brightness(65%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images7.alphacoders.com/596/596343.jpg" className="d-block w-100 " style={{ filter: "brightness(65%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://rare-gallery.com/uploads/posts/565777-pizza.jpg" className="d-block w-100 " style={{ filter: "brightness(65%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://www.deccanherald.com/sites/dh/files/article_images/2020/02/20/file79dgi6ysvltfhlewhtl-1582212751.jpg" className="d-block w-100 " style={{ filter: "brightness(65%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://thumbs.dreamstime.com/b/set-various-cocktails-black-background-set-various-cocktails-shaker-black-background-188649840.jpg" className="d-block w-100 " style={{ filter: "brightness(65%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (

                <div className='row mb-3'>
                  <div key={data.id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems !== [] ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          {console.log(filterItems.url)}
                          <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""}
      </div>
      <Footer />
    </div>

  )
}
