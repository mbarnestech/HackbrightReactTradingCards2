function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function AddTradingCard(props) {
  const [name, setName] = React.useState("");
  const [skill, setSkill] = React.useState("");
  function addNewCard() {
    fetch("/add-card", {
      method: 'POST',
      body: JSON.stringify({'name': name, 'skill': skill }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
      const cardAdded = jsonResponse.cardAdded;
      props.addCard(cardAdded);
    });
  }
  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id='nameInput'
        style={{ marginLeft: "5px" }}
      ></input>
      <label
        htmlFor="skillInput"
        style={{ marginLeft: "10px", marginRight: "5px" }}
      >
        Skill
      </label>
      <input
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        id="skillInput"
      ></input>
      <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}

function TradingCardContainer() {
  // original code: const tradingCards = [];
  // creating 'cards' as an empty list state variable and 
  const [cards, setCards] = React.useState([])

  function addCard(newCard) {
    // [...cards] makes a copy of cards. Similar to currentCards = cards[:] in Python
    const currentCards = [...cards];
    // [...currentCards, newCard] is an array containing all elements in currentCards followed by newCard
    setCards([...currentCards, newCard]);
  }

  React.useEffect (() => {
    fetch('/cards.json')
      .then((response) => response.json())
      .then((data) => setCards(data.cards))
  }, [])

  const tradingCards = [];

  // the following line will print out the value of cards
  // pay attention to what it is initially and what it is when the component re-renders
  console.log(`cards: `, cards);

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.cardId}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />,
    );
  }

  return (
    <React.Fragment>
      <AddTradingCard addCard={addCard} />
      <h2> Trading Cards </h2>
      <div className="grid">{tradingCards}</div>;
    </React.Fragment>
  )
}

ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
