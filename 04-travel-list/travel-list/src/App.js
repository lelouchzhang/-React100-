import { useState } from "react";
import { PackingList } from "./component/PackingList";
import { Form } from "./component/Form";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
export default function App() {
  // -------------
  // itemList渲染在PackingList，setItemList完成于Form，所以将这部分内容定义距离在两个组件最近的公共组件中
  const [itemList, setItemList] = useState(initialItems);
  function handleAddItemList(newitem) {
    setItemList((item) => [...item, newitem]);
  }
  function handleDeleteItem(id) {
    setItemList((item) => item.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItemList((item) =>
      item.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    setItemList([]);
  }
  // -------------
  return (
    <div className="app">
      <Logo />
      <Form onAddItemList={handleAddItemList} />
      <PackingList
        itemList={itemList}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats itemList={itemList} />
    </div>
  );
}

function Logo() {
  return <h1>👊 备忘录 ✍</h1>;
}

// 备忘录列表项
export function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ itemList }) {
  const numItems = itemList.length;
  const numPacked = itemList.filter((item) => item.packed).length;
  return (
    <footer className="stats">
      <em>
        共{numItems}项备忘，已完成{numPacked}项😋。
      </em>
    </footer>
  );
}
