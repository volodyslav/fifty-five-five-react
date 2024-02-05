import { useEffect } from "react"
import { useState } from "react"



const App = () => {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength]  = useState(25)
  const [startStop, setStartStop] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [currentSession, setCurrentSession] = useState(true)  
  const sound = document.querySelector("#beep")
  
  const handleTime = () => {
    
    if(currentSession){
      setMinutes(sessionLength)
      document.getElementById("timer-label").innerText = "Session";
    }else if(!currentSession ){
      setMinutes(breakLength)
      document.getElementById("timer-label").innerText = "Break";
      
    }  
  }

  useEffect(() => {
    if(startStop){
      if (minutes < 0 ){
        setCurrentSession((prevSession) => !prevSession)
        setMinutes(0)
      }
        if(seconds <= 0){
          setTimeout(() => {
            setSeconds(60)
          }, 1000)
        }

        if (seconds === 0){
          setTimeout(() => {
            setMinutes(m => m - 1)
          }, 1000)
        }

        if(seconds == 0 && minutes == 0){
          sound.play()  
        }

        const intervalId = setInterval(() => {
          setSeconds(prevSeconds => prevSeconds - 1);
          }, 1000);
        return () => clearInterval(intervalId);
    }
  }, [startStop, seconds]);

  useEffect(() => {
    handleTime()
  }, [sessionLength, currentSession, breakLength])

  const handleStartStop = () => {

    setStartStop(!startStop)
  }

  const increaseBreakLength = () => {
    if (breakLength >= 1 && breakLength < 60 && !startStop){
      setBreakLength(b => b + 1)
      setSeconds(0)
    }
  }

  const decrementBreakLength = () => {
    if (breakLength > 1 && breakLength <= 60 && !startStop){
      setBreakLength(b => b - 1)
      setSeconds(0)
    }
  }

  const decrementSessionLength = () => {
    if (sessionLength > 1 && sessionLength <= 60 && !startStop){
      setSessionLength(s => s - 1)
      setSeconds(0)
    }
  }
  const increaseSessionLength = () => {
    if (sessionLength >= 1 && sessionLength < 60 && !startStop){
      setSessionLength(s => s + 1)
      setSeconds(0)
    }
  }
  const reset = () => {
    setSessionLength(25)
    setBreakLength(5)
    setMinutes(25)
    setSeconds(0)
    setCurrentSession(true)
    setStartStop(false)
    sound.pause()
    sound.currentTime = 0
  }


  return (
    <div className=" flex flex-col mx-auto justify-center">
      <h1 className=" text-6xl mb-6 text-center">25 + 5 Clock</h1>
        <div className=" flex justify-evenly space-x-4 my-4">
          <div className="my-2 space-y-4">
            <h1 id="break-label" className=" text-2xl ">Break Length</h1>
            <div className=" flex justify-evenly">
              <button id="break-increment" onClick={() => increaseBreakLength()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              </button>
              <p id="break-length" className=" text-4xl ">{breakLength}</p>
              <button id="break-decrement" onClick={() => decrementBreakLength()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </button>
            </div>
          </div>
          <div className={`my-2 space-y-4 `}>
            <h1 id="session-label" className=" text-2xl">Session Length</h1>
            <div className=" flex justify-evenly">
              <button id="session-increment" onClick={() => increaseSessionLength()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
              </button>
              <p id="session-length" className=" text-4xl ">{sessionLength}</p>
              <button id="session-decrement" onClick={() => decrementSessionLength()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="text-center border-4 space-y-4 border-blue-950 rounded-3xl p-4 w-full mx-auto">
        <h1 id="timer-label" className={` text-2xl ${minutes < 1 ? "text-red-600" : "text-white"}`}></h1>
          <p id="time-left" className={` text-8xl ${minutes < 1 ? "text-red-600" : "text-white"}`}>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
          <div className=" space-x-4">
            <button id="start_stop" onClick={() => handleStartStop()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
              </svg>
            </button>
            <button id="reset" onClick={reset}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

            </button>
          </div>
        </div>
        <audio id="beep" preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  )
}

export default App