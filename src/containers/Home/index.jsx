import React from 'react'
import logo from '../../public/images/logo.svg'
import BottomNav from '../../components/BottomNav'
import './home.css'

const Home = () => (
  <div>
    <div className="home__logo--container">
      <img src={logo} alt="logo" />
      <span className="home__logo--text">随机数 </span>
    </div>
    <div className="home__slogan--container">
      <h1 className="home__slogan--title"></h1>
      <p className="home__slogan--text">
        在链上实现随机数
      </p>
    </div>
    <BottomNav active={'home'} />
  </div>
)

export default Home
