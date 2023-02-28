import './carousel-item.component.scss'

interface IProps {
  children: string,
  width?: string
}

export const CarouselItem = ({ children, width }: IProps) => {
  return(
    <div className="carousel-item" style={{ width: width }}>
      {children}
    </div>
  )
}