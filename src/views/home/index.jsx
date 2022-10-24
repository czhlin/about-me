/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const linkToHomeClick = (ev) => {

  if (window.parent !== window) {
    window.parent.postMessage({ back: true }, '*');
  } else {
    window.location.href = 'https://blog.czhlin.top';
  }
  ev.preventDefault();
  ev.stopPropagation();
};
function Home () {
  return (
    <div className="about-home">
      <div className="about-img">
        <h1>About Me 关于我</h1>
      </div>
      <div className="about-content">
        <div className="content-body">
          <div className="text-box">
            <h2>每个人都应该有自己的梦想</h2>
            <p>
              我想每个人都曾经幻想过一些有趣的事情。或许因为生活，或许因为家人，又或者因为疾病，你逐渐忘记了它。
              我曾经也有过那么美好的畅想，当我拿起儿童飞机举过头顶，透过云层看到太阳，如果我能飞该多好哇。
              如今的我，不再幻想飞到天上，想的是如何赚更多的钱，让家人更加快乐，可是却逐渐迷失了前进的方向……
            </p>
            <p>
              <a href="" className='btn' onClick={linkToHomeClick}>
                <strong>了解更多</strong>
                -
                <em>czhlin</em>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="about-img name">
        <h1>我名字是 Czhlin</h1>
      </div>
      <div className="about-content name">
        <div className="content-body">
          <div className="text-box">
            <h2>我是一个很普通的人</h2>
            <p>
              毕业于攀枝花学院软件工程专业。出于对计算机技术的好奇，我开始从事计算机行业，成为了一名web前端开发工程师。
              如今的我还很青涩，但家人对我寄予厚望，我逐渐成为家里的顶梁柱，所以我渴望知识和技术。
              为了更好地学习技术，我开始搭建自己的网站，写下一篇篇的博客……
            </p>
            <p>
              <a href="" className='btn' onClick={linkToHomeClick}>
                <strong>了解更多</strong>
                -
                <em>czhlin</em>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer">
        <h1>Hello World!</h1>
      </div>
      <div className="footer name">
        <h1>你好 Czhlin！</h1>
      </div>
    </div>
  );
}
export default Home;
