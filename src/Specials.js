function Specials() {
  return (
    <div className="sec2">
      <h1>This Week's Specials</h1>
      <div className="dishes">
        <div className="card">
          <img src="dish1.jpg" alt="dish1" className="card-image" />
          <div className="card-content">
            <span className="menu-name">Butter Chicken</span>
            <span className="price">$16.99</span>
          </div>
        </div>
        <div className="card">
          <img src="dish2.jpg" alt="dish2" className="card-image" />
          <div className="card-content">
            <span className="menu-name">Butter Chicken</span>
            <span className="price">$16.99</span>
          </div>
        </div>
        <div className="card">
          <img src="dish3.jpg" alt="dish3" className="card-image" />
          <div className="card-content">
            <span className="menu-name">Butter Chicken</span>
            <span className="price">$16.99</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specials;
