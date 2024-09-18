import { useState } from "react";
import "./styles.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion faqs={faqs} />
    </div>
  );
}

function Accordion({ faqs }) {
  // 定义当前点击位置，当然要在AccordionItem的父组件定义。同理，获取被点击的位置，当然要在子组件中传递。
  const [curAcc, setCurAcc] = useState(null);
  return (
    <div className="accordion">
      {faqs.map((item, index) => {
        return (
          <AccordionItem
            num={index} // 组件所在位置
            title={item.title} // 标题
            key={index} // key
            curAcc={curAcc} // Item需要的属性，这里只做传递
            onCurAcc={setCurAcc} // 在Item中操作，这里只做传递
          >
            {item.text}
          </AccordionItem>
        );
      })}
    </div>
  );
}

function AccordionItem({ num, title, curAcc, onCurAcc, children }) {
  let isOpen = curAcc === num;

  function handleIsOpen() {
    onCurAcc(isOpen ? null : num);
  }
  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => handleIsOpen()}
    >
      <p className="number">{num < 9 ? `0${num + 1}` : `${num + 1}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {/* 被点击时显示{item.text} */}
      {isOpen && <p className="content-box">{children}</p>}
    </div>
  );
}
