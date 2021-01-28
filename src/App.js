import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import bgImg1 from './assets/bg1.jpg';
import bgImg2 from './assets/bg2.jpg';

const App = () => {
  return (
    <>
      <Header title={'This is title'} descr={'This is Description!'} />
      <Layout id={1}  title='Layout 1 title' descr='description' urlBg={bgImg1} />
      <Layout id={2}  title='Layout 2 title' descr='description' colorBg='#777' />
      <Layout id={3}  title='Layout 3 title' descr='description' urlBg={bgImg2} />
      <Footer />
    </>
  )
}

export default App;
