//滑鼠

const cursorDot = document.querySelector('.cursor-dot');
const cursorDotOutline = document.querySelector('.cursor-dot-outline');

let cursorIn = false;

/*效果*/
const mouseAnimation = () => {
  cursorIn === false
    ? ((cursorDot.style.transform = 'translate(-50%, -50%) scale(1)'),
      (cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1)'),
      (cursorDotOutline.style.opacity = 0.5))
    : ((cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)'),
      (cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1.3)'),
      (cursorDotOutline.style.opacity = 1));
};

/*追蹤滑鼠位置*/
document.addEventListener('mousemove', e => {
  cursorDot.style.opacity = '1';
  cursorDotOutline.style.opacity = '1';
  const cursorposition = cursor => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
  };
  cursorposition(cursorDot);
  cursorposition(cursorDotOutline);
});

/*滑出設窗隱藏滑鼠*/

const mouseVisibility = mouseEvent => {
  document.addEventListener(`${mouseEvent}`, () => {
    if (mouseEvent === 'mouseenter') {
      cursorDot.style.opacity = 1;
      cursorDotOutline.style.opacity = 0.5;
    } else if (mouseEvent === 'mouseleave') {
      cursorDot.style.opacity = 0;
      cursorDotOutline.style.opacity = 0;
    }
  });
};

mouseVisibility('mouseenter');
mouseVisibility('mouseleave');

/*控制點擊活動*/

const mouseClick = mouseEvent => {
  document.addEventListener(`${mouseEvent}`, e => {
    if (mouseEvent === 'mousedown') {
      cursorIn = true;
      mouseAnimation();
    } else if (mouseEvent === 'mouseup') {
      cursorIn = false;
      mouseAnimation();
    } else if (mouseEvent === 'touchstart') {
      document.removeEventListener('mousedown', mouseAnimation());
      e.preventDefault();
      cursorDot.style.opacity = '0';
      cursorDotOutline.style.opacity = '0';
    }
  });
};
mouseClick('touchstart');
mouseClick('mousedown');
mouseClick('mouseup');

/*控制滑過物件活動*/
const mouseAnchorHovering = anchor => {
  document.querySelector(`${anchor}`).addEventListener('mouseover', () => {
    cursorIn = true;
    mouseAnimation();
  });

  document.querySelector(`${anchor}`).addEventListener('mouseout', () => {
    cursorIn = false;
    mouseAnimation();
  });
};

mouseAnchorHovering('.home__btn');
mouseAnchorHovering('.nav');
mouseAnchorHovering('.characters');
mouseAnchorHovering('.netflix-btn');
mouseAnchorHovering('.gotop-btn');

//進度條

const scrollPath = document.querySelector('.scrollpath');

const totalHeight = document.body.scrollHeight - window.innerHeight;

window.onscroll = () => {
  const progressHeight = (window.pageYOffset / totalHeight) * 100;
  scrollPath.style.height = progressHeight + '%';
};

/*視覺差*/

const homeText = document.querySelector('.home__text');
const backgroundAll = document.querySelectorAll('.background');
const [background] = [backgroundAll];

document.addEventListener('scroll', () => {
  const value = window.scrollY;

  background[1].style.top = -value * 0.2 + 'px';
  background[2].style.top = -value * 0.3 + 'px';
  background[3].style.top = -value * 0.3 + 'px';
  background[4].style.top = -value * 0.6 + 'px';
  homeText.style.transform = `translate(-50%,${value * 0.3 + '%'})`;
});

/*滾動效果*/

/*單組*/
const introH3 = document.querySelector('#intro-h3');
const introP = document.querySelector('#intro-p');
const videoContainer = document.querySelector('.iframe-container');

const commentBook = document.querySelector('.comment__book');

const characters_3 = document.querySelector('.role_3');

const observer = observer => {
  const animation = entries => {
    const [entry] = entries;
    const daley = entry.target.dataset.daley;
    const animationType = entry.target.dataset.anima;

    entry.target.style.opacity = '0';

    entry.isIntersecting
      ? ((entry.target.style.animation = `${animationType} 0.9s ${daley} ease-out forwards`),
        observer.unobserve(entry.target))
      : (entry.target.style.animation = 'none');
  };
  observer = new IntersectionObserver(animation);
  observer.observe(introH3);
  observer.observe(introP);
  observer.observe(videoContainer);
  observer.observe(commentBook);
  observer.observe(characters_3);
};

observer();

/*const introH3Observer = new IntersectionObserver(animation);
introH3Observer.observe(introH3);

const introPObserver = new IntersectionObserver(animation);
introPObserver.observe(introP);

const videoContainerObserver = new IntersectionObserver(animation);
videoContainerObserver.observe(videoContainer);

const commentBookObserver = new IntersectionObserver(animation);
commentBookObserver.observe(commentBook);

const characters_3Observer = new IntersectionObserver(animation);
characters_3Observer.observe(characters_3);*/

/*多組*/

const commentP = document.querySelectorAll('.comment__prise p');
const commentH1 = document.querySelectorAll('.comment__prise h1');

const characters_1 = document.querySelectorAll('.role_1');
const characters_2 = document.querySelectorAll('.role_2');

const observerGroup = observer => {
  const animationGroup = entries => {
    entries.forEach(entry => {
      const daley = entry.target.dataset.daley;
      const animationType = entry.target.dataset.anima;

      entry.target.style.opacity = '0';

      entry.isIntersecting
        ? ((entry.target.style.animation = `${animationType} 0.9s ${daley} ease-out forwards`),
          observer.unobserve(entry.target))
        : (entry.target.style.animation = 'none');
    });
  };
  observer = new IntersectionObserver(animationGroup);
  commentP.forEach(element => observer.observe(element));
  commentH1.forEach(element => observer.observe(element));
  characters_1.forEach(element => observer.observe(element));
  characters_2.forEach(element => observer.observe(element));
};

observerGroup();

/*
const commentPObserver = new IntersectionObserver(animationGroup);
commentP.forEach(element => commentPObserver.observe(element));

const commentH1Observer = new IntersectionObserver(animationGroup);
commentH1.forEach(element => commentH1Observer.observe(element));

const characters_1Observer = new IntersectionObserver(animationGroup);
characters_1.forEach(element => characters_1Observer.observe(element));

const characters_2Observer = new IntersectionObserver(animationGroup);
characters_2.forEach(element => characters_2Observer.observe(element));
*/

document.querySelector('.black').style.height = `${
  document.body.offsetHeight + 'px'
} `;
console.log(`${document.body.offsetHeight + 'px'} `);
