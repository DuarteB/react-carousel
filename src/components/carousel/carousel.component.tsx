import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import './carousel.styles.scss';

interface IProps {
  children: React.ReactElement[]
}

export const Carousel = ({ children }: IProps) => {
  const [ activeIndex, setActiveIndex ] = useState(0);
  const [ paused, setPaused ] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if(!paused){
        updateIndex(activeIndex + 1);
      }
    }, 10000);

    return () => {
      if(interval) {
        clearInterval(interval);
      }
    }
  })

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  const updateIndex = (newIndex: React.SetStateAction<number>) => {
    if(newIndex < 0){
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)){
      newIndex = 0;
    }

    setActiveIndex(newIndex)
  }

  return(
    <div
      {...handlers}
      className='carousel'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className='inner' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" })
        })}
      </div>
      <div className='indicators'>
        <button
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index)
              }}
            >
              {index + 1}
            </button>
          )
        })}
        <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}