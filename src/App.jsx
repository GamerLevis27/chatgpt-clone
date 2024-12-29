import React, { useContext, useRef } from 'react';
import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/userIcon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
import { Context } from './context/Context';

const App = () => {

  const {onSent, recentPrompt, showResult, loading, resultData, setInput,prevPrompts, setRecentPrompt, input, newChat} = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className='App'>
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className='brand'>ChatGPT</span>
          </div>
          <button onClick={()=>newChat()} className="midBtn">
            <img src={addBtn} alt="" className="addBtn" />New Chat
          </button>
          <div className="upperSideBottom">
            <button onClick={()=>loadPrompt("What is Programming?")} className="query">
                  <img src={msgIcon} alt="Query" />What is Programming? 
                </button>
            <button onClick={()=>loadPrompt("How to use an API?")} className="query">
              <img src={msgIcon} alt="Query" />How to use an API? 
            </button>
            {prevPrompts.map((item, index) => {
              return (
                <button onClick={()=>loadPrompt(item)} className="query">
                  <img src={msgIcon} alt="Query" />{item.slice(0,21)}.....
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="main">
          <div className="upperSideTop forSmall">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className='brand'>ChatGPT</span>
          </div>
          <div className='line' />
        {!showResult
        ?<>
          <div className="chats">
            <div className="chat bot">
              <img className='chatImg' src={gptImgLogo} alt="" />
              <p className="loader">Hi, I am ChatGPT, a state of the art language model developed by OpenAI. I'm designed to understand and generate human-like text based on the input I receive. You can ask me questions, have conversations, seek information, or even request assistance with various tasks. Just let me know how I can help you!
              </p>
              <p className="txt"></p>
            </div>
          </div>
        </>
        :<div className='result'>
            <div className="chats">
              <div className="chat">
                <img className='chatImg' src={userIcon} alt="" />
                <p className="txt">{recentPrompt}</p>
              </div>
              <div className="chat bot">
                <img className='chatImg' src={gptImgLogo} alt="" />
                {loading
                ?<div className='loader'>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  
                </div>
                :<p className="txt" dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
                
              </div>
            </div>
        </div>
        }

        
        <div className="chatFooter">
          <div className="inp">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Send a message'/>
            <button onClick={()=>onSent()} className="send">
              <img src={sendBtn} alt="Send" />
            </button>
          </div>
          <p>ChatGPT may display inaccurate info, including about people, so double-check its responses.</p>
        </div>
      </div>
    </div>
  )
}

export default App
