import { Carousel } from './components/carousel/carousel.component'
import { CarouselItem } from './components/carousel-item/carousel-item.component'

import './App.css'

function App() {
  return (
    <div>
      <Carousel>
        <CarouselItem>Text 1</CarouselItem>
        <CarouselItem>Text 2</CarouselItem>
        <CarouselItem>Text 3</CarouselItem>
      </Carousel>
    </div>
  )
}

export default App
