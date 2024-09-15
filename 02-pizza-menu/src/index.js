import React from "react";
import ReactDOM from "react-dom/client";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div>
      <Header />
      <Menus />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h2>Fast React Pizza Co.</h2>
    </header>
  );
}

function Menus() {
  return (
    <div>
      <p>Our Menu</p>
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  );
}
function Footer() {
  const curHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = curHour >= openHour && curHour <= closeHour;

  return (
    <footer>
      <p>We're open until 23:00.</p>
    </footer>
  );
}

function Pizza() {
  return (
    <div>
      <img src="./pizzas/focaccia.jpg" alt="Focaccia" />
      <p>Focaccia</p>
      <p>Bread with italian olive oil and rosemary</p>
    </div>
  );
}

// render in react v18
// StrictMode 使用两次渲染，以检测开发模式下的错误（非必要）
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
