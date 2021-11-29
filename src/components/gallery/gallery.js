import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { ClassNames } from '@emotion/react'
import { cssContainer, cssGroup } from '../global'
import GalleryButton from './gallery-button'
import { CSSTransition } from 'react-transition-group'
import GalleryItem from './gallery-item'


export default function Gallery ({ id, data }) {
  const transitionTime = 300

  const itemCount = data.allFile.edges.length
  const [maximized, setMaximized] = useState(false)
  const [displayedItem, setDisplayedItem] = useState(null)
  const [itemMaximized, setItemMaximized] =
    useState(Array(itemCount).fill(false))
  const [maximizedIndex, setMaximizedIndex] = useState(0)

  const closedGalleryRef = useRef(null)
  const openGalleryRef = useRef(null)

  const [closedRect, setClosedRect] = useState({x: 0, y: 0, width: 1, height: 1})
  const [openRect, setOpenRect] = useState({x: 0, y: 0, width: 1, height: 1})

  const [galleryHeight, setGalleryHeight] = useState(0)

  function maximizeCallback(index, node, rect) {
    setClosedRect(rect)
    setMaximizedIndex(index)
    let currItemMaximized = itemMaximized
    currItemMaximized[index] = true
    setItemMaximized(currItemMaximized)
    setMaximized(true)
    setDisplayedItem(node)
  }

  function minimizeCallback(index) {
    setMaximized(false)

    setTimeout(() => {
      let currItemMaximized = itemMaximized
      currItemMaximized[index] = false
      setItemMaximized(currItemMaximized)
    }, transitionTime)
  }

  useEffect(() => {
    setItemMaximized(Array(itemCount).fill(false))
    setMaximized(false)
  }, [itemCount])

  useEffect(() => {
    function handleResize() {
      if (!maximized) {
        setGalleryHeight(closedGalleryRef.current.clientHeight)
      } else {
        setGalleryHeight(openGalleryRef.current.clientHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => window.removeEventListener("resize", handleResize);
  }, [maximized])

  return (
    <section id={id} className='gallery-container' css={cssContainer}>
      <div className='gallery-group' css={cssGroup}>
        <h2>Recent Projects</h2>

        <div css={css`
          height: ${galleryHeight}px;
          transition: height ${transitionTime}ms;

          position: relative;
        `}>
          <div css={css`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          `}>
            <div ref={closedGalleryRef} css={css`
              display: flex;
              
              flex-flow: row wrap;
              justify-content: space-between;
            `}>
              {data.allFile.edges.map(({ node }, index) => (
                <ClassNames key={index}>
                  {({css, cx}) => (
                    <CSSTransition
                      in={!maximized}
                      timeout={itemMaximized[index] ? {enter: 0, exit: transitionTime} : transitionTime}
                      classNames={itemMaximized[index] ? {
                        enter: css({
                          zIndex: 1000,
                        }),
                        enterActive: css({
                          zIndex: 1000,
                          opacity: 0,
                          transformOrigin: 'top left',
                          transform: `translate3d(${openRect.x - closedRect.x}px, ${openRect.y - closedRect.y}px, 0) scale(${openRect.width/closedRect.width}, ${openRect.height/closedRect.height})`,
                        }),
                        enterDone: css({
                          zIndex: 1000,
                          transformOrigin: 'top left',
                          transition: `opacity ${transitionTime}ms, transform ${transitionTime}ms`,
                        }),
                        exit: css({
                          zIndex: 1000,
                          transformOrigin: 'top left',
                        }),
                        exitActive: css({
                          zIndex: 1000,
                          opacity: 0,
                          transformOrigin: 'top left',
                          transform: `translate3d(${openRect.x - closedRect.x}px, ${openRect.y - closedRect.y}px, 0) scale(${openRect.width/closedRect.width}, ${openRect.height/closedRect.height})`,
                          transition: `opacity ${transitionTime}ms, transform ${transitionTime}ms`,
                        }),
                      } : 'gallery-item-anim'}
                      unmountOnExit={true}
                    >
                      <GalleryButton
                        node={node}
                        index={index}
                        maximizeCallback={maximizeCallback}
                        maximizedItems={itemMaximized}
                        transitionTime={transitionTime}
                      />
                    </CSSTransition>                    
                  )}
                </ClassNames>
              ))}
            </div>
          </div>
          <div css={css`
            position: absolute;
            top: 0;
            left: 0;
          `}>
            <ClassNames>
              {({css, cx}) => (
                <CSSTransition
                  in={maximized}
                  timeout={{enter: 0, exit: transitionTime}}
                  unmountOnExit={true}
                  classNames={{
                    enterActive: css({  // how horrifying
                      zIndex: 2000,
                      opacity: 0,
                      transformOrigin: 'top left',
                      transform: `translate3d(${closedRect.x - openRect.x}px, ${closedRect.y - openRect.y}px, 0) scale(${closedRect.width/openRect.width}, ${closedRect.height/openRect.height})`,
                    }),
                    enterDone: css({
                      opacity: 1,
                      zIndex: 2000,
                      transformOrigin: 'top left',
                      transform: "scale(1)",
                      transition: `opacity ${transitionTime}ms, transform ${transitionTime}ms`,
                    }),
                    exit: css({
                      opacity: 1,
                      zIndex: 2000,
                      transformOrigin: 'top left',
                      transform: "scale(1)",
                    }),
                    exitActive: css({
                      zIndex: 2000,
                      transformOrigin: 'top left',
                      opacity: 0,
                      transform: `translate3d(${closedRect.x - openRect.x}px, ${closedRect.y - openRect.y}px, 0) scale(${closedRect.width/openRect.width}, ${closedRect.height/openRect.height})`,
                      transition: `opacity ${transitionTime}ms, transform ${transitionTime}ms`,
                    }),
                  }}

                  onEnter={() => {
                    setOpenRect(openGalleryRef.current.getBoundingClientRect())
                  }}
                >
                  <div ref={openGalleryRef}>
                    <GalleryItem
                      index={maximizedIndex}
                      node={displayedItem}
                      minimizeCallback={minimizeCallback}
                    />
                  </div>
                </CSSTransition>
              )}
            </ClassNames>

          </div>
        </div>
      </div>
    </section>
  )
}
