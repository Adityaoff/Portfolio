import {useRef,useEffect} from 'react'
import { gsap } from "gsap";
const customCursor = () => {
    const cursorRef = useRef(null);
    const cursorBorderRef = useRef(null);

    //hide Cursor on mobile
    const isMobile = typeof window !== "undefined" &&
        window.matchMedia("(max-width:768px").matches
    
    if (isMobile) {
        return null
    }

    useEffect(()=> {
        //get cursor elements
        const cursor = cursorRef.current
        const cursorBorder = cursorBorderRef.current
        
        //initial position off-screen
        gsap.set([cursor, cursorBorder], {
            xPercent: -50,
            yPercent: -50,
        })

        //Variables for cursor position with different speeds
        const xTo = gsap.quickTo(cursor, "x", {
            duration:0.2,ease:"power3.out"
        })

        const yTo = gsap.quickTo(cursor, "y", {
            duration:0.2,ease:"power3.out"
        })

        const xToBorder = gsap.quickTo(cursorBorder, "x", {
            duration:0.5,ease:"power3.out"
        })

        const yToBorder = gsap.quickTo(cursorBorder, "y", {
          duration: 0.5,
          ease: "power3.out",
        })

        //Mouse move handler
        const handlemouseMove = (e) => {
            xTo(e.clientX)
            yTo(e.clientY)
            xToBorder(e.clientX)
            yToBorder(e.clientY)
        }

        //Add mouse move listener
        window.addEventListener("mousemove", handlemouseMove)
        
        //Add click animation
        document.addEventListener("mousedown", () => {
            gsap.to([cursor, cursorBorder], {
                scale: 0.6,
                duration:0.2,
            })
        })

        document.addEventListener("mouseup", () => {
            gsap.to([cursor, cursorBorder], {
                scale: 1,
                duration:0.2,
            })
        })
    },[])
  return (
      <>
          {/*Main Cursor Dot*/}
          <dev
              ref={cursorRef}
              className="fixed top-0 left-0
          w-[20px] h-[20px] bg-white rounded-full
          pointer-events-none z-[999]
          mix-blend-difference"/>     

          <div 
              ref={cursorBorderRef}
              className="fixed top-0 left-0 w-[40px]
              h-[40px] border rounded-full border-white
              pointer-events-none z-[999] 
              mix-blend-difference opacity-50"
          />
        </>
  )
}

export default customCursor